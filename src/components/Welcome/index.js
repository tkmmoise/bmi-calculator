import React from 'react'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import Logout from '../Logout'
import Loader from '../Loader'
import Bmi from '../Bmi'

const Welcome = (props) => {

    const {auth} = props;
    if (!auth.uid) return <Redirect to="/" />
    

    return auth.uid === null ? (
        <Loader/>
    ):
     (
        <div className="error-bg">
            <div className="container-error">
                <Logout/>
                <div>
                    <p className="welcome-text">Welcome to BMI calculator</p>
                </div>
                <Bmi/>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => {
    return{
        authError: state.auth.authError,
        auth: state.firebase.auth
    }
}
  
const mapDispatchToProps = (dispatch) => {
    return {
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Welcome)
