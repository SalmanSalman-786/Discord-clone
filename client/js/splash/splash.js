
function navigateToLoginPage(){
    window.location.href="../../pages/auth/login.html";
}

let discord_btn= document.getElementById("open_btn")
discord_btn.addEventListener("click",navigateToLoginPage);