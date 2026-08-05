function navigateToLoginPage() {
    window.location.href = "../auth/login.html";
}

const discordBtn = document.getElementById("open_btn");

discordBtn.addEventListener("click", navigateToLoginPage);