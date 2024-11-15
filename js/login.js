// Function to validate email format
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Simple email pattern
    return emailRegex.test(email);
}

// Registration Function
async function registerUser() {
    const username = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    if (!isValidEmail(email)) {
        showNotification("Invalid email format. Please enter a valid email.", "error");
        return; // Stop further execution if email is invalid
    }

    try {
        const response = await fetch("https://tugas2pawm-4.onrender.com/auth/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ username, email, password })
        });

        const result = await response.json();

        if (response.ok) {
            showNotification("Registration successful! Redirecting...", "success");
            setTimeout(() => {
                window.location.href = 'index.html'; 
            }, 3000); // Redirect after 3 seconds
        } else {
            showNotification(result.error || "Registration failed. Please try again.", "error");
        }
    } catch (error) {
        console.error("Error during registration:", error);
        showNotification("An error occurred during registration. Please try again.", "error");
    }
}

// Login Function
async function loginUser() {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    try {
        const response = await fetch("https://tugas2pawm-4.onrender.com/auth/login", {
            method: "POST",  // Ensure method is POST
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password })
        });

        const result = await response.json();

        if (response.ok) {
            showNotification(result.message, "success"); // Success notification
            setTimeout(() => {
                window.location.href = 'index.html';
            }, 3000); // Redirect after 3 seconds
        } else {
            showNotification(result.error, "error"); // Error notification
        }
    } catch (error) {
        console.error("Error during login:", error);
        showNotification("An error occurred during login. Please try again.", "error");
    }
}

// Ensuring buttons are enabled on load
window.onload = function() {
    const loginBtn = document.getElementById("login-btn");
    if (loginBtn) {
        loginBtn.disabled = false;
        loginBtn.addEventListener("click", async function (e) {
            e.preventDefault(); 
            await loginUser();
        });
    }

    const registerBtn = document.getElementById("register-btn");
    if (registerBtn) {
        registerBtn.disabled = false;
        registerBtn.addEventListener("click", async function (e) {
            e.preventDefault(); 
            await registerUser(); 
        });
    }
};

// Function to display a custom popup notification
function showNotification(message, type = "success") {
    let notification = document.createElement('div');
    notification.className = `custom-notification ${type}`; // Add success or error type
    notification.innerText = message;

    document.body.appendChild(notification);

    setTimeout(() => {
        notification.classList.add('show');
    }, 10);

    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            notification.remove();
        }, 500);
    }, 3000); // Display duration
}
