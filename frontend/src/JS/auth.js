async function post(path, body) {
  const res = await fetch(path, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
    credentials: "same-origin",
  });
  return res.json();
}

document.getElementById("signup-form").addEventListener("submit", async (e) => {
  e.preventDefault();
  const fd = new FormData(e.target);
  const body = Object.fromEntries(fd.entries());
  const json = await post("/api/auth/signup", body);
  document.getElementById("message").textContent = JSON.stringify(json);
});

document.getElementById("login-form").addEventListener("submit", async (e) => {
  e.preventDefault();
  const fd = new FormData(e.target);
  const body = Object.fromEntries(fd.entries());
  const json = await post("/api/auth/login", body);
  document.getElementById("message").textContent = JSON.stringify(json);
});
