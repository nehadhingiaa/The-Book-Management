import { useFormik } from 'formik'
import React, { useEffect, useState } from 'react'
import InputField from '../../Elements/InputField/Inputfield'
import TextAreaField from '../../Elements/TextArea/TextArea'
import { useDispatch, useSelector } from 'react-redux'
import { createBooks, fetchBooks, updateBooks } from '../../BookListing/BookApi'

// import SweetAlert from '../../Elements/SweetAlert/SweetAlertForSuccess'


const AddBooksComponent = ({bookId,closeModal}) => {
  const [initialValues, setInitialValues] = useState({
    title: '',
    author: '',
    description: '',
    stockCount: '',
    quantity: '',
    price: '',
    image: null
  },);
  const dispatch=useDispatch()
  const {books}=useSelector((state)=>state.books)
  const selectedBook =books.find((book)=>book.id === bookId)
  console.log(selectedBook,"selectedBook")

 
  useEffect(() => {
    if (selectedBook) {
        setInitialValues({
            title: selectedBook.title,
            author: selectedBook.author,
            price: selectedBook.price,
            stockCount:selectedBook.stockCount || null
        });
    }
}, [selectedBook]);

  console.log(books,"books in updated form")
  const {values,handleChange,handleSubmit,setFieldValue}=useFormik({
    enableReinitialize: true,
    initialValues,
    onSubmit:async(values)=>{
     
     
      if(bookId){
        try{
          dispatch(updateBooks({...values,id:bookId}));
          // dispatch(fetchBooks()); 
        // <SweetAlert text={"Book has been updated successfully"}/>
        }
        catch(error){
        <SweetAlert text={error}/>
        }
      }
      else{
        try{
          await dispatch(createBooks(values));
        // <SweetAlert text={"Book has been added successfully"}/>
        }
        catch(error)
        {
        <SweetAlert text={error}/>
        }
      }
        
    }
  })
  
  const handleImageChange = (event) => {
    const file = event.target.files[0]; // Get the selected file
    if (file) {
        setFieldValue("image", file); // Set the file in Formik state
    }
};



  return (
    
     <div className='fixed inset-0 flex items-center justify-center bg-transparent bg-opacity-50 '>
       <div className="min-w-screen-lg h-auto p-10 bg-purple-50 rounded-md border-2 border-purple-200">
        
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-lg w-full max-w-2xl">
      <h2 className="text-4xl font-semibold text-purple-700 mb-4 text-center">
      {bookId ? "Update Book" : "Add Book"}
      </h2>

      <div className="grid grid-cols-2 gap-4">
      {/* Title */}
      <div>
     
      <InputField
      label="Title"
      type="text"
      name="title"
      id="title"
      value={values.title}
      onChange={handleChange}
      placeholder="Enter Book Title"
      />
      </div>

      {/* Author */}
      <div>
     
      <InputField
      label="Author"
      type="text"
      name="author"
      id="author"
      value={values.author}
      onChange={handleChange}
      placeholder="Enter Author Name"
      />
      </div>

      {/* Description */}
      <div className="col-span-2">
      
      <TextAreaField
      label="Description"
      name="description"
      value={values.description}
      onChange={handleChange}
      placeholder="Enter Description"
      rows="3"
      />
      </div>

      {/* Stock Count */}
      <div>
      <InputField
      label="Stock Count"
      type="number"
      name="stockCount"
      id="stockCount"
      value={values.stockCount}
      onChange={handleChange}
      placeholder="Available Stock"
      />
      </div>

      {/* Price */}
      <div>
      <InputField
      label="Price"
      type="number"
      name="price"
      id="price"
      value={values.price}
      onChange={handleChange}
      placeholder="Enter Price"
      />
      </div>

      {/* Image Upload */}
      <div className="col-span-2">
      <label className="block text-purple-600 text-2xl font-medium mb-1">Upload Image</label>
      <input
      type="file"
      name="image"
      id="image"
      accept="image/png, image/jpeg, image/jpg, image/gif, image/webp"
      onChange={handleImageChange}
      className="w-full px-3 py-2 border border-purple-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-purple-500"
      />
      </div>
      </div>

      {/* Buttons */}
      <div className="flex justify-end gap-3 mt-6 space-x-4">
      <button
      type="button"
      onClick={closeModal}
      className="bg-purple-500 text-white px-5 py-2 rounded-lg hover:bg-purple-600 transition"
      >
      Cancel
      </button>
      <button
      type="submit"
      className="bg-purple-700 text-white px-5 py-2 rounded-lg hover:bg-purple-800 transition"
      >
      {bookId ? "Update Book" : "Add Book"}
      </button>
      </div>
      </form>


      </div>
     </div>
     
    
  )
}

export default AddBooksComponent
