const demoUser = {
  name: "sreerag",
  username: "sreerag8625",
  email: "sreeragvs1812@gmail.com",
  password: "hunter2",
  dateOfBirth: "13/October/2005"
};
let currentUser = JSON.parse(localStorage.getItem("currentUser")) || demoUser;

const backdrop     = document.getElementById("backdrop");
const settingsCard = document.getElementById("settingsCard");
const closeBtn      = document.getElementById("closeBtn");
const navAvatar     = document.getElementById("navAvatar");
const navUsername   = document.getElementById("navUsername");
const valUsername   = document.getElementById("valUsername");
const valEmail      = document.getElementById("valEmail");
const toggleEmail    = document.getElementById("toggleEmail");

let emailHidden = true;

function maskEmail(email){
  const [name, domain] = email.split("@");
  if (!domain) return email;
  const visible = name.slice(0, 2);
  return `${visible}${"*".repeat(Math.max(name.length - 2, 3))}@${domain}`;
}

function render(){
  navAvatar.textContent   = currentUser.name?.charAt(0).toUpperCase() || "U";
  navUsername.textContent = currentUser.username || currentUser.name || "username";
  valUsername.textContent = currentUser.username || "";
  valEmail.textContent    = emailHidden ? maskEmail(currentUser.email || "") : (currentUser.email || "");
  toggleEmail.textContent = emailHidden ? "Show" : "Hide";
}

toggleEmail.addEventListener("click", () => {
  emailHidden = !emailHidden;
  render();
});


const DASHBOARD_PATH = "../../dashboard/ui/dashboard.html";

function goBackToDashboard(){
  window.parent.postMessage("closeSettings", "*");
}

closeBtn.addEventListener("click", goBackToDashboard);

// clicking the dimmed area OUTSIDE the card closes it too (but not clicks inside the card)
backdrop.addEventListener("click", (e) => {
  if (e.target === backdrop) goBackToDashboard();
});

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") goBackToDashboard();
});

document.querySelectorAll(".btn-edit").forEach(btn => {
  btn.addEventListener("click", () => {
    const field = btn.dataset.field;
    if (field === "phone") return;

    const row = btn.closest(".info-row");
    const valueBox = row.querySelector(".info-value");
    const current = field === "username" ? currentUser.username
                   : field === "email"    ? currentUser.email
                   : "";

    valueBox.innerHTML = `
      <div class="edit-field">
        <input type="${field === "password" ? "password" : "text"}" value="${field === "password" ? "" : current}" />
        <button class="btn-save">Save</button>
        <button class="btn-cancel">Cancel</button>
      </div>
    `;

    const input = valueBox.querySelector("input");
    input.focus();

    valueBox.querySelector(".btn-save").addEventListener("click", () => {
      const newVal = input.value.trim();
      if (newVal) {
        currentUser[field] = newVal;
        localStorage.setItem("currentUser", JSON.stringify(currentUser));

        // keep the credentials array in sync so login still works
        const all = JSON.parse(localStorage.getItem("credentials")) || [];
        const idx = all.findIndex(u => u.username === (field === "username" ? current : currentUser.username));
        if (idx > -1) {
          all[idx][field] = newVal;
          localStorage.setItem("credentials", JSON.stringify(all));
        }
      }
      render();
    });

    valueBox.querySelector(".btn-cancel").addEventListener("click", render);
  });
});

document.getElementById("logoutBtn").addEventListener("click", () => {
  localStorage.removeItem("currentUser");
  window.location.replace("../../auth/ui/login.html"); // adjust path
});

render();