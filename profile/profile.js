document.addEventListener("DOMContentLoaded", function () {

    const username = localStorage.getItem("loggedInUser");
    if (!username) {
        window.location.href = "../index.html";
        return;
    }

    const users = JSON.parse(localStorage.getItem("users")) || [];
    const user = users.find(u => u.username === username);

    if (!user) return;

    document.getElementById("pNama").value = user.nama;
    document.getElementById("pNoPekerja").value = user.noPekerja;
    document.getElementById("pJawatan").value = user.jawatan;

    if (user.photo) {
        document.getElementById("profilePhoto").src = user.photo;
    }
});

function saveProfile() {
    const msg = document.getElementById("profileMsg");
    const username = localStorage.getItem("loggedInUser");

    let users = JSON.parse(localStorage.getItem("users")) || [];
    const index = users.findIndex(u => u.username === username);

    if (index === -1) {
        msg.textContent = "User not found.";
        msg.style.color = "#ff4d4d";
        return;
    }

    users[index].nama = document.getElementById("pNama").value.trim();
    users[index].noPekerja = document.getElementById("pNoPekerja").value.trim();
    users[index].jawatan = document.getElementById("pJawatan").value.trim();

    const fileInput = document.getElementById("profilePic");


    if (fileInput && fileInput.files[0]) {
        const reader = new FileReader();
        reader.onload = function () {
            users[index].photo = reader.result;
            localStorage.setItem("users", JSON.stringify(users));

            msg.style.color = "lightgreen";
            msg.textContent = "Profile updated successfully.";
        };
        reader.readAsDataURL(fileInput.files[0]);
    } else {
        localStorage.setItem("users", JSON.stringify(users));

        msg.style.color = "lightgreen";
        msg.textContent = "Profile updated successfully.";
    }

    setTimeout(() => {
    msg.textContent = "";
}, 3000);

}

function changePassword() {
    const current = document.getElementById("currentPassword").value.trim();
    const newPass = document.getElementById("newPassword").value.trim();
    const confirm = document.getElementById("confirmPassword").value.trim();
    const msg = document.getElementById("passwordMsg");

    const username = localStorage.getItem("loggedInUser");
    let users = JSON.parse(localStorage.getItem("users")) || [];

    const userIndex = users.findIndex(u => u.username === username);

    if (userIndex === -1) {
        msg.textContent = "Pengguna tidak dijumpai.";
        msg.style.color = "#ff4d4d";
        return;
    }

    // 🔴 Validation
    if (!current || !newPass || !confirm) {
        msg.textContent = "Sila lengkapkan semua medan.";
        msg.style.color = "#ff4d4d";
        return;
    }

    if (users[userIndex].password !== current) {
        msg.textContent = "Kata laluan semasa tidak betul.";
        msg.style.color = "#ff4d4d";
        return;
    }

    if (newPass.length < 6) {
        msg.textContent = "Kata laluan baharu mestilah sekurang-kurangnya 6 aksara.";
        msg.style.color = "#ff4d4d";
        return;
    }

    if (newPass !== confirm) {
        msg.textContent = "Pengesahan kata laluan tidak sepadan.";
        msg.style.color = "#ff4d4d";
        return;
    }

    // ✅ Save new password
    users[userIndex].password = newPass;
    localStorage.setItem("users", JSON.stringify(users));

    msg.textContent = "Kata laluan berjaya dikemaskini.";
    msg.style.color = "lightgreen";

    // Clear fields
    document.getElementById("currentPassword").value = "";
    document.getElementById("newPassword").value = "";
    document.getElementById("confirmPassword").value = "";
}

