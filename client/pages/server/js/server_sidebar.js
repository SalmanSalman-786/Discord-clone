// server-sidebar.js
import {
  getServerById,
  getActiveServerId,
  setActiveChannel,
  getActiveChannel,
} from "./server-store.js";

// Which server does this sidebar belong to?
// Pass it as ?server=srv_123 when you set the iframe's src, e.g.:
//   sidebarFrame.src = `pages/server-sidebar.html?server=${server.id}`;
// Falls back to whatever was last set active, so it also works stand-alone.
function resolveServerId() {
  const params = new URLSearchParams(window.location.search);
  return params.get("server") || getActiveServerId();
}

function channelIconSvg(type) {
  if (type === "voice") {
    return `<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 3a9 9 0 0 0-9 9v7c0 1.1.9 2 2 2h3v-8H5v-1c0-3.87 3.13-7 7-7s7 3.13 7 7v1h-3v8h3c1.1 0 2-.9 2-2v-7a9 9 0 0 0-9-9z"/></svg>`;
  }
  return `<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M5.88 4.12L6.4 2 4.16 1.48 3.6 3.63a2.5 2.5 0 0 0 1.82 3.03l.46 1.84a2.5 2.5 0 0 0 3.03 1.82l2.09-.53.53 2.09a2.5 2.5 0 0 0 3.03 1.82l2.09-.52.53 2.08L23 14.5l-.52-2.09 2.09-.52-.52-2.09-2.09.52-.52-2.08a2.5 2.5 0 0 0-3.03-1.83l-2.09.53-.53-2.09a2.5 2.5 0 0 0-3.03-1.82zM10 8h4l-1 8h-4z"/></svg>`;
}

const INVITE_ICON = `<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M14 8c0-2.21-1.79-4-4-4S6 5.79 6 8s1.79 4 4 4 4-1.79 4-4zm-4 6c-3.31 0-6.16 1.79-7.6 4.44A2 2 0 0 0 4.13 21H15.87a2 2 0 0 0 1.73-2.56C16.16 15.79 13.31 14 10 14zm9-3v-3h-2v3h-3v2h3v3h2v-3h3v-2z"/></svg>`;
const SETTINGS_ICON = `<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M19.14 12.94c.04-.3.06-.61.06-.94 0-.32-.02-.64-.07-.94l2.03-1.58c.18-.14.23-.41.12-.61l-1.92-3.32c-.12-.22-.37-.29-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54c-.04-.24-.24-.41-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.05.3-.09.63-.09.94s.02.64.07.94l-2.03 1.58c-.18.14-.23.41-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z"/></svg>`;
const PLUS_ICON = `<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/></svg>`;
const CHEVRON_ICON = `<svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M7 10l5 5 5-5z"/></svg>`;

function renderChannel(channel, serverId, activeChannelId) {
  const row = document.createElement("div");
  row.className = "channel-row" + (channel.id === activeChannelId ? " active" : "");
  row.dataset.channelId = channel.id;
  row.innerHTML = `
    ${channelIconSvg(channel.type)}
    <span class="channel-name">${channel.name}</span>
    <div class="channel-actions">
      <button title="Invite People" class="channel-invite-btn">${INVITE_ICON}</button>
      <button title="Edit Channel" class="channel-settings-btn">${SETTINGS_ICON}</button>
    </div>
  `;

  row.addEventListener("click", () => {
    setActiveChannel(serverId, channel.id);
    document
      .querySelectorAll(".channel-row.active")
      .forEach((el) => el.classList.remove("active"));
    row.classList.add("active");
  });

  // stop the row's click (channel select) from firing when an action icon is used
  row.querySelector(".channel-invite-btn").addEventListener("click", (e) => {
    e.stopPropagation();
    alert(`Invite people to #${channel.name}`); // hook up your invite flow here
  });
  row.querySelector(".channel-settings-btn").addEventListener("click", (e) => {
    e.stopPropagation();
    alert(`Edit #${channel.name}`); // hook up your channel-settings flow here
  });

  return row;
}

function renderCategory(category, serverId, activeChannelId) {
  const wrap = document.createElement("div");
  wrap.className = "category";

  const header = document.createElement("div");
  header.className = "category-header";
  header.innerHTML = `
    <span class="category-header-left">${CHEVRON_ICON}<span>${category.name}</span></span>
    <button class="category-add-btn" title="Create Channel">${PLUS_ICON}</button>
  `;

  header.querySelector(".category-header-left").addEventListener("click", () => {
    wrap.classList.toggle("collapsed");
  });
  header.querySelector(".category-add-btn").addEventListener("click", (e) => {
    e.stopPropagation();
    alert(`Create a channel in ${category.name}`); // hook up your create-channel flow here
  });

  const list = document.createElement("div");
  list.className = "channel-list";
  category.channels.forEach((ch) =>
    list.appendChild(renderChannel(ch, serverId, activeChannelId))
  );

  wrap.appendChild(header);
  wrap.appendChild(list);
  return wrap;
}

function render() {
  const serverId = resolveServerId();
  const server = getServerById(serverId);
  const categoryList = document.getElementById("categoryList");
  const serverNameEl = document.getElementById("serverName");

  if (!server) {
    serverNameEl.textContent = "Unknown Server";
    categoryList.innerHTML = `<p style="color:#949ba4;font-size:13px;padding:8px;">No server data found.</p>`;
    return;
  }

  serverNameEl.textContent = server.name;

  const active = getActiveChannel();
  const activeChannelId =
    active && active.serverId === serverId ? active.channelId : null;

  categoryList.innerHTML = "";
  server.channels.categories.forEach((cat) =>
    categoryList.appendChild(renderCategory(cat, serverId, activeChannelId))
  );

  document.getElementById("inviteBtn").addEventListener("click", () => {
    alert(`Invite people to ${server.name}`); // hook up your invite flow here
  });
}

render();