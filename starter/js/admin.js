// Team brief 5 · Vendor admin. Start here.
// Every request goes through api.js; paths are relative to /api.
import { request, getJSON, HttpError, describe } from "./api.js";

const tbody = document.querySelector(".stalls tbody");
const template = document.querySelector("#row-template");
const tokenForm = document.querySelector(".token-form");
const status = document.querySelector(".admin-status");
const errorLine = document.querySelector(".admin-error");

const state = {
  status: "loading", // "loading" | "ready" | "error"
  error: "",
  stalls: [],
  token: sessionStorage.getItem("harbour-token") ?? "",
};

// The header every change needs
const auth = () => ({ headers: { Authorization: `Bearer ${state.token}` } });

function row(stall) {
  const tr = template.content.firstElementChild.cloneNode(true);
  tr.dataset.id = stall.id;
  tr.querySelector(".name").textContent = stall.name;
  tr.querySelector(".tag").textContent = stall.tag;
  tr.querySelector(".price").textContent = stall.price === 0 ? "free" : `€${stall.price}`;
  const box = tr.querySelector(".sold-out");
  box.checked = stall.soldOut;
  box.setAttribute("aria-label", `Sold out: ${stall.name}`);
  tr.querySelector(".remove").setAttribute("aria-label", `Remove ${stall.name}`);
  return tr;
}

function render() {
  // 1 · loading, error and ready, from state.status
  tbody.replaceChildren(...state.stalls.map(row));
}

tokenForm.addEventListener("submit", (event) => {
  event.preventDefault();
  state.token = tokenForm.elements.token.value.trim();
  sessionStorage.setItem("harbour-token", state.token);
  document.querySelector(".token-status").textContent = "Token saved for this tab.";
});

// 2 · load the stalls: GET /stalls (no token needed)
// 3 · a change on a .sold-out checkbox: PATCH /stalls/:id with { soldOut } and auth(),
//     then redraw that row from the response
// 4 · 401 → ask for a valid token, focus #token · 403 → "this token can't edit that stall"

// A token from earlier in this tab: show that it's set
if (state.token) {
  tokenForm.elements.token.value = state.token;
  document.querySelector(".token-status").textContent = "Using the token saved in this tab.";
}

render();
