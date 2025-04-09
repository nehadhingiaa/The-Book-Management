import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { fetchProfile } from "../components/Profile/ProfileSlice";
import {logout} from "../pages/Login/authSlice"


export const useBuyerLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [profileImg, setProfileImg] = useState(null);
  const userData=JSON.parse(localStorage.getItem("user"))
  const { cartData } = useSelector((state) => state.cartData);
  const { profile } = useSelector((state) => state.profile);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const user = JSON.parse(localStorage.getItem("user"));
  const buyerCartData=cartData?.filter((item)=>item.buyerId ===userData?.id)
  const cartCount = buyerCartData?.length;

  useEffect(() => {
    dispatch(fetchProfile());
  }, [dispatch]);

  useEffect(() => {
    if (Array.isArray(profile) && user?.id) {
      const foundProfile = profile.find((u) => u.id === user.id);
      if (foundProfile) {
        setProfileImg(foundProfile.image);
      }
    }
  }, [profile, user?.id]);

  const handleLogout = () => {
    Swal.fire({
      title: `${t("areYouSure")}?`,
      text: `${t("youWantToLogout")}!`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#6b46c1",
      cancelButtonColor: "#d33",
      confirmButtonText: `${t("yesLogout")}!`,
      showLoaderOnConfirm: true,
      preConfirm: () => {
        return new Promise((resolve) => {
          setTimeout(() => {
            dispatch(logout());
            resolve();
          }, 1500);
        });
      },
      allowOutsideClick: () => !Swal.isLoading(),
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Logged Out!",
          text: "You have been logged out successfully.",
          icon: "success",
          timer: 1500,
          showConfirmButton: false,
        });
        navigate("/");
      }
    });
  };

  const handleShow = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  return {
    isSidebarOpen,
    setIsSidebarOpen,
    isOpen,
    handleShow,
    handleClose,
    cartCount,
    profileImg,
    handleLogout,
    user,
  };
};
