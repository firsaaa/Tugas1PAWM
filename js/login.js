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
        const response = await fetch("http://127.0.0.1:5000/auth/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ username, email, password }),
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
        const response = await fetch("http://127.0.0.1:5000/auth/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password }),
        });

        const result = await response.json();

        if (response.ok) {
            showNotification(result.message); // Success notification
            setTimeout(() => {
                window.location.href = 'index.html';
            }, 3000); // Redirect after 3 seconds
        } else {
            showNotification(result.error); // Error notification
        }
    } catch (error) {
        console.error("Error during login:", error);
        showNotification("An error occurred during login. Please try again.");
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

function showNotification(message) {
    // Create the notification div
    let notification = document.createElement('div');
    notification.className = 'custom-notification';
    notification.innerText = message;

    // Append to the body
    document.body.appendChild(notification);

    // Add the "show" class to trigger the fade-in effect
    setTimeout(() => {
        notification.classList.add('show');
    }, 10);

    // Remove the notification after 3 seconds
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            notification.remove();
        }, 500); // Delay to allow transition out
    }, 3000); // Display duration
}


