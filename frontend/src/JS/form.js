async function post(path, body) {
  const res = await fetch(path, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
    credentials: "same-origin",
  });
  return res.json();
}

document
  .getElementById("profile-form")
  .addEventListener("submit", async (e) => {
    e.preventDefault();
    const fd = new FormData(e.target);
    const body = Object.fromEntries(fd.entries());
    const json = await post("/api/form/submit", body);
    document.getElementById("message").textContent = JSON.stringify(json);
  });
