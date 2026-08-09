// server-mainscreen.js
import { getServerById, getActiveChannel } from "./server-store.js";

function findChannel(server, channelId) {
  for (const category of server.channels.categories) {
    const found = category.channels.find((c) => c.id === channelId);
    if (found) return found;
  }
  return null;
}

function render() {
  const active = getActiveChannel();
  const channelNameEl = document.getElementById("channelName");
  const welcomeTitle = document.getElementById("welcomeTitle");
  const welcomeSubtitle = document.getElementById("welcomeSubtitle");
  const messageInput = document.getElementById("messageInput");

  if (!active) {
    channelNameEl.textContent = "channel";
    return;
  }

  const server = getServerById(active.serverId);
  if (!server) return;

  const channel = findChannel(server, active.channelId);
  if (!channel) return;

  channelNameEl.textContent = channel.name;
  welcomeTitle.textContent = `Welcome to #${channel.name}!`;
  welcomeSubtitle.textContent = `This is the start of the #${channel.name} channel.`;
  messageInput.placeholder = `Message #${channel.name}`;
}

// Fires automatically whenever server-sidebar.js (a sibling same-origin iframe)
// calls setActiveChannel(), since it writes to localStorage.
window.addEventListener("storage", (e) => {
  if (e.key === "discord_clone_active_channel") {
    render();
  }
});

render();