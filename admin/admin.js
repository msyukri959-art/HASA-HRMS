document.addEventListener("DOMContentLoaded", function () {

    if (localStorage.getItem("loggedInUser") !== "admin") {
        alert("Access denied");
        window.location.href = "../dashboard.html";
        return;
    }
});

function openApproval() {
    window.location.href = "approve.html";
}

function back() {
    window.location.href = "../dashboard.html";
}
function loadPendingUsers() {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const pending = users.filter(u => !u.approved);

    const tbody = document.getElementById("pendingUsers");
    tbody.innerHTML = "";

    if (pending.length === 0) {
        tbody.innerHTML = `
            <tr>
                <td colspan="6" style="text-align:center;">Tiada permohonan baharu</td>
            </tr>
        `;
        return;
    }

    pending.forEach((user, index) => {
        tbody.innerHTML += `
            <tr>
                <td><img src="${user.photo}" class="approve-photo"></td>
                <td>${user.nama}</td>
                <td>${user.noPekerja}</td>
                <td>${user.jawatan}</td>
                <td>${user.username}</td>
                <td>
                    <button onclick="approveUser('${user.username}')">Approve</button>
                    <button class="reject" onclick="rejectUser('${user.username}')">Reject</button>
                </td>
            </tr>
        `;
    });
}
function approveUser(username) {
    let users = JSON.parse(localStorage.getItem("users")) || [];

    users = users.map(u => {
        if (u.username === username) {
            u.approved = true;
        }
        return u;
    });

    localStorage.setItem("users", JSON.stringify(users));
    loadPendingUsers();
}
function rejectUser(username) {
    let users = JSON.parse(localStorage.getItem("users")) || [];

    users = users.filter(u => u.username !== username);

    localStorage.setItem("users", JSON.stringify(users));
    loadPendingUsers();
}
function openSystemManagement() {
    document.getElementById("dashboardCards").style.display = "none";
    document.getElementById("approvalSection").style.display = "block";
    loadPendingUsers();
}
