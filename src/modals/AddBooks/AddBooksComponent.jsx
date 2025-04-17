import React from "react";
import { CloudUpload } from "lucide-react";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { useAddBookForm } from "../../hooks/AddBooks.hooks";
import validationSchema from "./AddBooksSchema";
import { useTranslation } from "react-i18next";
import InputField from "../../components/Elements/InputField/Inputfield";
import Button from "../../components/Elements/Button/Button";

const AddBooksComponent = ({
  bookId,
  closeModal,
  setSelectedBookId,
  bookQuantities,
}) => {
  const { t } = useTranslation();

  const {
    values,
    handleChange,
    handleSubmit,
    handleBlur,
    touched,
    errors,
    handleFileChange,
    handleClose,
    preview,
  } = useAddBookForm({
    bookId,
    bookQuantities,
    setSelectedBookId,
    closeModal,
    validationSchema,
  });

  return (
    <Dialog open={true} onClose={closeModal} className="relative z-50">
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-gray-500/75 transition-opacity duration-500 ease-in-out data-closed:opacity-0"
      />

      <div className="fixed inset-0 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full">
            <DialogPanel
              transition
              className="pointer-events-auto relative max-h-screen w-screen max-w-4xl transform transition duration-[800ms] ease-out data-closed:translate-x-full sm:duration-[1000ms] "
            >
              <div className="flex h-[100vh] flex-col overflow-y-auto bg-white py-6 shadow-xl">
                <div className="px-4 sm:px-6 flex-1 flex flex-col">
                  <DialogTitle className="text-base font-semibold text-gray-900 flex-1">
                    <div className="flex items-center justify-center bg-transparent bg-opacity-50 w-full h-full">
                      <form
                        onSubmit={handleSubmit}
                        className="bg-white p-6  w-full h-full flex flex-col"
                      >
                        <div className="flex w-full justify-start">
                          <h2 className="text-4xl font-semibold text-purple-700 mb-4">
                            {bookId ? t("updateBook") : t("addBook")}
                          </h2>
                        </div>
                        <div className="mb-8 w-full ">
                          {/* Title */}

                          <div className="mb-8 w-[450px] ">
                            <InputField
                              label={t("bookTitle")}
                              type="text"
                              name="title"
                              id="title"
                              value={values.title}
                              onChange={handleChange}
                              placeholder="Enter Book Title"
                              onBlur={handleBlur}
                              error={errors.title}
                              touched={touched.title}
                              required={true}
                            />
                          </div>

                          {/* Author */}
                          <div className="mb-8 w-[450px] ">
                            <InputField
                              label={t("author")}
                              type="text"
                              name="author"
                              id="author"
                              value={values.author}
                              onChange={handleChange}
                              placeholder="Enter Author Name"
                              onBlur={handleBlur}
                              error={errors.author}
                              touched={touched.author}
                              required={true}
                            />
                          </div>

                          {/* Stock Count */}
                          <div className="mb-8 w-[450px] ">
                            <InputField
                              label={t("stockCount")}
                              type="number"
                              name="stockCount"
                              id="stockCount"
                              value={values.stockCount}
                              onChange={handleChange}
                              placeholder="Enter Available Stock"
                              error={errors.stockCount}
                              touched={touched.stockCount}
                              required={true}
                            />
                          </div>

                          {/* Price */}
                          <div className="mb-8 w-[450px] ">
                            <InputField
                              label={t("price")}
                              type="number"
                              name="price"
                              id="price"
                              value={values.price}
                              onChange={handleChange}
                              placeholder="Enter Price"
                              error={errors.price}
                              touched={touched.price}
                              required={true}
                            />
                          </div>

                          {/* Image Upload */}
                          <div className="flex flex-col items-center justify-center w-full p-6 border-2 border-dashed border-gray-300 rounded-lg bg-blue-50 hover:bg-blue-100 cursor-pointer">
                            <label className="flex flex-col items-center justify-center w-full cursor-pointer">
                              <input
                                type="file"
                                name="image"
                                id="image"
                                accept="image/png, image/jpeg, image/jpg, image/gif, image/webp"
                                onChange={handleFileChange}
                                className="hidden"
                              />
                              {preview || values?.image ? (
                                <img
                                  src={values?.image}
                                  alt={values.title}
                                  className="w-56 h-48 object-cover  border border-gray-300"
                                />
                              ) : (
                                <>
                                  <CloudUpload className="w-12 h-12 text-blue-500" />
                                  <p className="text-gray-600 mt-2">
                                    {t("uploadProfileImage")}
                                  </p>
                                </>
                              )}
                            </label>
                          </div>
                        </div>

                        {/* Buttons */}
                        <div className="flex w-full justify-end gap-3 mt-10">
                          <Button
                            type="button"
                            onClick={handleClose}
                            className="!bg-transparent !border !border-pink-500 !text-pink-500"
                          >
                            {t("cancel")}
                          </Button>

                          <Button type="submit">
                            {bookId ? t("update") : t("addBook")}
                          </Button>
                        </div>
                      </form>
                    </div>
                  </DialogTitle>
                </div>
              </div>
            </DialogPanel>
          </div>
        </div>
      </div>
    </Dialog>
  );
};

export default AddBooksComponent;
