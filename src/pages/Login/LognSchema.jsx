import * as Yup from "yup";
const validationSchemas = {
  login: Yup.object({
    username: Yup.string().min(3).max(20).required("Username is required"),

    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .max(20, "Password must not exceed 20 characters")
      .matches(
        /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/,
        "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
      )
      .required("Password is required"),
  }),

  registerSchema: Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Email is required"),

    username: Yup.string().min(3).max(20).required("Username is required"),

    password: Yup.string()
      .min(8, "Password must be at least 8 characters")
      .matches(/[a-z]/, "Password must contain at least one lowercase letter")
      .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
      .matches(/\d/, "Password must contain at least one number")
      .matches(
        /[@$!%*?&]/,
        "Password must contain at least one special character"
      )
      .required("Password is required"),

    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Confirm Password is required"),

    user: Yup.string().required("User type is required"),

    sellerName: Yup.string().when("user", {
      is: "seller",
      then: (schema) =>
        schema
          .min(3, "Too short")
          .max(20, "Too long")
          .required("Seller name is required"),
      otherwise: (schema) => schema.notRequired(),
    }),

    shopName: Yup.string().when("user", {
      is: "seller",
      then: (schema) =>
        schema
          .min(3, "Too short")
          .max(30, "Too long")
          .required("Shop name is required"),
      otherwise: (schema) => schema.notRequired(),
    }),
  }),
};

export default validationSchemas;
