import React from "react";
import Button from "../components/Elements/Button/Button";
import Loader from "../components/Elements/Loader/Loader";

const LogoutModal = ({ handleClose, handleLogout, loader, t }) => {
  return (
    <>
      <div className="fixed inset-0 flex items-center justify-center z-50 backdrop-blur-sm bg-transparent">
        {loader ? (
          <Loader loading={loader} />
        ) : (
          <div className="block w-[300px]  h-[200px] bg-purple-50  rounded-lg border border-purple-300 shadow-purple-200 p-15">
            <p className="text-center font-bold text-3xl">{t("areYouSure")}?</p>
            <p className="text-center font-semibold mt-5">
              {t("youWantToLogout")}!{" "}
            </p>
            <div className="flex gap-5 justify-center mt-5">
              <Button onClick={handleLogout}>{t("logout")}</Button>
              <Button onClick={handleClose}>{t("cancel")}</Button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default LogoutModal;
