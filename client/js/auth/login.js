import { logos } from "../../assets/link/logos.js";
import { saveTokens,isLoggedIn,getAccessToken,getRefreshToken,removeTokens} from "./auth.js";
import { showLoading, hideLoading} from "./loading.js";
import { Validator } from "./validator.js";
import { setupPasswordToggle } from "./password-toggle.js";

document.getElementById("favicon").href = logos.titleLogo;

const form = document.getElementById("loginForm");
const email = document.getElementById("email");
const password = document.getElementById("password");
const emailError = document.getElementById("emailError");
const passwordError = document.getElementById("passwordError");
const loader = document.querySelector(".loader");
const btnText = document.querySelector(".btn-text");
const loginButton = document.querySelector(".login-btn");

//TODO:add later
// if (isLoggedIn()) {
//   window.location.href = "../dashboard.html";
// }

function startLoading() {
  loginButton.disabled = true;
  loader.classList.remove("hidden");
  btnText.classList.add("hidden");
  showLoading("Signing you in...");
}

function stopLoading() {
  loginButton.disabled = false;

  loader.classList.add("hidden");
  btnText.classList.remove("hidden");

  hideLoading();
}

function clearErrors() {
  emailError.textContent = "";
  passwordError.textContent = "";
}

function validate() {
  clearErrors();
  email.classList.remove("valid", "invalid");
  password.classList.remove("valid", "invalid");
  let valid = true;

  if (!Validator.isRequired(email.value)) {
    emailError.textContent = "Email is required";
    email.classList.add("invalid");
    valid = false;
  } else if (!Validator.isEmail(email.value)) {
    emailError.textContent = "Enter a valid email";
    email.classList.add("invalid");
    valid = false;
  } else {
    email.classList.add("valid");
  }

  if (!Validator.isRequired(password.value)) {
    passwordError.textContent = "Password is required";
    password.classList.add("invalid");
    valid = false;
  } else if (!Validator.minLength(password.value, 8)) {
    passwordError.textContent = "Minimum 8 characters";
    password.classList.add("invalid");
    valid = false;
  } else {
    password.classList.add("valid");
  }

  return valid;
}

email.addEventListener("input", () => {
  email.classList.remove("valid", "invalid");
  if (email.value === "") {
    emailError.textContent = "";
    return;
  }
  if (Validator.isEmail(email.value)) {
    email.classList.add("valid");
    emailError.textContent = "";
  } else {
    email.classList.add("invalid");
    emailError.textContent = "Enter a valid email";
  }
});

password.addEventListener("input", () => {
  password.classList.remove("valid", "invalid");
  if (password.value === "") {
    passwordError.textContent = "";
    return;
  }
  if (Validator.minLength(password.value, 8)) {
    password.classList.add("valid");
    passwordError.textContent = "";
  } else {
    password.classList.add("invalid");
    passwordError.textContent = "Minimum 8 characters";
  }
});

form.addEventListener("submit", (e)=>{
  // e.preventDefault();
  // if (!validate()) {
  //   return;
  // }
  // startLoading();
  // try {
  //   const response = await apiRequest("/auth/login", "POST", {
  //     email: email.value.trim(),
  //     password: password.value,
  //   });
  //   stopLoading();
  //   if (!response.ok) {
  //     showToast(
  //       "error",
  //       "Login Failed",
  //       response.data.message || "Invalid email or password.",
  //     );
  //     return;
  //   }

  //   saveTokens(response.data.accessToken, response.data.refreshToken);

  //   showToast("success", "Login Successful", "Welcome back!");

  //   setTimeout(() => {
  //     window.location.href = "../dashboard.html";
  //   }, 1000);
  // } catch (error) {
  //   stopLoading();
  //   showToast("error", "Connection Error", "Unable to connect to the server.");
  //   console.error(error);
  // }


  //TODO:dumb logic for dashboard routing ,Update to above code later
  e.preventDefault();
  if (!validate()) {
    return;
  }
  startLoading();
  setTimeout(() => {
      if(email.value == localStorage.getItem("email") && password.value == localStorage.getItem("password")){
    window.location.href ="../../pages/dashboard/dashboard.html";
  }
  stopLoading();
  }, 5000);//opens the dashboard after 5 seconds of btn click
}
);
setupPasswordToggle("password", "passwordToggle");


