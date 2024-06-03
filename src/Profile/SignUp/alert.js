import Swal from "sweetalert2";
import "../../custom-swal.css";

export const showSuccessAlert = (username) => {
  Swal.fire({
    title: `Welcome to Pureplate, ${username}!`,
    text: "Please, sign in!",
    icon: "success",
  });
};

export const showErrorAlert = () => {
  Swal.fire({
    title: "This email is already registered.",
    text: "Please choose another email.",
    icon: "error",
  });
};
