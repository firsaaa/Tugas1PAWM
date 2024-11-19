function checkLogin(page) {
    if (localStorage.getItem("isLogged") !== null) {
        if(localStorage.getItem("isLogged") === "true"){
            console.log("logged in ", localStorage.getItem("user_id"));
            window.location.href = page;   
        }
    } else {
      showNotification("Please log in first!", "error");
      setTimeout(() => {
          window.location.href = 'login.html';
      }, 3000);
    }
  }

// Set the API URL directly for frontend usage
const apiUrl = "https://tugas2pawm-4.onrender.com"; // Replace with your actual API endpoint

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
        const response = await fetch(`${apiUrl}/auth/register`, {  // Corrected URL
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ username, email, password })
        });

        const result = await response.json();

        if (response.ok) {
            localStorage.setItem("isLogged", "true");
            localStorage.setItem("user_id", email);
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
        const response = await fetch(`${apiUrl}/auth/login`, {  // Corrected URL
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password })
        });

        const result = await response.json();

        if (response.ok) {
            localStorage.setItem("isLogged", "true");
            localStorage.setItem("user_id", email);
            showNotification(result.message || "Login successful!", "success");
            setTimeout(() => {
                window.location.href = 'index.html';
            }, 3000); // Redirect after 3 seconds
        } else {
            showNotification(result.error || "Login failed. Please try again.", "error");
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
        console.log("Login button found");  // Debugging statement
        loginBtn.removeAttribute("disabled"); // Ensure the button is not disabled
        loginBtn.addEventListener("click", async function (e) {
            e.preventDefault();
            console.log("Login button clicked");  // Debugging statement
            await loginUser();
        });
    } else {
        console.error("Login button not found");  // Debugging statement
    }

    // Only try to find the register button if it is actually on the page
    const registerBtn = document.getElementById("register-btn");
    if (registerBtn) {
        console.log("Register button found");  // Debugging statement
        registerBtn.removeAttribute("disabled"); // Ensure the button is not disabled
        registerBtn.addEventListener("click", async function (e) {
            e.preventDefault();
            console.log("Register button clicked");  // Debugging statement
            await registerUser();
        });
    } else {
        console.warn("Register button not found, ignoring");  // Debugging statement
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
