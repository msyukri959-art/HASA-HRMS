function togglePassword(inputId, icon) {
    const input = document.getElementById(inputId);

    if (!input) {
        console.log("Password input not found:", inputId);
        return;
    }

    if (input.type === "password") {
        input.type = "text";
        icon.textContent = "🙈";
    } else {
        input.type = "password";
        icon.textContent = "👁";
    }
}
