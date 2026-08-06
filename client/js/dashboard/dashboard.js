import { isLoggedIn } from "../auth/auth.js";
import { logos } from "../../assets/link/logos.js";

document.getElementById("favicon").href = logos.titleLogo;

// TODO: add this later
// if (!isLoggedIn()) {
//     window.location.href = "../auth/login.html";
// }

document.getElementById("discoverBtn").addEventListener("click", () => {
    window.location.href = "../discover/discover_app.html";
});

document.querySelectorAll(".server").forEach((server) => {
    server.addEventListener("click", () => {
        document
            .querySelectorAll(".server")
            .forEach((s) => s.classList.remove("active"));

        server.classList.add("active");
    });
});