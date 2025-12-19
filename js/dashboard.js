document.addEventListener("DOMContentLoaded", function () {

    const loggedInUsername = localStorage.getItem("loggedInUser");

    if (!loggedInUsername) {
        window.location.href = "index.html";
        return;
    }

    const users = JSON.parse(localStorage.getItem("users")) || [];
    const currentUser = users.find(u => u.username === loggedInUsername);

    const welcome = document.getElementById("welcomeUser");

    if (currentUser && currentUser.nama) {
        welcome.textContent = `Selamat Datang, ${currentUser.nama}`;
    } else {
        welcome.textContent = `Selamat Datang`;
    }

    // Hide admin card for non-admin
    if (loggedInUsername !== "admin") {
        const adminCard = document.getElementById("adminCard");
        if (adminCard) adminCard.style.display = "none";
    }
});

// 🔓 Logout
function logout() {
    localStorage.removeItem("loggedInUser");
    window.location.href = "index.html";
}

// ⚙️ Open admin page
function openSystemManagement() {
    window.location.href = "admin/index.html";
}

// 👤 Open profile
function goProfile() {
    window.location.href = "profile/profile.html";
}
