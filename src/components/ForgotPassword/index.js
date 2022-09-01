import React,{useState,useEffect} from 'react'
import {Link,Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
import imageLogin from '../../img/image02.gif'
import { RiMailFill } from "react-icons/ri";
import {passwordReset,ResetAuthError} from '../../store/actions/authAction'

const ForgotPassword = (props) => {
    
    const {auth,successForgotMsg,authError} = props;
    const [email, setEmail] = useState("");
    useEffect(() => {
        if(successForgotMsg){
            setTimeout(() => {
                props.history.push('/login');
            }, 5000);
        }
    }, [successForgotMsg,props.history])

    const handleSubmit = (e) =>{
        e.preventDefault();
        props.passwordReset(email);
        setEmail("");
    }
    
    
    if(auth.uid) return <Redirect to="/welcome"/>

    const btn = email===""?
    (<input type="submit" name="signin" id="signin" className="form-submit" value="Recover" disabled/>):
    (<input type="submit" name="signin" id="signin" className="form-submit" value="Recover"/>)
    return (
        <div className="sign-in">
            <div className="container">
                <div className="signin-content">
                    <div className="signin-image">
                        <figure><img src={imageLogin} alt="sing_up_image"/></figure>
                        <Link to="/login" className="signup-image-link">I am already member</Link>
                    </div>

                    <div className="signin-form">
                        <h2 className="form-title">Forgot your Password ?</h2>
                        <form onSubmit={handleSubmit} className="register-form" id="login-form">
                            <div className="form-group">
                                <label htmlFor="your_email"> {<RiMailFill/>} </label>
                                <input onChange={(e) =>{setEmail(e.target.value)}} value={email} type="text" name="your_email" id="your_email" placeholder="Your Email" required/>
                            </div>
                            <div className="form-group form-button">
                                {btn}
                            </div>
                            <div className="red-text">
                                {authError ? <p> {authError} </p>: null}
                            </div>
                            <div className="success-text">
                                {successForgotMsg ? <p> {successForgotMsg} </p>: null}
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => {

    return{
        authError: state.auth.authError,
        successForgotMsg: state.auth.successForgotMsg,
        auth: state.firebase.auth
    }
}
  
const mapDispatchToProps = (dispatch) => {
    return {
        passwordReset: (email) => dispatch(passwordReset(email)),
        ResetAuthError: () => dispatch(ResetAuthError())
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(ForgotPassword)
