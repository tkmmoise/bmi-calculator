import React,{useState,useEffect} from 'react'
import {Link,Redirect} from 'react-router-dom'
import imageLogin from '../../img/image02.gif'
import { RiMailFill,RiLockPasswordFill } from "react-icons/ri";
import {connect} from 'react-redux'
import {login,ResetAuthError} from '../../store/actions/authAction'

const Login = (props) => {
    const {authError,auth} = props;
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    useEffect(() => {
       
        return function cleanup()  {
         props.ResetAuthError();
        }
    },[])

    const handleChangeEmail = (e) => {
        setEmail(e.target.value);
    }
    const handleChangePassword = (e) => {
        setPassword(e.target.value)
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        props.login(email,password);
        setEmail("");
        setPassword("");
    }

    
    if(auth.uid) return <Redirect to="/welcome"/>

    

    const btn = email===""||password===""?
    (<input type="submit" name="signin" id="signin" className="form-submit" value="Log in" disabled/>):
    (<input type="submit" name="signin" id="signin" className="form-submit" value="Log in"/>)
    return (
        <div className="sign-in">
            <div className="container">
                <div className="signin-content">
                    <div className="signin-image">
                        <figure><img src={imageLogin} alt="sing_up_image"/></figure>
                        <Link to="/signup" className="signup-image-link">Create an account</Link>
                        <Link to="/forgotpassword" className="signup-image-link">Forgot Password ?</Link>
                    </div>

                    <div className="signin-form">
                        <h2 className="form-title">Sign in</h2>
                        <form onSubmit={handleSubmit} className="register-form" id="login-form">
                            <div className="form-group">
                                <label htmlFor="your_email"> {<RiMailFill/>} </label>
                                <input onChange={handleChangeEmail} value={email} type="text" name="your_email" id="your_email" placeholder="Your Email" required/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="your_pass"> {<RiLockPasswordFill/>} </label>
                                <input onChange={handleChangePassword} value={password} type="password" name="your_pass" id="your_pass" placeholder="Password" required/>
                            </div>
                            <div className="form-group form-button">
                                {btn}
                            </div>
                            <div className="red-text">
                                {authError ? <p> {authError} </p>: null}
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
        auth: state.firebase.auth
    }
}
  
const mapDispatchToProps = (dispatch) => {
    return {
      login: (email,password) => dispatch(login(email,password)),
      ResetAuthError: () => dispatch(ResetAuthError())
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Login)
