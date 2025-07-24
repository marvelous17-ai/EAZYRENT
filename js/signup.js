const signupForm = document.getElementById("signupForm");

signupForm.addEventListener("submit", function (e) {
  e.preventDefault();

  const fullName = document.getElementById("fullName").value;
  const email = document.getElementById("email").value.toLowerCase();
  const password = document.getElementById("password").value;
  const role = document.getElementById("role").value;

  const users = JSON.parse(localStorage.getItem("users")) || [];

  // Check if user already exists
  const existingUser = users.find(user => user.email === email);
  if (existingUser) {
    alert("⚠️ Email already registered.");
    return;
  }

  // Save new user
  const newUser = { fullName, email, password, role };
  users.push(newUser);
  localStorage.setItem("users", JSON.stringify(users));

  alert("✅ Signup successful! Redirecting to login...");
  window.location.href = "login.html";
});
