import { logos } from "../../assets/link/logos.js";
import { showLoading } from "./loading.js";
import { showToast } from "./toast.js";
import { loadCredentials,saveCredentials } from "../database/database.js";


document.getElementById("favicon").href = logos.titleLogo;

const submitBtn = document.getElementById("create-btn");
const month = document.getElementById("month");
const day = document.getElementById("day");
const year = document.getElementById("year");
const username = document.getElementById("username");
const name = document.getElementById("display-name")
const email = document.getElementById("email")
const password = document.getElementById("password");


//TODO:dumb database logic
submitBtn.addEventListener("click", (e) => {
    e.preventDefault();
    let credentials = loadCredentials();
    for (let i = 0; i < credentials.length; i++) {
        let knownUser = credentials[i];
        if (username.value == knownUser.username || email.value == knownUser.email) {
            showToast("error","Invalid Credential","Recheck your username and email");
            return;
        }
    }
    showLoading("Registering....");
    setTimeout(() => {
        let newUser = {
            name: name.value,
            username: username.value,
            email: email.value,
            password: password.value,
            dateOfBirth: `${day.value}/${month.value}/${year.value}`
        };
        saveCredentials(newUser);
        console.log(newUser);
        window.history.back();
    }, 5000);
});
