import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from "./auth.module.scss";
import Loader from "../../components/loader/Loader";
import {loginUser,validateEmail } from '../../services/authService';
import {BiLogIn} from "react-icons/bi";
import Card from '../../components/card/Card';
import { useDispatch } from 'react-redux';
import { SET_LOGIN,SET_NAME} from '../../redux/features/auth/authSlice';
import {toast} from "react-toastify";

const initialState={
 
    email:"",
    password:"",
    

};

const Login = () => {
    const dispatch=useDispatch();
    const navigate=useNavigate();
    const [isLoading,setIsLoading]=useState(false);
    const [formData,setformData]=useState(initialState);
    const {email,password}=formData;

    const handleInputChange=(e)=>{
        const {name,value} =e.target; //access name value of input text box
        setformData({...formData,[name]:value}) //objects
    };

    const login=async(e)=>{
        e.preventDefault()
     
        if(!email || !password)
        {
            return toast.error("All fields are required");
        }

        if(!validateEmail(email))
        {
            return toast.error("Please enter a valid Email Id")
        }

    
      
    const userData={
        email,
        password,
    };


    setIsLoading(true)
    try{
        const data=await loginUser(userData);
        console.log(data);
        await dispatch(SET_LOGIN(true)); //save nam eif loggedin and move to dashboard
        await dispatch(SET_NAME(data.name));
        navigate("/dashboard");
        setIsLoading(false);

    }catch(error)
    {
        setIsLoading(false);
    }
};


  return (
    <div className={`container ${styles.auth}`}>
        {isLoading && <Loader/>} 
        <Card>
    <div className={styles.form}>
        <div className="--flex-center">
            <BiLogIn size={35} color="#999"/>

        </div>
        <h2>Login</h2>
    <form onSubmit={login}>
        <input type="email" placeholder='Email' required name="email" value={email} onChange={handleInputChange} />
        <input type="password" placeholder='Password' required name="password" value={password} onChange={handleInputChange} />


        <button type="submit" className="--btn --btn-primary --btn-block">Login</button>    

    </form>
    <Link to="/forgot">Forgot Password</Link>

    <span className={styles.register}>
        <Link to="/">Home</Link>
        <p>&nbsp;Don't have an account? &nbsp;</p>
        <Link to="/register">Register</Link>
    </span>

    </div>
        </Card>
    </div>
  )
}

export default Login