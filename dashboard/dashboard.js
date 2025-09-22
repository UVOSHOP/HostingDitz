const dbUrl = "https://ditzhosting1-default-rtdb.asia-southeast1.firebasedatabase.app";
let currentUser = null;

function login() {
  const username = document.getElementById("username").value.trim();
  if (!username) return alert("Masukkan username!");

  currentUser = username;
  document.querySelector(".login").classList.add("hidden");
  document.getElementById("panel").classList.remove("hidden");

  loadFiles();
}

async function loadFiles() {
  const res = await fetch(`${dbUrl}/users/${currentUser}.json`);
  const data = await res.json() || {};
  const fileSelect = document.getElementById("fileSelect");

  fileSelect.innerHTML = "";
  Object.keys(data).forEach(filename => {
    const opt = document.createElement("option");
    opt.value = filename;
    opt.textContent = filename;
    fileSelect.appendChild(opt);
  });

  if (Object.keys(data).length > 0) {
    fileSelect.value = Object.keys(data)[0];
    loadFile();
  }
}

async function loadFile() {
  const filename = document.getElementById("fileSelect").value;
  if (!filename) return;
  const res = await fetch(`${dbUrl}/users/${currentUser}/${filename}.json`);
  const data = await res.json();
  document.getElementById("fileContent").value = data || "";
}

async function saveFile() {
  const filename = document.getElementById("fileSelect").value;
  const content = document.getElementById("fileContent").value;

  await fetch(`${dbUrl}/users/${currentUser}/${filename}.json`, {
    method: "PUT",
    body: JSON.stringify(content)
  });
  alert("File saved!");
}

async function deleteFile() {
  const filename = document.getElementById("fileSelect").value;
  await fetch(`${dbUrl}/users/${currentUser}/${filename}.json`, {
    method: "DELETE"
  });
  loadFiles();
  document.getElementById("fileContent").value = "";
}

async function createFile() {
  const filename = document.getElementById("newFileName").value.trim();
  if (!filename) return alert("Masukkan nama file!");

  await fetch(`${dbUrl}/users/${currentUser}/${filename}.json`, {
    method: "PUT",
    body: JSON.stringify("")
  });
  document.getElementById("newFileName").value = "";
  loadFiles();
}
