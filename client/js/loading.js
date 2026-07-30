function showLoading(message = "Please wait...") {

    const overlay = document.getElementById("loadingOverlay");

    if (!overlay) return;

    overlay.querySelector(".loading-text").textContent = message;

    overlay.classList.add("show");

}

function hideLoading() {

    const overlay = document.getElementById("loadingOverlay");

    if (!overlay) return;

    overlay.classList.remove("show");

}