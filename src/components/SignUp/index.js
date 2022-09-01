import React,{useState,useEffect} from 'react'
import {Link,Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
import imageSignUp from '../../img/image03.gif'
import { RiContactsFill,RiMailFill,RiLockPasswordFill,RiLockPasswordLine } from "react-icons/ri";
import {signUp,ResetAuthError} from '../../store/actions/authAction'

const SignUp = (props) => {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const handleSubmit = (e) =>{
        e.preventDefault();
        props.signUp(name,email,password);
    }

    const {authError, auth} = props;

   useEffect(() => {
       
       return function cleanup()  {
        props.ResetAuthError();
       }
   },[])
    
    if(auth.uid) return <Redirect to="/welcome"/>
    
    const btn = name === ""|| email === "" || password === "" || password !== confirmPassword ?
    (<input type="submit" name="signup" id="signup" className="form-submit" value="Register" disabled/>):
    (<input type="submit" name="signup" id="signup" className="form-submit" value="Register" />)


    return (
        <div className="signup">
            <div className="container">
                <div className="signup-content">
                    <div className="signup-form">
                        <h2 className="form-title">Sign up</h2>
                        <form onSubmit={handleSubmit} className="register-form" id="register-form">
                            <div className="form-group">
                                <label htmlFor="name"> {<RiContactsFill/>} </label>
                                <input onChange={(e) =>{setName(e.target.value)}} type="text" name="name" id="name" placeholder="Your Name" required/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="email">{<RiMailFill/>}</label>
                                <input onChange={(e) =>{setEmail(e.target.value)}} type="email" name="email" id="email" placeholder="Your Email" required/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="pass">{<RiLockPasswordFill/>}</label>
                                <input onChange={(e) =>{setPassword(e.target.value)}} type="password" name="pass" id="pass" placeholder="Password" required/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="re-pass">{<RiLockPasswordLine/>}</label>
                                <input onChange={(e) =>{setConfirmPassword(e.target.value)}} type="password" name="re_pass" id="re_pass" placeholder="Repeat your password" required/>
                            </div>
                            <div className="form-group form-button">
                                {btn}
                            </div>
                            <div className="red-text">
                                {authError ? <p> {authError} </p>: null}
                            </div>
                        </form>
                    </div>
                    <div className="signup-image">
                        <figure><img src={imageSignUp} alt="sing_up_image"/></figure>
                        <Link to="/login" className="signup-image-link">I am already member</Link>
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
        signUp : (name,email,password) => dispatch(signUp(name,email,password)),
        ResetAuthError: () => dispatch(ResetAuthError())
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(SignUp)
