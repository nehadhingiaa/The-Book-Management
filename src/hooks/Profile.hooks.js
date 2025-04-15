import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import { useTranslation } from "react-i18next";
import {
  fetchProfile,
  updateProfile,
  uploadProfile,
} from "../components/Profile/ProfileSlice";

const useProfileForm = (closeModal) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const userData = JSON.parse(localStorage.getItem("user"));

  const { profile } = useSelector((state) => state.profile);
  const [previewImage, setPreviewImage] = useState(null);
  const [initialValues, setInitialValues] = useState({
    image: "",
    username: userData.username,
    email: userData?.email,
  });

  useEffect(() => {
    if (Array.isArray(profile) && userData?.id) {
      const foundProfile = profile.find((u) => u.id === userData.id);

      if (foundProfile) {
        setPreviewImage(foundProfile.image);
        setInitialValues({
          id: userData?.id,
          image: foundProfile?.image,
          username: foundProfile?.username,
          email: foundProfile?.email,
        });
      }
    }
  }, [profile, userData?.id]);

  useEffect(() => {
    dispatch(fetchProfile());
  }, [dispatch]);

  // useEffect(() => {
  //   if (profile) {
  //     debugger
  //     setInitialValues({
  //       id: userData?.id,
  //       image: profile?.[0]?.image,
  //       username: userData?.username,
  //       email: userData?.email,
  //     });
  //   } else {
  //     resetForm();
  //   }
  // }, [profile]);

  const { values, handleChange, handleSubmit, setFieldValue } =
    useFormik({
      initialValues,
      enableReinitialize: true,
      onSubmit: (values) => {
        const profileData = profile?.find((u) => u.id === userData?.id);
        if (!userData?.id) {
          alert("User ID is missing!");
          return;
        }

        if (!profileData) {
          dispatch(
            uploadProfile({
              id: userData?.id,
              image: values?.image,
              username: values?.username,
              email: values?.email,
            })
          );
        } else {
          dispatch(
            updateProfile({
              id: userData?.id,
              image: values?.image,
              username: values?.username,
              email: values?.email,
            })
          );
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

  return {
    t,
    values,
    handleChange,
    handleSubmit,
    handleFileChange,
    previewImage,
    userData,
  };
};

export default useProfileForm;
