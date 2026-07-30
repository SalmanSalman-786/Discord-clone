function showToast(type, title, message) {

    const container = document.getElementById("toastContainer");

    const icons = {
        success: "✓",
        error: "✕",
        warning: "!",
        info: "i"
    };

    const toast = document.createElement("div");

    toast.className = `toast toast-${type}`;

    toast.innerHTML = `
        <div class="toast-header">
            <div class="toast-icon">${icons[type]}</div>

            <div class="toast-content">
                <h4>${title}</h4>
                <p>${message}</p>
            </div>
        </div>

        <div class="toast-progress"></div>
    `;

    container.appendChild(toast);

   setTimeout(() => {

    toast.style.opacity = "0";
    toast.style.transform = "translateX(100%)";

    setTimeout(() => {

        toast.remove();

    }, 300);

}, 4000);

}