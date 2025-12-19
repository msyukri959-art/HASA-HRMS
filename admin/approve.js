document.addEventListener("DOMContentLoaded", function () {

    const user = localStorage.getItem("loggedInUser");

    // 🔒 Admin protection
    if (user !== "admin") {
        alert("Access denied");
        window.location.href = "../dashboard.html";
        return;
    }

    loadPendingUsers();
});

// =========================
// LOAD PENDING USERS
// =========================
function loadPendingUsers() {

    const users = JSON.parse(localStorage.getItem("users")) || [];
    const table = document.getElementById("userTable");

    table.innerHTML = "";
    let found = false;

    users.forEach((u, index) => {
        if (!u.approved) {
            found = true;

            const row = document.createElement("tr");

            row.innerHTML = `
                <td>
                    <img src="${u.photo}" class="approve-photo">
                </td>
                <td>${u.nama}</td>
                <td>${u.noPekerja}</td>
                <td>${u.jawatan}</td>
                <td>${u.username}</td>
                <td>
                    <button onclick="approveUser(${index})">Approve</button>
                    <button class="reject" onclick="rejectUser(${index})">Reject</button>
                </td>
            `;

            table.appendChild(row);
        }
    });

    if (!found) {
        table.innerHTML = `
            <tr>
                <td colspan="6" style="text-align:center;">
                    No pending users
                </td>
            </tr>
        `;
    }
}

// =========================
// APPROVE USER
// =========================
function approveUser(index) {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    users[index].approved = true;
    localStorage.setItem("users", JSON.stringify(users));
    alert("User approved successfully");
    loadPendingUsers();
}

// =========================
// REJECT USER
// =========================
function rejectUser(index) {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    users.splice(index, 1);
    localStorage.setItem("users", JSON.stringify(users));
    alert("User rejected and removed");
    loadPendingUsers();
}

// =========================
// BACK TO DASHBOARD
// =========================
function back() {
    window.location.href = "../dashboard.html";
}
