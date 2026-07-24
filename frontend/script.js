// 🔹 REGISTER
const registerForm = document.getElementById("registerForm");




if (registerForm) {
    registerForm.addEventListener("submit", async function(e) {
    e.preventDefault();

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirmPassword").value;
    const role = document.getElementById("role").value;

    // ✅ ADD THIS CHECK HERE
    if (password !== confirmPassword) {
        alert("Passwords do not match!");
        return;
    }

    const res = await fetch("http://localhost:5000/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password, role })
    });

    const data = await res.text();

    alert(data);
    window.location.href = "login.html";
});
   
}


// 🔹 LOGIN
const loginForm = document.getElementById("loginForm");

if (loginForm) {
    loginForm.addEventListener("submit", async function(e) {
        e.preventDefault();

        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;

        const res = await fetch("http://localhost:5000/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password })
        });

        const data = await res.json();

        if (data.role === "admin") {
            localStorage.setItem("role", "admin");
            window.location.href = "admin.html";
        } 
        else if (data.role === "student") {
            localStorage.setItem("role", "student");
            window.location.href = "student.html";
        } 
        else {
            alert("Invalid login");
        }
    });
}


// 🔹 PROTECT PAGES
function checkAccess(expectedRole) {
    const role = localStorage.getItem("role");

    if (role !== expectedRole) {
        alert("Access Denied!");
        window.location.href = "login.html";
    }
}


// 🔹 LOGOUT
function logout() {
    localStorage.removeItem("role");
    window.location.href = "login.html";
}