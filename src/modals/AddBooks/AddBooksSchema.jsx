import * as Yup from "yup";

const validationSchema = Yup.object().shape({
  title: Yup.string()
    .min(3, "Title must be at least 3 characters")
    .max(20, "Title cannot exceed 100 characters")
    .required("Title is required"),

  author: Yup.string()
    .min(3, "Author name must be at least 3 characters")
    .max(50, "Author name cannot exceed 50 characters")
    .required("Author name is required"),

  stockCount: Yup.number()
    .typeError("Stock count must be a number")
    .integer("Stock count must be a whole number")
    .min(1, "Stock count must be at least 1")
    .required("Stock count is required"),

  price: Yup.number()
    .typeError("Price must be a number")
    .min(1, "Price must be at least 1")
    .required("Price is required"),

 
});

export default validationSchema;
