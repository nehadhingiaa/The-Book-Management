import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProfile, updateProfile, uploadProfile } from "./ProfileSlice";
import { useFormik } from "formik";
import InputField from "../Elements/InputField/Inputfield";
import { useTranslation } from "react-i18next";
import bookbanner from "../../assets/images/bookbanner.jpg";
import defaultImg from "../../assets/images/defaultImg.jpg"

const Profile = ({ closeModal }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const userData = JSON.parse(localStorage.getItem("user"));

  const { profile } = useSelector((state) => state.profile);
  const [previewImage, setPreviewImage] = useState(null);
  const [initialValues, setInitialValues] = useState({ image: "" });



  useEffect(() => {
    if (Array.isArray(profile) && userData?.id) {
      const foundProfile = profile.find((u) => u.id === userData.id);

      if (foundProfile) {
        setPreviewImage(foundProfile.image); 
      }
    }
  }, [profile, previewImage, userData?.id]);
  console.log(previewImage, "previewImage");

  useEffect(() => {
    dispatch(fetchProfile());
  }, [dispatch]);


  useEffect(() => {
    if (profile) {
      console.log("Profile data updated:", profile);
      4;
      setPreviewImage(profile.image || "");
    }
  }, [profile]);

  useEffect(() => {
    if (profile?.[0]) {
      setInitialValues({
        id: userData?.id,
        image: profile?.[0]?.image,
        user: userData?.user,
      });
    } else {
      resetForm();
    }
  }, [profile?.[0]]);

  // Initialize Formik
  const { values, handleChange, handleSubmit, resetForm, setFieldValue } =
    useFormik({
      enableReinitialize: true,
      initialValues,
      onSubmit: (values) => {
        const profileData = profile?.find((u) => u.id === userData?.id);
        if (!userData?.id) {
          alert("User ID is missing!");
          return;
        }

        if (!profileData) {
          dispatch(uploadProfile({ id: userData?.id, image: values?.image }));
        } else {
          dispatch(updateProfile({ id: userData?.id, image: values?.image }));
        }

        closeModal();
      },
    });

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const imageBase64 = reader.result;
        setPreviewImage(imageBase64);
        setFieldValue("image", imageBase64);
      };
      reader.readAsDataURL(file);
    }
  };
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
            value={userData.username}
            onChange={handleChange}
            placeholder="username"
            className="  w-80 text-center border-none rounded-md  focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <InputField
            type="text"
            id="email"
            name="email"
            value={userData.email}
            onChange={handleChange}
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
