document.addEventListener("DOMContentLoaded", function () {

    const form = document.getElementById("registerForm");
    const regMsg = document.getElementById("regMsg");

    if (!form) {
        console.error("Register form not found");
        return;
    }

    form.addEventListener("submit", function (e) {
        e.preventDefault(); // ⛔ STOP REFRESH

        const nama = document.getElementById("nama").value.trim();
        const noPekerja = document.getElementById("noPekerja").value.trim();
        const jawatan = document.getElementById("jawatan").value.trim();
        const username = document.getElementById("regUsername").value.trim();
        const password = document.getElementById("regPassword").value.trim();
        const file = document.getElementById("profilePic").files[0];

        if (!nama || !noPekerja || !jawatan || !username || !password || !file) {
            regMsg.textContent = "All fields are required.";
            regMsg.style.color = "#ff4d4d";
            return;
        }

        const reader = new FileReader();

        reader.onload = function () {
            let users = JSON.parse(localStorage.getItem("users")) || [];

            if (users.some(u => u.username === username)) {
                regMsg.textContent = "Username already exists.";
                return;
            }

            users.push({
                nama,
                noPekerja,
                jawatan,
                username,
                password,
                photo: reader.result,
                approved: false
            });

            localStorage.setItem("users", JSON.stringify(users));

            regMsg.style.color = "lightgreen";
            regMsg.textContent = "Account created. Pending admin approval.";

            setTimeout(() => {
                window.location.href = "index.html";
            }, 1500);
        };

        reader.readAsDataURL(file);
    });
});
