import Swal from "sweetalert2";

export const showDeleteConfirmation = (title, text, onConfirm) => {
  Swal.fire({
    title,
    text,
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#6b46c1", // Purple
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete it!",
    showLoaderOnConfirm: true,
    preConfirm: () => {
      return new Promise((resolve) => {
        setTimeout(() => {
          onConfirm(); // Call delete function
          resolve();
        }, 1500); // Simulate a delay (1.5s)
      });
    },
    allowOutsideClick: () => !Swal.isLoading(),
  })
//   .then((result) => {
//     if (result.isConfirmed) {
//       Swal.fire("Deleted!", "Your item has been deleted.", "success");
//     }
//   });
};
