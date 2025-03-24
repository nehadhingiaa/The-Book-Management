import React from 'react'
import {useNavigate } from 'react-router-dom'
import * as Yup from "yup";
import { Formik, Form, useFormik } from "formik";
import '../../App.css'
import { toast } from 'react-toastify';
import axios from 'axios';
const initialValues={
  name:'',
  email:'',
  user:''
}

const RegistrationForm = ({closeModal}) => {
 
  
  const navigate =useNavigate()
 
    const validationSchema = Yup.object({
      name: Yup.string().min(2).max(25).required("Name is required"),
      email: Yup.string().email("Invalid email").required("Email is required"),
    });

    const {values,errors,handleBlur,touched,handleChange,handleSubmit,isSubmitting}=useFormik({
      initialValues:initialValues,
      validationSchema:validationSchema,
       onSubmit : async (values) => {
        
        try {
          const response= await axios.post("http://localhost:8000/user", values);
          console.log(response.data,'login response')
          localStorage.setItem("user",JSON.stringify(response.data))
          
          toast.success("Login Successfully");
          alert("login successfully")
         if(response.data.user === "buyer"){
          navigate('/buyer-dashboard')
         }
         else if (response.data.user === "seller"){
          navigate('/seller-dashboard')
         }
        } catch (error) {
        
          if (error.response) {
            toast.error(error.response.data); 
          } else {
            toast.error("An error occurred. Please try again."); 
          }
          // navigate('/home');
        }
      }
    })
    console.log(values,"values")

  return (
   
  <div className="fixed inset-0 bg-transparent bg-opacity-75 backdrop-blur-sm flex justify-center items-center z-50 ">
      <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-lg relative">
        <h2 className="text-2xl font-bold text-center text-gray-800">Signup Form</h2>
            <form className="mt-4" onSubmit={handleSubmit}>
              {/* Name Input */}
              <div className="mb-4">
                <label htmlFor='name' className="block text-gray-700 font-medium mb-1 text-left">Name</label>
                <input 
                type="text"
                name='name'
                id='name'
                placeholder='enter your name'
                onChange={handleChange}
                value={values.name}
                onBlur={handleBlur}
                autoComplete='off'
                />
                
              </div>
             {errors.name && touched.name ?  <p className='text-red-500'>{errors.name}</p>  :null}

              {/* Email Input */}
              <div className="mb-4">
                <label htmlFor='email' className="block text-gray-700 font-medium mb-1 text-left">Email</label>
                <input 
                type="email"
                name='email'
                id='email'
                placeholder='enter your name'
                onChange={handleChange}
                value={values.email}
                onBlur={handleBlur}
                autoComplete='off'
                />
              </div>
              {errors.email && touched.email ?  <p className='text-red-500'>{errors.email}</p>  :null}

              <div className='flex justify-between mb-4'>
              <span className='flex gap-2'>
              <label htmlFor='buyer' className="block text-gray-700 font-medium mb-1 text-left">Buyer</label>
              <input 
                type="radio"
                name='user'
                id='buyer'
                onChange={handleChange}
                value="buyer"
                checked={values?.user==="buyer"}
                onBlur={handleBlur}
                />
              </span>
               <span className='flex gap-2'>
               <label htmlFor='seller' className="block text-gray-700 font-medium mb-1 text-left">Seller</label>
                <input 
                type="radio"
                name='user'
                id='seller'
                onChange={handleChange}
                value={"seller"}
                checked={values?.user==="seller"}
                onBlur={handleBlur}
                />
               </span>
              </div>

              {/* Submit Button */}
             <div className='flex gap-3'> <button
                type="submit"
                className="w-1/2 px-3 py-2 text-white font-semibold bg-purple-400 rounded-lg hover:bg-purple-600 transition-all"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Logging in..." : "Login"}
              </button>
              <button
                type="submit"
                className="w-1/3 px-4 py-2 text-white font-semibold bg-purple-400 rounded-lg hover:bg-purple-600 transition-all"
                onClick={closeModal}
                
              >
               Cancel
              </button></div>
            </form>
        
      </div>
    </div>

  
  )
}

export default RegistrationForm


