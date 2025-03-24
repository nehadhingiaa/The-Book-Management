import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { IoIosArrowRoundForward } from "react-icons/io";
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { placeOrder } from '../Slices/PlaceOrdersSlice';
import Loader from '../../../../components/Elements/Loader/Loader';
import Swal from 'sweetalert2';
import Button from '../../../../components/Elements/Button/Button';
import OrderModal from '../../../../components/OrderModal/OrderModal';

const PlaceOrder = ({cartData,subQuantity,subTotal}) => {
  const [isModalOpen,setIsModalOpen] =useState(false)

const dispatch=useDispatch()
const {orders,loading}=useSelector((state)=>state.orders)
console.log(orders,"orders")

 const {values,handleSubmit,handleChange,isSubmitting}= useFormik({
  initialValues:{totalBooks:subQuantity,
    totalPrice:subTotal,
    tax:'799',
    cartItems:cartData
  },
  enableReinitialize: true,
  onSubmit: async (values) => {
    
    // try {
      
    //     await dispatch(placeOrder(values));
    //     alert("order has been placed")
    //     Swal.fire({
    //       title: "Order Placed Successfully!",
    //       icon: "success",
    //       draggable: true,
    //       timer:5000,
    //       timerProgressBar:true,
    //       // Removed timer and timerProgressBar to make the alert stay until closed manually
    //     });
      
     
     
    // } catch (error) {
    //   console.log(error);
    //   Swal.fire({
    //     title: "Error!",
    //     text: "There was an issue placing your order.",
    //     icon: "error",
    //     draggable: true,
    //     timer:5000,
    //     timerProgressBar:true,
    //     // Removed timer and timerProgressBar to make the alert stay until closed manually
    //   });
    // }
    console.log(values)
  }
}

)
if(isSubmitting){
  return <div>
    <Loader loading={loading}/>
  </div>
}

const handleShowModal=()=>{
  setIsModalOpen(true)
}
const handleCloseModal=()=>{
  setIsModalOpen(false)
}

  return (
    <div>
      {cartData?.length &&
      <>
    <div className='block m-auto p-10 pt-20'>
      <h1 className='text-center text-4xl font-semibold'>Subtotal</h1>
     <div className='mt-5 p-5'>
    
     <form onSubmit={handleSubmit}>
 
      <div className="flex justify-between text-3xl">
        <span>Total Books</span>
        <input
          type="number"
          name="totalBooks"
          value={subQuantity}
          onChange={handleChange}
          className="text-center"
        />
      </div>

      {/* Tax */}
      <div className="flex justify-between text-3xl mt-5">
        <span>Tax</span>
        <input
          type="number"
          name="tax"
          value={values.tax}
          onChange={handleChange}
          className="text-center"
          readOnly
        />
      </div>

      {/* Total Price */}
      <div className="flex justify-between text-3xl mt-5">
        <span>Total Price</span>
        <input
          type="number"
          name="totalPrice"
          value={values.totalPrice || subTotal}
          onChange={handleChange}
          className="text-center"
        />
      </div>

      <hr className="text-purple-300 mt-5" />

    
      <div className="mt-5" onClick={handleShowModal}>
        <Button type="submit" className="bg-purple-400 w-full">
          Place Order
        </Button>
      </div>
  
      <Link to="/buyer-dashboard/books">
        <button className="flex w-full justify-center m-auto text-black bg-purple-300 hover:bg-purple-200 mt-5 hover:text-purple-600">
          <span>Continue Shopping</span> <span><IoIosArrowRoundForward /></span>
        </button>
      </Link>
    </form>
     </div>
   
    </div>
      </>}

      {isModalOpen && <OrderModal closeModal={handleCloseModal}/>}
    </div>
  )
}

export default PlaceOrder
