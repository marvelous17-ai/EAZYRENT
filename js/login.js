const loginForm = document.getElementById("loginForm");

loginForm.addEventListener("submit", function (e) {
  e.preventDefault();

  const email = document.getElementById("email").value.toLowerCase();
  const password = document.getElementById("password").value;

  const users = JSON.parse(localStorage.getItem("users")) || [];

  const user = users.find(u => u.email === email && u.password === password);

  if (!user) {
    alert("❌ Invalid email or password.");
    return;
  }

  // Save logged in user to localStorage/sessionStorage
  localStorage.setItem("currentUser", JSON.stringify(user));

  alert(`✅ Welcome ${user.fullName}! Redirecting...`);

  // Redirect based on role
  if (user.role === "tenant") {
    window.location.href = "Tenant/browse.html";
  } else if (user.role === "landlord") {
    window.location.href = "landlord/dashboard.html";
  }
});
