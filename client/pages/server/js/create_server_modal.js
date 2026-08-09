// create_server_modal.js
// This file is loaded BY create_server_modal.html, which itself is loaded
// INSIDE the #settingsFrame iframe. So all the getElementById/querySelector
// calls below run against the iframe's own document — that's why this
// script must be <script>-linked from create_server_modal.html, not from
// dashboard.html's <head>.

import { createServer } from "./server_store.js";

const step1 = document.getElementById("csmStep1");
const step2 = document.getElementById("csmStep2");
const step3 = document.getElementById("csmStep3");

// Everything the user picks/types across all 3 steps gets collected here,
// then handed to createServer() as one object when they hit "Create".
const formData = {
  template: null,   // "custom" | "gaming" | "friends" | "study-group" | "school-club"
  audience: null,   // "friends" | "community" | null (if skipped)
  name: "",
  icon: null,       // dataURL from the file upload, or null
};

function showStep(step) {
  [step1, step2, step3].forEach((s) => s.classList.add("csm-hidden"));
  step.classList.remove("csm-hidden");
}

// Tell the parent page (dashboard.js) to hide the overlay and clear the
// iframe src — mirrors the existing "closeSettings" postMessage pattern.
function closeModal() {
  console.log("[create_server_modal] closeModal() fired, posting to parent");
  window.parent.postMessage("closeCreateServerModal", "*");
}

// Filtering out nulls here so a typo'd/missing id doesn't throw and kill
// every listener below it (this line runs before all the step-navigation
// wiring, so a crash here would break the whole modal, not just Close).
[document.getElementById("csmClose1"), document.getElementById("csmClose2"), document.getElementById("csmClose3")]
  .filter(Boolean)
  .forEach((btn) => btn.addEventListener("click", closeModal));

// STEP 1 -> STEP 2
document.getElementById("csmCreateOwn").addEventListener("click", () => {
  formData.template = "custom";
  showStep(step2);
});
document.querySelectorAll(".csm-template").forEach((el) => {
  el.addEventListener("click", () => {
    formData.template = el.dataset.template; // "gaming" | "friends" | "study-group" | "school-club"
    showStep(step2);
  });
});
document.getElementById("csmJoinServer").addEventListener("click", () => {
  // Hook this up to your "Join a Server" flow / invite-code input.
  alert("Join a Server flow goes here.");
});

// STEP 2 -> STEP 3
document.querySelectorAll(".csm-audience").forEach((el) => {
  el.addEventListener("click", () => {
    formData.audience = el.dataset.audience; // "friends" | "community"
    showStep(step3);
  });
});
document.getElementById("csmSkip").addEventListener("click", (e) => {
  e.preventDefault();
  formData.audience = null; // explicitly skipped
  showStep(step3);
});
document.getElementById("csmBack2").addEventListener("click", () => showStep(step1));

// STEP 3
document.getElementById("csmBack3").addEventListener("click", () => showStep(step2));

document.getElementById("csmIconInput").addEventListener("change", (e) => {
  const file = e.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = () => {
    formData.icon = reader.result;
    document.getElementById("csmUploadCircle").innerHTML =
      `<img src="${formData.icon}" alt="Server icon" />`;
  };
  reader.readAsDataURL(file);
});

document.getElementById("csmCreate").addEventListener("click", () => {
  const nameInput = document.getElementById("csmServerNameInput");
  formData.name = nameInput.value.trim();

  if (!formData.name) {
    nameInput.focus();
    return;
  }

  // formData now holds everything the user picked/typed across all 3 steps:
  // { template, audience, name, icon }
  const server = createServer(formData);

  // Hand the new server back to dashboard.js so it can add the sidebar
  // icon and switch the sidebar/mainScreen iframes to it, then close.
  window.parent.postMessage({ type: "serverCreated", server }, "*");
  closeModal();
});