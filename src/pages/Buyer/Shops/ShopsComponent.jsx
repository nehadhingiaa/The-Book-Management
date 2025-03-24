import React, { useEffect } from 'react'
import { FaBook } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import Loader from '../../../components/Elements/Loader/Loader'
import { fetchUsers } from '../../../components/Login/authSlice'
import { useFormik } from 'formik'

const initialValues ={
    shop:''
}


const ShopsComponent = () => {
    const dispatch =useDispatch()
    const {user,loading}=useSelector((state)=>state.user)
    const sellers=user.filter((data)=>data.user==='seller')
    console.log(sellers,"sellers")

    useEffect(()=>{
        dispatch(fetchUsers())
    },[dispatch])

    const {values,handleChange,handleSubmit}=useFormik({
        initialValues:initialValues,
        onSubmit:async(values)=>{
        }
    })
    console.log(values,"values")

    if(loading){
        return(
            <div className='flex justify-center text-center'>
            <Loader loading={loading}/>
           </div>
        )
    }
    
  return (
        <div className=' '>
            <div>
                <form onSubmit={handleSubmit}>
                <label htmlFor='name' className="block text-black font-medium mb-1 text-left">Search Shops</label>
               <input 
                type="text"
                name='shop'
                id='shop'
                placeholder='Search Shop here ...'
                onChange={handleChange}
                value={values.shop}
                autoComplete='off'
                className='border-b-2 border-2 text-black border-purple-300 rounded focus:border-purple-500 p-3'
               />
                </form>
            </div>
          <div className='flex flex-wrap justify-center gap-4 mt-5'>
          {sellers.map((seller)=>(
                    <div class="max-w-lg p-6 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
                    <a href="#">
                    <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white"><span>Seller Name:{seller.name}</span></h5>
                    </a>
                    <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.</p>
                    <a href="/buyer-dashboard/books" class="inline-flex items-center px-3 py-2 text-md font-medium text-center text-white bg-purple-700 rounded-lg hover:bg-purple-400 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                    Read more
                    <svg class="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
                    </svg>
                    </a>
                    </div>
                ))
            }
     
          </div>
    </div>
     
  )
}

export default ShopsComponent
