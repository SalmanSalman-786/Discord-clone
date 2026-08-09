// server-store.js
// Shared module for creating/reading/updating servers in localStorage.
// Import this from your "Create Your Server" popup flow AND from
// server-sidebar.js / server-mainscreen.js so everyone reads the same data.

const SERVERS_KEY = "discord_clone_servers";
const ACTIVE_SERVER_KEY = "discord_clone_active_server";
const ACTIVE_CHANNEL_KEY = "discord_clone_active_channel";

function defaultChannelTemplate() {
  return {
    events: true, 
    categories: [
      {
        id: "information",
        name: "Information",
        collapsed: false,
        channels: [
          { id: "welcome-and-rules", name: "welcome-and-rules", type: "text" },
          { id: "notes-resources", name: "notes-resources", type: "text" },
        ],
      },
      {
        id: "text-channels",
        name: "Text Channels",
        collapsed: false,
        channels: [
          { id: "general", name: "general", type: "text" },
          { id: "homework-help", name: "homework-help", type: "text" },
          { id: "session-planning", name: "session-planning", type: "text" },
          { id: "off-topic", name: "off-topic", type: "text" },
        ],
      },
      {
        id: "voice-channels",
        name: "Voice Channels",
        collapsed: false,
        channels: [
          { id: "lounge", name: "Lounge", type: "voice" },
          { id: "study-room-1", name: "Study Room 1", type: "voice" },
          { id: "study-room-2", name: "Study Room 2", type: "voice" },
        ],
      },
    ],
  };
}

export function getServers() {
  const raw = localStorage.getItem(SERVERS_KEY);
  return raw ? JSON.parse(raw) : [];
}

function saveServers(servers) {
  localStorage.setItem(SERVERS_KEY, JSON.stringify(servers));
}

export function getServerById(id) {
  return getServers().find((s) => s.id === id) || null;
}

// Call this from your "Create" button on the "Customise Your Server" popup.
// name -> the Server Name input value. iconDataUrl -> optional uploaded image (base64/dataURL).
export function createServer(name, iconDataUrl = null) {
  const servers = getServers();
  const newServer = {
    id: "srv_" + Date.now(),
    name: name.trim() || "New Server",
    icon: iconDataUrl, // null -> sidebar falls back to initials bubble
    createdAt: Date.now(),
    channels: defaultChannelTemplate(),
  };
  servers.push(newServer);
  saveServers(servers);
  setActiveServer(newServer.id);
  // default landing channel = homework-help, like your screenshot
  setActiveChannel(newServer.id, "homework-help");
  return newServer;
}

export function setActiveServer(serverId) {
  localStorage.setItem(ACTIVE_SERVER_KEY, serverId);
}

export function getActiveServerId() {
  return localStorage.getItem(ACTIVE_SERVER_KEY);
}

export function setActiveChannel(serverId, channelId) {
  localStorage.setItem(
    ACTIVE_CHANNEL_KEY,
    JSON.stringify({ serverId, channelId, ts: Date.now() })
  );
}

export function getActiveChannel() {
  const raw = localStorage.getItem(ACTIVE_CHANNEL_KEY);
  return raw ? JSON.parse(raw) : null;
}

// Small helper: turn "sree raja rajeshwari group" -> "SRG" for the icon bubble
export function getInitials(name) {
  return name
    .trim()
    .split(/\s+/)
    .map((w) => w[0])
    .join("")
    .slice(0, 3)
    .toUpperCase();
}