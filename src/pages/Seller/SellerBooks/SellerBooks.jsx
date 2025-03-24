import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { IoIosStar } from "react-icons/io";
import { MdDelete, MdOutlineEdit, MdOutlineStarBorderPurple500 } from "react-icons/md";
import { deleteBook, fetchBooks} from '../../../components/BookListing/BookApi';
import { GrView } from 'react-icons/gr';

import AddBooksComponent from '../../../components/Modals/AddBooks/AddBooksComponent';
import { showDeleteConfirmation } from '../../../components/Elements/SweetAlert/SweetAlertForDelete';
import Loader from "../../../components/Elements/Loader/Loader"


const SellerBooks = () => {
  const [isOpen,setIsOpen]=useState(false)
  const [selectedBookId,setSelectedBookId]=useState(null)
  const dispatch =useDispatch()
   const { books,loading} = useSelector((state) => state.books);

   console.log(books,"books in seller")
 
   useEffect(() => {
    if (!books || books.length === 0) {
      dispatch(fetchBooks());  // Fetch only if data is empty
    }
    
  }, [dispatch, books]);

  
  const handleShowModal=()=>{
    setIsOpen(true);
  }
  const closeModal =()=>{
    setIsOpen(false);
  }

  const handleUpdate = (id) => {
    setIsOpen(true);
    setSelectedBookId(id)
};

if(loading){
  return <div>
    <Loader loading={loading}/>
  </div>
}


const handleDelete=(id)=>{
  showDeleteConfirmation(
    "Are you sure?",
    "You want to delete ? you will not be able to revert this",
    ()=>dispatch(deleteBook(id))
  );
  // dispatch(deleteBook(id))
}


  
  return (
   <>
       <div className='min-h-screen w-full max-w-screen bg-purple-100 p-20'>
               <h1 className='mt-[30px]'>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ipsum Lorem ipsum dolor sit, amet consectetur adipisicing elit. Magni quidem molestias ipsa placeat, in nam eligendi praesentium voluptatem nostrum dolor? aut  rem ipsum</h1>
    
        <div className='text-4xl font-semibold'onClick={handleShowModal}>
          <button className='bg-purple-400 text-white text-md px-5' >
            Add Book
          </button>
          
        
        
        </div>
        
          <table className="w-full table-auto border-collapse mt-5">
            <thead className="bg-purple-200">
            <tr>

            <th className="px-4 py-2 text-left border-b text-black">Image</th>
            <th className="px-4 py-2 text-left border-b text-black">Book Title</th>
            <th className="px-4 py-2 text-left border-b text-black">Author</th>
            <th className="px-4 py-2 text-left border-b text-black">Stock Count</th>
            <th className="px-4 py-2 text-left border-b text-black">Price</th>
            <th className="px-4 py-2 text-left border-b text-black">Action</th>
            </tr>
            </thead>
            <tbody className='overflow-y-auto'>
            {
            books?.map((book)=>(
            <tr key={book.id}>

            <td className="px-4 py-2 border-b w-16 h-16">
            <img src={book.image} alt={book.title} className="book-image w-full sm:w-10 h-10 object-cover" />
            </td>
            <td className="px-4 py-2 border-b">{book?.title}</td> 
            <td className="px-4 py-2 border-b">{book?.author}</td>
            <td className="px-4 py-2 border-b">{book?.stockCount}</td>
            <td className="px-4 py-2 border-b">rs.{book?.price}/-</td>
            <td className="px-4 py-2 border-b">
            <span className='flex gap-2'>
            <button className='bg-purple-200 text-black rounded-md' onClick={(e)=>handleUpdate(book.id)} ><MdOutlineEdit /></button>
            <button className='bg-purple-200 text-black rounded-md' onClick={()=>handleDelete(book.id)}><MdDelete /></button>
            

            </span>
            </td>
            </tr>
            ))
            }
            </tbody>
          </table>

          {isOpen &&
          <AddBooksComponent bookId={selectedBookId} closeModal={closeModal}/>}
        
        </div>
       
    
   

     </>
  )
}

export default SellerBooks






