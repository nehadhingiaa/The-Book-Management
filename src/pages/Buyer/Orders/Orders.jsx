import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { fetchBooks } from '../../../components/BookListing/BookApi';
import { MdOutlineEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { GrView } from "react-icons/gr";

const Orders = () => {
  const dispatch =useDispatch()
   const { books} = useSelector((state) => state.books);
   
 
   useEffect(() => {
    if (books.length === 0) {
      dispatch(fetchBooks());  // Fetch only if data is empty
    }
  }, [dispatch, books.length]);
  return (
 <div className='grid grid-cols-12 gap-3'>
    <div className='col-span-8 bg-purple-100'>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi minus animi numquam vero consequatur esse quidem totam magnam officiis a sit itaque, necessitatibus dolorum! Tenetur, cumque consequuntur, debitis aliquam hic dolores nesciunt commodi magnam officia inventore id? Voluptatem ut illo, eum omnis quas autem inventore blanditiis veniam ipsum fuga accusantium?</p>
    <table className="w-full table-auto border-collapse">
        <thead className="bg-purple-200">
          <tr>
            <th className="px-4 py-2 text-left border-b text-black">ID</th>
            <th className="px-4 py-2 text-left border-b text-black">Image</th>
            <th className="px-4 py-2 text-left border-b text-black">Book Title</th>
            <th className="px-4 py-2 text-left border-b text-black">Author</th>
            <th className="px-4 py-2 text-left border-b text-black">Price</th>
            <th className="px-4 py-2 text-left border-b text-black">Action</th>
          </tr>
        </thead>
        <tbody className='overflow-y-auto'>
         {
          books?.map((book)=>(
            <tr key={book.id}>
            <td className="px-4 py-2 border-b">{book?.id}</td>
            <td className="px-4 py-2 border-b w-16 h-16">
            <img src={book.image} alt={book.title} className="book-image w-full sm:w-10 h-10 object-cover" />
            </td>
            <td className="px-4 py-2 border-b">{book?.title}</td>
            <td className="px-4 py-2 border-b">{book?.author}</td>
            <td className="px-4 py-2 border-b">$10.99</td>
            <td className="px-4 py-2 border-b">
              <span className='flex gap-2'>
                <button className='bg-purple-200 text-black px-2 py-2 rounded-md'><MdOutlineEdit /></button>
                <button className='bg-purple-200 text-black px-2 py-2 rounded-md'><MdDelete /></button>
                <button className='bg-purple-200 text-black px-2 py-2 rounded-md'><GrView /></button>

              </span>
            </td>
          </tr>
          ))
         }
        </tbody>
      </table>
    </div>
    <div className='col-span-4 bg-purple-100'></div>
    </div>

  )
}

export default Orders
