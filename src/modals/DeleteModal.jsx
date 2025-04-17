import React from "react";
import Button from "../components/Elements/Button/Button";
import Loader from "../components/Elements/Loader/Loader";
import { useDispatch } from "react-redux";
import { deleteBook } from "../pages/BookListing/BookApi";
import { toast } from "react-toastify";
import { RxCross1 } from "react-icons/rx";

const DeleteModal = ({ handleClose, loader, t, id }) => {
  const dispatch = useDispatch();

  const handleDelete = () => {
    dispatch(deleteBook(id));
    toast.success("Book has been deleted successfully");
  };

  return (
    <>
      <div className="fixed inset-0 flex items-center justify-center z-50 backdrop-blur-sm bg-transparent">
        {loader ? (
          <Loader loading={loader} />
        ) : (
          <div className="block w-[300px] h-[250px]  rounded-lg border border-purple-500 bg-pink-50 shadow-purple-200 p-8">
            <div className="flex justify-center items-center ">
              <p className="  text-red-500 border border-red-500 rounded-full p-5">
                <RxCross1 size={40} />
              </p>
            </div>
            <p className="text-center text-red-500 font-bold text-4xl mt-5">
              {t("areYouSure")}?
            </p>
            <p className="text-center text-gray-600 text-2xl font-semibold mt-5">
              {t("Do you really want to delete this?")}
            </p>
            <p className="text-center text-gray-600 text-2xl font-semibold">
              {t("aftre deleting you can't undone ")}
            </p>
            <div className="flex gap-5 justify-center mt-8">
              <Button onClick={handleDelete}>{t("delete")}</Button>
              <Button
                className="!bg-transparent !border !border-pink-500 !text-pink-500"
                onClick={handleClose}
              >
                {t("cancel")}
              </Button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default DeleteModal;
