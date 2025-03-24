import { useFormik } from 'formik'
import React from 'react'
import { useTranslation } from 'react-i18next'
import InputField from '../Elements/InputField/Inputfield'

const OrderModal = ({ closeModal }) => {
  const { t } = useTranslation();
  const {
    handleChange,
    handleSubmit,
    handleBlur,
    values,
    errors,
    touched,
    isSubmitting,
  } = useFormik({});
  return (
    <div>
      <form
        className="mt-5  flex flex-col justify-center m-auto"
        onSubmit={handleSubmit}
      >
        {/* Name Input */}
        <div className="mb-4">
          <InputField
            label={t("name")}
            type="text"
            name="name"
            id="name"
            placeholder="enter your name"
            onChange={handleChange}
            value={values.name}
            onBlur={handleBlur}
            autoComplete="off"
          />
        </div>
        {errors.name && touched.name ? (
          <p className="text-red-500 text-left">{errors.name}</p>
        ) : null}

        {/* Email Input */}
        <div className="mb-4">
          <InputField
            label={t("email")}
            type="email"
            name="email"
            id="email"
            placeholder="enter your name"
            onChange={handleChange}
            value={values.email}
            onBlur={handleBlur}
            autoComplete="off"
          />
        </div>
        {errors.email && touched.email ? (
          <p className="text-red-500 text-left">{errors.email}</p>
        ) : null}

        <div className="mb-4">
          <InputField
            label={t("email")}
            type="email"
            name="email"
            id="email"
            placeholder="enter your name"
            onChange={handleChange}
            value={values.email}
            onBlur={handleBlur}
            autoComplete="off"
          />
        </div>

        {/* Submit Button */}
        <div className="flex gap-3">
          <Button disabled={isSubmitting}>Place Order</Button>

          <Button onClick={closeModal}>{t("cancel")}</Button>
        </div>
      </form>
    </div>
  );
};

export default OrderModal;
