import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { Formik, Form, useFormik } from "formik";
import "../../App.css";
import { toast } from "react-toastify";
import axios from "axios";
import RegistrationForm from "../Registration/RegistrationForm";
import { MdContactSupport } from "react-icons/md";
import { loginUser, registerUser } from "./authSlice";
import { useDispatch, useSelector } from "react-redux";
import InputField from "../Elements/InputField/Inputfield";
import Button from "../Elements/Button/Button";
import { useTranslation } from "react-i18next";

// import { fetchUsers } from './authSlice';
const initialValues = {
  name: "",
  email: "",
  sellerName:'',
  shopName:''
};

const Login = ({ closeModal }) => {
  const {t}=useTranslation();
  const [isLogin, setIsLogin] = useState(true);
  //  const [userData,setUserData]=useState([])
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const validationSchema = Yup.object({
    name: Yup.string().min(2).max(25).required("Name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
  });

  const {
    values,
    errors,
    handleBlur,
    touched,
    handleChange,
    handleSubmit,
    isSubmitting,
  } = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      if (isLogin) {
        
        try {
          await dispatch(loginUser(values.email)).unwrap(); // Unwrap to handle rejections
        } catch (error) {
          alert(error); // Show error message if user does not exist
          return;
        }
      } else {
        dispatch(registerUser(values));
      }
    },
  });

  useEffect(() => {
    if (user?.user) {
      navigate(
        user.user === "seller" ? "/seller-dashboard" : "/buyer-dashboard"
      );
    }
  }, [user, navigate]);

  return (
    <div className="fixed inset-0 bg-transparent bg-opacity-75 backdrop-blur-sm flex justify-center items-center z-50 ">
      <div className="w-full flex justify-center auto h-100vh max-w-screen-lg bg-pink-100 border-2 border-solid border-pink-500 p-6 rounded-lg shadow-lg">
     
        <div className="w-[900px] bg-white rounded-md">
        <h1 className="font-extrabold text-4xl mt-3 text-center">
              {isLogin ?  t("loginForm"):t("signUpForm")}
      </h1>
          {isLogin ? (
            <>
             
              <form
                className="mt-5  flex flex-col justify-center m-auto"
                onSubmit={handleSubmit}
              >
                {/* Name Input */}
                <div className="mb-4">
                  <InputField
                    label={t("name")}
                    type="text"
                    name="name"
                    id="name"
                    placeholder="enter your name"
                    onChange={handleChange}
                    value={values.name}
                    onBlur={handleBlur}
                    autoComplete="off"
                  />
                </div>
                {errors.name && touched.name ? (
                  <p className="text-red-500 text-left">{errors.name}</p>
                ) : null}

                {/* Email Input */}
                <div className="mb-4">
                  <InputField
                    label={t("email")}
                    type="email"
                    name="email"
                    id="email"
                    placeholder="enter your name"
                    onChange={handleChange}
                    value={values.email}
                    onBlur={handleBlur}
                    autoComplete="off"
                  />
                </div>
                {errors.email && touched.email ? (
                  <p className="text-red-500 text-left">{errors.email}</p>
                ) : null}

                {/* Submit Button */}
                <div className="flex gap-3">
                  <Button disabled={isSubmitting}>
                    {isSubmitting && isLogin ? "Logging in..." : t("login")}
                  </Button>

                  <Button onClick={closeModal}>{t("cancel")}</Button>
                </div>
                <div className="mt-4">
                  <span>
                    {t("dontHaveAccount")}?{" "}
                    <span
                      className="text-pink-500"
                      onClick={() => setIsLogin(false)}
                    >
                      {t("signUp")}
                    </span>
                  </span>
                </div>
              </form>
            </>
          ) : (
            <>
              <form
                className="mt-4 flex flex-col justify-center m-auto"
                onSubmit={handleSubmit}
              >
                {/* Name Input */}
                <div className="mb-4">
                  <InputField
                    label={t("name")}
                    type="text"
                    name="name"
                    id="name"
                    placeholder="enter your name"
                    onChange={handleChange}
                    value={values.name}
                    onBlur={handleBlur}
                    autoComplete="off"
                  />
                </div>
                {errors.name && touched.name ? (
                  <p className="text-red-500 text-left">{errors.name}</p>
                ) : null}

                {/* Email Input */}
                <div className="mb-4">
                  <InputField
                    label={t("email")}
                    type="email"
                    name="email"
                    id="email"
                    placeholder="enter your name"
                    onChange={handleChange}
                    value={values.email}
                    onBlur={handleBlur}
                    autoComplete="off"
                  />
                </div>
                {errors.email && touched.email ? (
                  <p className="text-red-500 text-left">{errors.email}</p>
                ) : null}

                <div className="flex justify-items-start gap-2 mb-4">
                  <span className="flex gap-2">
                    <label
                      htmlFor="buyer"
                      className="block text-black font-medium mb-1 text-left"
                    >
                      {t("buyer")}
                    </label>
                    <input
                      type="radio"
                      name="user"
                      id="buyer"
                      onChange={handleChange}
                      value="buyer"
                      checked={values?.user === "buyer"}
                      onBlur={handleBlur}
                    />
                  </span>
                  <span className="flex gap-2">
                    <label
                      htmlFor="seller"
                      className="block text-black font-medium mb-1 text-left"
                    >
                      {t("seller")}
                    </label>
                    <input
                      type="radio"
                      name="user"
                      id="seller"
                      onChange={handleChange}
                      value={"seller"}
                      checked={values?.user === "seller"}
                      onBlur={handleBlur}
                    />
                  </span>
                </div>

                {values.user === "seller" && (
                  <div className="mb-4">
                  {/* Seller Name */}
                  <InputField
                  label={t("sellerName")}
                  type="text"
                  name="sellerName"
                  id="sellerName"
                  placeholder="Enter seller name"
                  onChange={handleChange}
                  value={values.sellerName}
                  onBlur={handleBlur}
                  autoComplete="off"
                  />
                  {errors.sellerName && touched.sellerName && <p className="text-red-500 text-left">{errors.sellerName}</p>}

                  <InputField
                  label={t("shopName")}
                  type="text"
                  name="shopName"
                  id="shopName"
                  placeholder="Enter shop name"
                  onChange={handleChange}
                  value={values.shopName}
                  onBlur={handleBlur}
                  autoComplete="off"
                  />
                  {errors.shopName && touched.shopName && <p className="text-red-500 text-left">{errors.shopName}</p>}
                  </div>
                )}



                {/* Submit Button */}
                <div className="flex gap-3">
                  <Button disabled={isSubmitting}>
                    {isSubmitting && !isLogin ? "Logging in..." : t("signUp")}
                  </Button>
                  
                  <Button onClick={closeModal}>{t("cancel")}</Button>
                </div>
                <div className="mt-4">
                  <span>
                    {t("alreadyHaveAccount")}?{" "}
                    <span
                      className="text-pink-500"
                      onClick={() => setIsLogin(true)}
                    >
                      {t("login")}
                    </span>
                  </span>
                </div>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
