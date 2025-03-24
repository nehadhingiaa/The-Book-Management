import { useFormik } from 'formik'
import React, { useEffect, useState} from 'react'
import InputField from '../../Elements/InputField/Inputfield'
import TextAreaField from '../../Elements/TextArea/TextArea'
import { useDispatch, useSelector } from 'react-redux'
import { createBooks, updateBooks } from '../../BookListing/BookApi'
import Swal from 'sweetalert2'
import { useTranslation } from 'react-i18next'

// import SweetAlert from '../../Elements/SweetAlert/SweetAlertForSuccess'


const AddBooksComponent = ({bookId,closeModal}) => {
  const {t}=useTranslation()
  const [initialValues, setInitialValues] = useState({
    title: '',
    author: '',
    stockCount: '',
    quantity: 1,
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
          
        }
        catch(error){
        <SweetAlert text={error}/>
        }
      }

      else{
        try{
          await dispatch(createBooks(values));  // <SweetAlert text={"Book has been added successfully"}/>
          Swal.fire({
            title: "Book Has Been Added Successfully",
            icon: "success",
            confirmButtonText: 'OK',
            // Ensure timer is not set here
            timerProgressBar: true,
            draggable: true,
            // Optional: You can log when the modal closes (on user click)
            willClose: () => {
              console.log('Order placed and alert closed');
            }
          });
        }
        catch
        {
          Swal.fire({
            title: "Please check,something went wrong",
            icon: "error",
            confirmButtonText: 'OK',
            // Ensure timer is not set here
            timerProgressBar: true,
            draggable: true,
            // Optional: You can log when the modal closes (on user click)
            willClose: () => {
              console.log('Order placed and alert closed');
            }
          });
        }
      }
        
    }
  })

  const convertToBase64 = (file, callback) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => callback(reader.result); // Base64 string
    reader.onerror = (error) => console.error("Error converting file: ", error);
  };
  
 
  return (
    
     <div className='fixed inset-0 flex items-center justify-center bg-transparent bg-opacity-50 '>
       <div className="min-w-screen-lg h-auto p-10 bg-purple-50 rounded-md border-2 border-purple-200">
        
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-lg w-full max-w-2xl">
      <h2 className="text-4xl font-semibold text-purple-700 mb-4 text-center">
      {bookId ? t("updateBook") : t("addBook")}
      </h2>

      <div className="grid grid-cols-2 gap-4">
      {/* Title */}
      <div>
     
      <InputField
      label={t("bookTitle")}
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
      label={t("author")}
      type="text"
      name="author"
      id="author"
      value={values.author}
      onChange={handleChange}
      placeholder="Enter Author Name"
      />
      </div>

      
      {/* Stock Count */}
      <div>
      <InputField
      label={t("stockCount")}
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
      label={t("price")}
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
      onChange={(event) => {
        const file = event.target.files[0];
        convertToBase64(file, (base64) => {
          setFieldValue("image", base64);  // Save Base64 in Formik state
        });
      }}
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
      {t("cancel")}
      </button>
      <button
      type="submit"
      className="bg-purple-700 text-white px-5 py-2 rounded-lg hover:bg-purple-800 transition"
      >
      {/* {t(bookId ? "updateBook" : "addBook")}
       */}
      {bookId ? t("updateBook") : t("addBook")}

      </button>
      </div>
      </form>


      </div>
     </div>
     
    
  )
}

export default AddBooksComponent
