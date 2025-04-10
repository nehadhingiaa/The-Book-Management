import React from "react";
import "../../App.css";
import { useTranslation } from "react-i18next";
import loginImage from "../../assets/images/loginImg.jpg";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import InputField from "../../components/Elements/InputField/Inputfield";
import Button from "../../components/Elements/Button/Button";
import useLoginForm from "../../hooks/Login.hooks";

const Login = ({ closeModal, setIsModal }) => {
  const { t } = useTranslation();

  const {
    isLogin,
    showPassword,
    togglePasswordVisibility,
    toggleLoginMode,
    formik,
  } = useLoginForm({ setIsModal });

  const { values, errors, touched, handleChange, handleBlur,handleSubmit} = formik;

  return (
    <div className="fixed inset-0 bg-transparent bg-opacity-75 backdrop-blur-sm flex justify-center items-center z-50">
      <div className="w-[95%] max-w-screen-lg h-[85%] bg-pink-100 border-2 border-pink-500 shadow-lg flex flex-col md:flex-row overflow-hidden">
        <div className="hidden md:block md:w-1/2 h-full">
          <img
            src={loginImage}
            alt="Background"
            className="w-full h-full object-cover opacity-65"
          />
        </div>

        <div className="w-full md:w-1/2 h-full overflow-y-auto p-6 flex flex-col items-center">
          <div className="w-full max-w-md m-auto">
            <h1 className="font-extrabold text-4xl mt-3 text-center">
              {isLogin ? t("loginForm") : t("signUp")}
            </h1>
            <form
              className="mt-4 flex flex-col items-center justify-start w-full max-w-md m-auto"
              onSubmit={handleSubmit}
            >
              {isLogin ? (
                <>
                  <div className="mb-4 w-full">
                    <InputField
                      label={t("username")}
                      type="text"
                      name="username"
                      value={values.username}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      placeholder="Enter your username"
                      error={errors.username}
                      touched={touched.username}
                      required={true}
                    />
                  </div>

                  <div className="mb-4 w-full ">
                    <InputField
                      label={t("password")}
                      type="password"
                      name="password"
                      placeholder="Enter your password"
                      onChange={handleChange}
                      value={values.password}
                      onBlur={handleBlur}
                      error={errors.password}
                      touched={touched.password}
                      required={true}
                    />
                  </div>
                </>
              ) : (
                <>
                  <div className="mb-4 w-full">
                    <InputField
                      label={t("username")}
                      type="text"
                      name="username"
                      placeholder="Enter your username"
                      onChange={handleChange}
                      value={values.username}
                      onBlur={handleBlur}
                      error={errors.username}
                      touched={touched.username}
                      required={true}
                    />
                  </div>

                  <div className="mb-4 w-full">
                    <InputField
                      label={t("email")}
                      type="email"
                      name="email"
                      placeholder="Enter your email"
                      onChange={handleChange}
                      value={values.email}
                      onBlur={handleBlur}
                      error={errors.email}
                      touched={touched.email}
                      required={true}
                    />
                  </div>
                  <div className="mb-4 w-full relative">
                    <InputField
                      label={t("password")}
                      type={`${showPassword ? "text" : "password"}`}
                      name="password"
                      placeholder="Enter your password"
                      onChange={handleChange}
                      value={values.password}
                      onBlur={handleBlur}
                      error={errors.password}
                      touched={touched.password}
                      required={true}
                    />
                    <button
                      type="button"
                      onClick={togglePasswordVisibility}
                      className="absolute right-3 top-10 text-gray-600"
                    >
                      {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </button>
                  </div>
                  <div className="mb-4 w-full">
                    <InputField
                      label={t("confirmPassword")}
                      type="confirmPassword"
                      name="confirmPassword"
                      placeholder="Enter your confirmPassword"
                      onChange={handleChange}
                      value={values.confirmPassword}
                      onBlur={handleBlur}
                      error={errors.confirmPassword}
                      touched={touched.confirmPassword}
                      required={true}
                    />
                  </div>

                  <div className="w-full">
                    <p className="font-bold mb-1">{t("registerAs")}</p>
                    <div className="flex gap-6">
                      <label className="flex items-center gap-2">
                        <input
                          type="radio"
                          name="user"
                          value="buyer"
                          checked={values.user === "buyer"}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                        {t("buyer")}
                      </label>

                      <label className="flex items-center gap-2">
                        <input
                          type="radio"
                          name="user"
                          value="seller"
                          checked={values.user === "seller"}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                        {t("seller")}
                      </label>
                    </div>
                  </div>

                  {values.user === "seller" && (
                    <>
                      <div className="mb-4 w-full">
                        <InputField
                          label={t("sellerName")}
                          type="text"
                          name="sellerName"
                          placeholder="Enter seller name"
                          onChange={handleChange}
                          value={values.sellerName}
                          onBlur={handleBlur}
                          error={errors?.sellerName}
                          touched={touched.sellerName}
                          required={values?.user === "seller"}
                        />
                      </div>
                      <div className="mb-4 w-full">
                        <InputField
                          label={t("shopName")}
                          type="text"
                          name="shopName"
                          id="shopName"
                          placeholder="Enter shop name"
                          onChange={handleChange}
                          value={values.shopName}
                          onBlur={handleBlur}
                          error={errors.shopName}
                          touched={touched?.shopName}
                          required={values?.user === "seller"}
                        />
                      </div>
                    </>
                  )}
                </>
              )}
              <div className="flex flex-col gap-3 items-center w-full pt-2">
                <Button type="submit" className="w-full">
                  {isLogin ? t("login") : t("signUp")}
                </Button>
                <Button
                  type="button"
                  onClick={closeModal}
                  className="w-full !bg-transparent border-2 border-pink-300 !text-pink-600"
                >
                  {t("cancel")}
                </Button>
              </div>
              <div className="text-center pt-4">
                <span>
                  {isLogin ? t("dontHaveAccount") : t("alreadyHaveAccount")}?{" "}
                  <span
                    className="text-pink-500 cursor-pointer"
                    onClick={toggleLoginMode}
                  >
                    {isLogin ? t("signUp") : t("login")}
                  </span>
                </span>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
