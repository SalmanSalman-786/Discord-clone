import { logos } from "../../assets/link/logos.js";

function navigateToLoginPage() {
    window.location.href = "../auth/login.html";
}

const discordBtn = document.getElementById("open_btn");
document.getElementById("discord-logo").src = logos.discordLogo;
document.getElementById("favicon").href = logos.titleLogo;

discordBtn.addEventListener("click", navigateToLoginPage);


//TODO:Remove this dumb credential
localStorage.setItem("email","abcd@gmail.com");
localStorage.setItem("password","123456789");