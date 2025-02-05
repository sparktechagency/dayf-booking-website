import Swal from "sweetalert2";

export const SuccessModal = (message, text = "") => {
  return Swal.fire({
    position: "center",
    icon: "success",
    title: message || "Successful!",
    text: text || "",
    showConfirmButton: false,
    timer: 2200,
    showCloseButton: true,
    background: "var(--color-p1)",
    color: "white",
  });
};

export const ErrorModal = (message, text = "") => {
  return Swal.fire({
    position: "center",
    icon: "error",
    title: message || "Failed!",
    text: text || "",
    showConfirmButton: true,
    confirmButtonText: "Ok, understood",
    confirmButtonColor: "#f11a00",
    showCloseButton: true,
    background: "var(--color-p1)",
    color: "white",
  });
};

export const ConfirmModal = (title, message, confirmBtnText, cancelBtnText) => {
  return Swal.fire({
    title: title || "Are you sure?",
    text: message || "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "var(--color-p1)",
    cancelButtonColor: "#f11a00",
    confirmButtonText: confirmBtnText || "Yes, delete it!",
    cancelButtonText: cancelBtnText || "Cancel",
    showCloseButton: true,
  });
};
