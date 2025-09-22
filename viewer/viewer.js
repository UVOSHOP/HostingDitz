const dbUrl = "https://ditzhosting1-default-rtdb.asia-southeast1.firebasedatabase.app";

async function loadSite() {
  const params = new URLSearchParams(window.location.search);
  const user = params.get("u");
  if (!user) {
    document.body.innerHTML = "<h1>No user specified</h1>";
    return;
  }

  const res = await fetch(`${dbUrl}/users/${user}.json`);
  const files = await res.json();

  if (!files || !files["index.html"]) {
    document.body.innerHTML = "<h1>User site not found</h1>";
    return;
  }

  let html = files["index.html"] || "";
  let css = files["style.css"] ? `<style>${files["style.css"]}</style>` : "";
  let js = files["script.js"] ? `<script>${files["script.js"]}<\/script>` : "";

  const blob = new Blob([html + css + js], { type: "text/html" });
  const url = URL.createObjectURL(blob);

  document.getElementById("viewerFrame").src = url;
}

loadSite();
