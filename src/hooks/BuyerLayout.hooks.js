import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchProfile } from "../components/Profile/ProfileSlice";

export const useBuyerLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isLogout, setIsLogout] = useState(false);
  const [profileImg, setProfileImg] = useState(null);
  const userData = JSON.parse(localStorage.getItem("user"));
  const { cartData } = useSelector((state) => state.cartData);
  const { profile } = useSelector((state) => state.profile);
  const dispatch = useDispatch();
  // const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));
  const buyerCartData = cartData?.filter(
    (item) => item.buyerId === userData?.id
  );
  const cartCount = buyerCartData?.length;

  useEffect(() => {
    dispatch(fetchProfile());
  }, [dispatch, profile]);

  useEffect(() => {
    if (Array.isArray(profile) && user?.id) {
      const foundProfile = profile.find((u) => u.id === user.id);
      if (foundProfile) {
        setProfileImg(foundProfile.image);
      }
    }
  }, [profile, user?.id]);

  const handleOpen = () => {
    setIsLogout(!isLogout);
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
    handleOpen,
    user,
    isLogout,
    setIsLogout,
  };
};
