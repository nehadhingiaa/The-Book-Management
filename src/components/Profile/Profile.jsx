import React from "react";
import InputField from "../Elements/InputField/Inputfield";
import bookbanner from "../../assets/images/bookbanner.jpg";
import defaultImg from "../../assets/images/defaultImg.jpg";
import useProfileForm from "../../hooks/Profile.hooks";

const Profile = ({ closeModal }) => {
  const {
    t,
    handleChange,
    handleSubmit,
    handleFileChange,
    previewImage,
    values,
  } = useProfileForm(closeModal);
  return (
    <div className="fixed top-16 right-24 bg-white shadow-lg shadow-purple-400 rounded-4xl w-[350px] h-[400px] z-[9999] transition-transform transform animate-slideIn">
      <div className="bg-purple-300 h-36 rounded-t-lg w-full ">
        <div
          className=" h-48 rounded-t-lg  bg-cover bg-center"
          style={{ backgroundImage: `url(${bookbanner})` }}
        >
          <div className="top-3 flex justify-between items-center p-4">
            <h2 className="text-3xl font-semibold text-white">
              {t("profile")}{" "}
            </h2>
            <span
              className="text-gray-600 text-2xl cursor-pointer bg-gray-200 w-7 h-7 rounded-full  text-center"
              onClick={closeModal}
            >
              X
            </span>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div
          className="absolute top-20 left-1/2 transform -translate-x-1/2 w-48 h-48 rounded-full
         bg-gray-300 flex items-center justify-center overflow-hidden border-4 border-white shadow-md"
        >
          <label className="flex flex-col items-center justify-center cursor-pointer">
            <input
              type="file"
              accept="image/png, image/jpeg, image/jpg, image/gif, image/webp"
              onChange={handleFileChange}
              className="hidden"
            />
            {previewImage || values?.image ? (
              <img
                src={previewImage}
                alt="Preview"
                className="w-48 h-48 object-cover border border-gray-300 rounded-full"
              />
            ) : (
              <>
                <img
                  src={defaultImg}
                  alt="Preview"
                  className="w-32 h-32 object-cover border border-gray-300 rounded-full"
                />
              </>
            )}
          </label>
        </div>

        <div className="mt-32 w-full flex flex-col gap-5 justify-center items-center">
          <InputField
            type="text"
            id="username"
            name="username"
            value={values?.username}
            onChange={handleChange}
            placeholder="username"
            className="  w-80 text-center border-none rounded-md  focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <InputField
            type="text"
            id="email"
            name="email"
            value={values?.email}
            onChange={handleChange}
            placeholder="email"
            className="  w-80 text-center border-none rounded-md text-2xl focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex justify-center mt-10">
          <button
            type="submit"
            className="bg-purple-500 text-white px-4 py-2 rounded-md hover:bg-purple-600"
          >
            {t("saveChanges")}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Profile;
