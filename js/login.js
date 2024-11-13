document.getElementById("sign-in-btn").addEventListener("click", async function (e) {
    e.preventDefault();
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
            window.location.href = "index.html"; // Redirect if successful
        } else {
            alert(result.error);
        }
    } catch (error) {
        console.error("Error during login:", error);
        alert("An error occurred during login. Please try again.");
    }
});



document.getElementById("loginForm").onsubmit = async function (e) {
    e.preventDefault(); // Prevent default form submission behavior
    const username = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    try {
        const response = await fetch("http://127.0.0.1:5000/auth/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ username, email, password }),
        });

        const result = await response.json();

        if (response.ok) {
            alert(result.message); // Show success message
            window.location.href = 'index.html'; // Redirect on successful login
        } else {
            alert(result.error); // Show error message if login fails
        }
    } catch (error) {
        console.error("Error during login:", error); // Log any errors to the console
        alert("An error occurred during login. Please try again.");
    }
};

window.onload = function() {
    document.getElementById("sign-in-btn").disabled = false;
};
