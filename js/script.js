document.addEventListener("DOMContentLoaded", function () {

    const form = document.getElementById("loginForm");
    const errorMsg = document.getElementById("errorMsg");

    if (!form) return;

    form.addEventListener("submit", function (e) {
        e.preventDefault(); // ⛔ Stop refresh

        const username = document.getElementById("username").value.trim();
        const password = document.getElementById("password").value.trim();

        // 🔴 EMPTY CHECK
        if (!username || !password) {
            errorMsg.style.color = "#ff4d4d";
            errorMsg.textContent = "Please enter both username and password.";
            return;
        }

        // 🔐 ADMIN LOGIN
        if (username === "admin" && password === "123456") {
            localStorage.setItem("loggedInUser", "admin");
            errorMsg.style.color = "lightgreen";
            errorMsg.textContent = "Welcome Admin!";

            setTimeout(() => {
                window.location.href = "dashboard.html";
            }, 800);
            return;
        }

        // 👤 USER LOGIN
        const users = JSON.parse(localStorage.getItem("users")) || [];
        const validUser = users.find(
            u => u.username === username && u.password === password
        );

        // ❌ INVALID USER
        if (!validUser) {
            errorMsg.style.color = "#ff4d4d";
            errorMsg.textContent = "Invalid username or password.";
            return;
        }

        // ⏳ NOT APPROVED
        if (!validUser.approved) {
            errorMsg.style.color = "#ffcc00";
            errorMsg.textContent = "Account pending admin approval.";
            return;
        }

        // ✅ APPROVED LOGIN
        localStorage.setItem("loggedInUser", validUser.username);
        errorMsg.style.color = "lightgreen";
        errorMsg.textContent = "Login successful!";

        setTimeout(() => {
            window.location.href = "dashboard.html";
        }, 800);
    });

});
