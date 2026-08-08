import { logos } from "../../../assets/link/logos.js";

function navigateToLoginPage() {
    window.location.href = "../../auth/ui/login.html";
}

const discordBtn = document.getElementById("open_btn");
document.getElementById("discord-logo").src = logos.discordLogo;
document.getElementById("favicon").href = logos.titleLogo;

discordBtn.addEventListener("click", navigateToLoginPage);


