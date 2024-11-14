// Registration Function
async function registerUser () {
    const username = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    try {
        const response = await fetch("http://127.0.0.1:5000/auth/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ username, email, password }),
        });

        const result = await response.json();

        if (response.ok) {
            alert(result.message);
            window.location.href = 'index.html'; 
        } else {
            alert(result.error);
        }
    } catch (error) {
        console.error("Error during registration:", error);
        alert("An error occurred during registration. Please try again.");
    }
}

// Login Function
async function loginUser () {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    try {
        const response = await fetch("http://127.0.0.1:5000/auth/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password }),
        });

        const result = await response.json();

        if (response.ok) {
            alert(result.message);
            window.location.href = 'index.html'; 
        } else {
            alert(result.error);
        }
    } catch (error) {
        console.error("Error during login:", error);
        alert("An error occurred during login. Please try again.");
    }
}

// Ensuring buttons are enabled on load
window.onload = function() {
    // Enable only the login button explicitly for login page
    const loginBtn = document.getElementById("login-btn");
    if (loginBtn) {
        loginBtn.disabled = false;
        loginBtn.addEventListener("click", async function (e) {
            e.preventDefault(); // Prevent default form submission behavior
            await loginUser (); // Call the login function
        });
    }

    // Register button should only be present in register.html
    const registerBtn = document.getElementById("register-btn");
    if (registerBtn) {
        registerBtn.disabled = false;
        registerBtn.addEventListener("click", async function (e) {
            e.preventDefault(); // Prevent default form submission behavior
            await registerUser (); // Call the registration function
        });
    }
};