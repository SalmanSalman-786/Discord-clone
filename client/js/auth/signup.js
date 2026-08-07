import { logos } from "../../assets/link/logos.js";
import { showLoading } from "./loading.js";


document.getElementById("favicon").href = logos.titleLogo;

const submitBtn = document.getElementById("create-btn");

submitBtn.addEventListener("click",()=>{
    showLoading("Registering....");
    setTimeout(()=>{
        window.history.back();
    },5000);
})
