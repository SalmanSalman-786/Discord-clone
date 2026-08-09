import { isLoggedIn } from "../../auth/js/auth.js";
import { logos } from "../../../assets/link/logos.js";
import { getServers, getInitials, setActiveChannel } from "../../server/js/server_store.js";

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

const settingsFrameOverlay = document.getElementById("settingsFrameOverlay");
const settingsFrame = document.getElementById("settingsFrame");

// Registered FIRST, before any other DOM wiring below — so even if a
// later getElementById() call hits a missing element and throws, this
// listener is already attached and the modal can still close.
window.addEventListener("message", (e) => {
  console.log("[dashboard] message received:", e.data);

  if (e.data === "closeSettings") {
    settingsFrameOverlay.classList.remove("open");
    settingsFrame.src = ""; // clear it so it re-fetches fresh next time
  }

  if (e.data === "closeCreateServerModal") {
    console.log("[dashboard] closing create-server modal, overlay classes before:", settingsFrameOverlay.className);
    settingsFrameOverlay.classList.remove("open");
    settingsFrame.src = "";
    console.log("[dashboard] overlay classes after:", settingsFrameOverlay.className);
  }

  // Sent by create_server_modal.js when the user hits "Create"
  if (e.data && e.data.type === "serverCreated") {
    const server = e.data.server;
    addServerIconToList(server);
    openServer(server);
  }
});

// Re-populate the server icon list from localStorage on every page load,
// so servers created earlier don't vanish on refresh.
getServers().forEach((server) => addServerIconToList(server));


document.getElementById("serverAddDiv")?.addEventListener("click",(e)=>{
    settingsFrame.src = "../../server/ui/create_server_modal.html";
    settingsFrameOverlay.classList.add("open"); // <-- this was missing, so the iframe never showed
})

document.getElementById("discoverBtn")?.addEventListener("click", () => {
    sidebar.src = "../../discover/ui/discover_app_sidebar.html";
    mainScreen.src ="../../discover/ui/discover_app_mainScreen.html";
});

document.getElementById("dm")?.addEventListener("click",()=>{
    sidebar.src="../../direct_message/ui/dm_sidebar.html"
    mainScreen.src = "../../direct_message/ui/dm_mainscreen.html";
})

// NOTE: the old static "#channelBtn" placeholder icon is gone now that
// servers are added dynamically via addServerIconToList() below.

document.querySelectorAll(".server").forEach((server) => {
    server.addEventListener("click", () => {
        document
            .querySelectorAll(".server")
            .forEach((s) => s.classList.remove("active"));
        server.classList.add("active");
    });
});



function openSettings(){
    settingsFrame.src = "../../settings/ui/settings.html";
    settingsFrameOverlay.classList.add("open");
}

document.getElementById("settingsBtn")?.addEventListener("click", openSettings);

// Adds an icon to #allChannelsDiv for a server — either its uploaded icon
// image, or an initials bubble (like Discord's fallback) if none was set.
function addServerIconToList(server) {
    const allChannelsDiv = document.getElementById("allChannelsDiv");

    // avoid duplicating an icon that's already in the list (e.g. on refresh)
    if (allChannelsDiv.querySelector(`[data-server-id="${server.id}"]`)) return;

    const el = document.createElement("div");
    el.className = "server discover";
    el.dataset.name = server.name;
    el.dataset.serverId = server.id;

    if (server.icon) {
        el.innerHTML = `
            <span class="active-indicator"></span>
            <img src="${server.icon}" alt="${server.name}" width="48" height="48" style="border-radius: 50%; object-fit: cover;" />
        `;
    } else {
        el.innerHTML = `
            <span class="active-indicator"></span>
            <span>${getInitials(server.name)}</span>
        `;
    }

    el.addEventListener("click", () => {
        document.querySelectorAll(".server").forEach((s) => s.classList.remove("active"));
        el.classList.add("active");
        openServer(server);
    });

    allChannelsDiv.appendChild(el);
}

function openServer(server) {
    // Default to the server's first text channel so the main screen always
    // has something to show, even if this server was never opened before.
    const firstTextChannel = server.channels.categories
        .flatMap((cat) => cat.channels)
        .find((ch) => ch.type === "text");
    if (firstTextChannel) {
        setActiveChannel(server.id, firstTextChannel.id);
    }

    sidebar.src = `../../server/ui/server_sidebar.html?server=${server.id}`;
    mainScreen.src = "../../server/ui/server_mainscreen.html";
}