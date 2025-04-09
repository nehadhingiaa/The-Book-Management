import Swal from "sweetalert2";

export const showAlertForSuccess = ({ title, text, icon = "info", confirmButtonText = "OK", draggable = true }) => {
  return Swal.fire({
    title,
    text,
    icon,
    confirmButtonText,
    allowOutsideClick: false,
    allowEscapeKey: false,
    draggable,
  });
};
