document.addEventListener("DOMContentLoaded", function () {

    const form = document.getElementById("forgotForm");
    const msg = document.getElementById("fpMsg");

    form.addEventListener("submit", function (e) {
        e.preventDefault();

        const username = document.getElementById("fpUsername").value.trim();
        const newPassword = document.getElementById("fpNewPassword").value.trim();

        if (username === "" || newPassword === "") {
            msg.style.color = "red";
            msg.textContent = "All fields are required.";
            return;
        }

        let users = JSON.parse(localStorage.getItem("users")) || [];

        const userIndex = users.findIndex(u => u.username === username);

        if (userIndex === -1) {
            msg.style.color = "red";
            msg.textContent = "Username not found.";
            return;
        }

        // Update password
        users[userIndex].password = newPassword;
        localStorage.setItem("users", JSON.stringify(users));

        msg.style.color = "lightgreen";
        msg.textContent = "Password reset successful! Redirecting...";

        setTimeout(() => {
            window.location.href = "index.html";
        }, 1500);
    });

});
function togglePassword(inputId, icon) {
    const input = document.getElementById(inputId);

    if (!input) return;

    if (input.type === "password") {
        input.type = "text";
        icon.textContent = "🙈";
    } else {
        input.type = "password";
        icon.textContent = "👁";
    }
}
