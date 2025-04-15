import { useState } from "react";
import { useDispatch } from "react-redux";
import { useFormik } from "formik";
// import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { loginUser, registerUser } from "../pages/Login/LoginApi";
import validationSchemas from "../pages/Login/LognSchema";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
const loginInitialValues = {
  username: "",
  password: "",
};

const registerInitialValues = {
  username: "",
  email: "",
  password: "",
  confirmPassword: "",
  user: "buyer",
  sellerName: "",
  shopName: "",
};

const useLoginForm = ({ setIsModal }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(true);

  const userData = JSON.parse(localStorage.getItem("user"));

  const formik = useFormik({
    initialValues: isLogin ? loginInitialValues : registerInitialValues,
    enableReinitialize: true,
    validationSchema: isLogin
      ? validationSchemas.login
      : validationSchemas.registerSchema,
    onSubmit: async (values) => {
      if (Object.keys(formik.errors).length > 0) {
        toast.error("Please fill all required fields before submitting.");
        return;
      }

      if (isLogin && values) {
        try {
          await dispatch(
            loginUser({ username: values.username, password: values.password })
          ).unwrap();

          toast.success(t("loginSuccessfully"));
          if (userData?.user === "buyer") {
            navigate("/buyer-dashboard");
          } else if (userData?.user === "seller") {
            navigate("/seller-dashboard");
          } else {
            navigate("/");
          }
        } catch (error) {
     
          toast.error(error?.message || "Login failed.");
        }
      } else {
        try {
          await dispatch(registerUser(values)).unwrap();
          toast.success(t("registerSuccessfully"));
          setTimeout(() => {
            setIsLogin?.((prev) => !prev);
            setIsModal?.((prev) => !prev);
          }, 300);
        } catch {
          toast.error(t("register failed"));
        }
      }
    },
  });

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const toggleLoginMode = () => {
    setIsLogin((prev) => !prev);
  };

  return {
    isLogin,
    showPassword,
    togglePasswordVisibility,
    toggleLoginMode,
    formik,
  };
};

export default useLoginForm;
