import { isLoggedIn } from "../../auth/js/auth.js";
import { logos } from "../../../assets/link/logos.js";

const currentUser = JSON.parse(localStorage.getItem("currentUser"));


document.getElementById("favicon").href = logos.titleLogo;

const user_name = document.getElementById("name");
user_name.innerHTML= currentUser.name;

const user_letter = document.getElementById("avatar-letter");
user_letter.innerHTML = currentUser.name.charAt(0).toUpperCase();

const sidebar = document.getElementById("sidebar");
sidebar.src="../../direct_message/ui/dm_sidebar.html"

const mainScreen = document.getElementById("mainScreen");
mainScreen.src = "../../direct_message/ui/dm_mainscreen.html";



document.getElementById("discoverBtn").addEventListener("click", () => {
    sidebar.src = "../../discover/ui/discover_app_sidebar.html";
    mainScreen.src ="../../discover/ui/discover_app_mainScreen.html";
});

document.getElementById("dm").addEventListener("click",()=>{
    sidebar.src="../../direct_message/ui/dm_sidebar.html"
    mainScreen.src = "../../direct_message/ui/dm_mainscreen.html";
})

document.querySelectorAll(".server").forEach((server) => {
    server.addEventListener("click", () => {
        document
            .querySelectorAll(".server")
            .forEach((s) => s.classList.remove("active"));
        server.classList.add("active");
    });
});

const settingsFrameOverlay = document.getElementById("settingsFrameOverlay");
const settingsFrame = document.getElementById("settingsFrame");

function openSettings(){
    settingsFrame.src = "../../settings/ui/settings.html";
    settingsFrameOverlay.classList.add("open");
}

document.getElementById("settingsBtn").addEventListener("click", openSettings);

window.addEventListener("message", (e) => {
  if (e.data === "closeSettings") {
    settingsFrameOverlay.classList.remove("open");
    settingsFrame.src = ""; // clear it so it re-fetches fresh next time
  }
});