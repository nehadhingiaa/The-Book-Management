import React from 'react'

const ViewOrder = (closeModal,bookDetail) => {
  return (
    <div className='w-full max-w-screen h-[60vh] bg-purple-200'>
     <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse sit cumque accusamus reprehenderit est deleniti ex illum.
         Praesentium, neque architecto! Iure possimus deleniti quibusdam harum? Quia culpa aspernatur praesentium odit.</p>
         <span>{bookDetail?.name}</span>
         <button onClick={closeModal}>cancel</button>
    </div>
  )
}

export default ViewOrder
