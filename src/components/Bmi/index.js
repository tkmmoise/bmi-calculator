import React,{useState} from 'react'
import {connect} from 'react-redux'
import {firestoreConnect} from 'react-redux-firebase'
import {compose} from 'redux'
import moment from 'moment'
import {addDataBmi,delAllDataBmi} from '../../store/actions/bmiDataAction'
import { GiBodyHeight, } from "react-icons/gi";
import { FaWeight, } from "react-icons/fa";
import Modal from '../Modal'

const Bmi = (props) => {
    const {bmiData,auth} = props;

    const [weight, setWeight] = useState("");
    const [height, setHeight] = useState("");
    const [showModal, setShowModal] = useState(false);

    const hideModal = () => {
        setShowModal(!showModal);
    }

    const bmiDatas = (bmiData && auth) && bmiData.filter(bmi=>bmi.authorId === auth.uid);
    const bmiDatasTable = bmiDatas && bmiDatas.map(data=>{
        return (
            <tr key={data.id}>
                <td> {moment.unix(data.date.seconds).format("MMM Do YY, h:mm a")} </td>
                <td> {data.weight} </td>
                <td> {data.height} </td>
                <td> {data.bmi} </td>
            </tr>
        )
    })
    const deleteALLDataBmi = () =>{ 
        console.log("all del bmi")
        for(var i=0;i<bmiDatas.length;i++){
            props.delAllDataBmi(bmiDatas[i].id);
        }
        setShowModal(!showModal);
        
    }
    const handleSubmit = (e)=>{
        e.preventDefault();
        props.addDataBmi(height,weight);
        setHeight("");
        setWeight("");
    }
    
    const btn = weight === ""||height ===""?
    (<input type="submit" name="bmi" id="bmi" className="form-submit not-select" value="Calculate" disabled/>):
    (<input type="submit" name="bmi" id="bmi" className="form-submit .not-select" value="Calculate"/>)
    const btnDel = bmiDatas && ( bmiDatas.length === 0 ? 
    (<button disabled onClick={()=>hideModal()} className="summary-btn btnDelDisable">Clear all Data </button>):
    (<button onClick={()=>hideModal()} className="summary-btn">Clear all Data </button>))

    return (
        <>
            <div className="bmi">
                <div className="container">
                    <div className="bmi-content">
                        <div className="bmi-form">
                            <h3 className="form-title">Calculate your Body Mass Index</h3>
                            <form onSubmit={handleSubmit} className="register-form">
                                <div className="form-group">
                                    <label htmlFor="weight"> {<FaWeight/>} Kg</label>
                                    <input onChange={(e) =>{setWeight(e.target.value)}} value={weight} type="number" name="weight" id="weight" placeholder="Your Weight" min="0" step="0.1"/>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="height"> {<GiBodyHeight/>} Cm</label>
                                    <input onChange={(e) =>{setHeight(e.target.value)}} value={height} type="number" name="height" id="height" placeholder="Your Height" min="0" step="0.1" />
                                </div>
                                <div className="form-group form-button">
                                    {btn}
                                </div>
                            </form>
                        </div>
                        
                    </div>
                </div>
            </div>
            <div className="summary-content">
                    <div className="summary-header">
                        <h3 className="summary-title">Summary</h3>
                        {btnDel}
                    </div>
                    <table className="summary">
                        <thead>
                           <tr>
                                <th>Date</th>
                                <th>Weight</th>
                                <th>Height</th>
                                <th>BMI(Kg/m<sup>2</sup>)</th>
                            </tr> 
                        </thead>
                        <tbody>
                            {bmiDatasTable}
                            {bmiDatas && (bmiDatas.length ===0 && <tr><td colSpan="4" className="no-data-table">No Data BIM</td></tr>)}
                        </tbody>
                    </table>
            </div>
            <Modal showModal={showModal} hideModal={hideModal} deleteALLDataBmi={deleteALLDataBmi} />
        </>
    )
}

const mapStateToProps = (state) => {
    return{
        bmiData: state.firestore.ordered.bmiData,
        authError: state.auth.authError,
        auth: state.firebase.auth
    }
}
  
const mapDispatchToProps = (dispatch) => {
    return {
        addDataBmi: (height,weight) => dispatch(addDataBmi(height,weight)),
        delAllDataBmi: (id) => dispatch(delAllDataBmi(id))
    }
}

export default compose(
    firestoreConnect(()=> ['bmiData']),
    connect(mapStateToProps,mapDispatchToProps)
)(Bmi) 