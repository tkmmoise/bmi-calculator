import React,{useState,useEffect} from 'react';
import ReactTooltip from 'react-tooltip';
import {connect} from 'react-redux'
import {signOut} from '../../store/actions/authAction'


const Logout = (props) => {



    const [checked, setChecked] = useState(false);
    useEffect(()=>{
        if(checked){
            props.signOut();
        }
    })
    
    const handleChange = (e) =>{
        setChecked(e.target.checked);
    }
    return (
        <div className="logoutContainer">
            <label className="switch">
                <input onChange={handleChange} type="checkbox" checked={checked} />
                <span className="slider  round" data-tip="Déconnexion"></span>
            </label>
            <ReactTooltip place="left" effect="solid"/>
        </div>
    )
}

const mapDispatchToProps = (dispatch) => {
    return {
      signOut: () => dispatch(signOut())
    }
}

export default connect(null,mapDispatchToProps)(Logout)

