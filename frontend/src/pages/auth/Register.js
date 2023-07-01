import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from "./auth.module.scss";
import {TiUserAddOutline} from "react-icons/ti";
import Card from '../../components/card/Card';
import { toast } from 'react-toastify';
import { registerUser, validateEmail } from '../../services/authService';
import { SET_LOGIN,SET_NAME} from '../../redux/features/auth/authSlice';
import {useDispatch} from "react-redux";
import Loader from '../../components/loader/Loader';


const initialState={
    name:"",
    email:"",
    password:"",
    password2:"",

}



const Register= () => {
    const dispatch=useDispatch()
    const navigate=useNavigate()
    const [isLoading,setIsLoading]=useState(false)
    const [formData,setformData]=useState(initialState)
    const {name,email,password,password2}=formData //destructure

    const handleInputChange=(e)=>{
        const {name,value} =e.target; //access name value of input text box
        setformData({...formData,[name]:value}) //objects
    };

    const register=async(e)=>{
        e.preventDefault()

        if(!name || !email || !password)
        {
            return toast.error("All fields are required")
        }

        if(password!==password2)
        {
            return toast.error("Passwords do not match")
        }

        if(password.length<6)
        {
            return toast.error("Password must be up to 6 characters")
        }
        
        if(!validateEmail(email))
        {
            return toast.error("Please enter a valid Email Id")
        }
        
        const userData={
            name,email,password,
        }

        setIsLoading(true);//push data to authservice to register localhost
        try{
            const data=await registerUser(userData)
            
            await dispatch(SET_LOGIN(true)) //save nam eif loggedin and move to dashboard
            await dispatch(SET_NAME(data.name))
            navigate("/dashboard");
            setIsLoading(false)
        }catch(error)
        {
            setIsLoading(false)
            console.log(error.message)
        }
    };

  return (
    <div className={`container ${styles.auth}`}>
        {isLoading && <Loader/>}
        <Card>
    <div className={styles.form}>
        <div className="--flex-center">
            <TiUserAddOutline size={35} color="#999"/>
        </div>
        <h2>Regiser</h2>


    <form onSubmit={register}>
        <input type="text" placeholder='Name' required name="name" value={name} onChange={handleInputChange}/>
        <input type="email" placeholder='Email' required name="email" value={email} onChange={handleInputChange}/>
        <input type="password" placeholder='Password' required name="password" value={password} onChange={handleInputChange}/>
        <input type="password" placeholder='Confirm Password' required name="password2" value={password2} onChange={handleInputChange}/>




        <button type="submit" className='--btn --btn-primary --btn-block'>Regiser</button>   

    </form>
    <Link to="/forgot">Forgot Password</Link>

    <span className={styles.register}>
        <Link to="/">Home</Link>
        <p>&nbsp;Already have an account? &nbsp;</p>
        <Link to="/login">Login</Link>
    </span>

    </div>
        </Card>
    
    </div>
  )
}

export default Register;