// Function to handle redirection to the login page
function redirectToLogin() {
    window.location.href = 'loginpg.html'; // Replace 'login.html' with the actual login page URL
}
function editProfile() {
    alert("Edit Profile functionality coming soon!");
}
function redirectToMaintain(){
    alert("THIS ACTION IS CURENTLY UNDER MAINTAINENCE");
}
// Function to redirect to the Home page or refresh if already on it
function goToHome() {
    if (window.location.pathname.endsWith('index.html')) {
        window.location.reload();  // Refresh the page if already on the home page
    } else {
        window.location.href = 'index.html';  // Redirect to the home page
    }
}
function goToProfile() {
    window.location.href = 'profile.html';
}
// Function to redirect to the Novel page
function goToNovel() {
    window.location.href = 'index.html'; // Replace with the actual Novel section link
}
// Function to redirect to the Notice page
function goToNotice() {
    window.location.href = 'notice.html'; // Replace with the actual Notice section link
}
function goToWrite(){
    window.location.href = 'write.html';
}
 function timeAgo(date) {
    const now = new Date();
    const updated = new Date(date);
    const diffInSeconds = Math.floor((now - updated) / 1000);

    const intervals = [
      { label: "year", seconds: 31536000 },
      { label: "month", seconds: 2592000 },
      { label: "week", seconds: 604800 },
      { label: "day", seconds: 86400 },
      { label: "hour", seconds: 3600 },
      { label: "minute", seconds: 60 },
    ];

    for (const interval of intervals) {
      const count = Math.floor(diffInSeconds / interval.seconds);
      if (count >= 1) {
        return `Updated ${count} ${interval.label}${count !== 1 ? "s" : ""} ago`;
      }
    }
    return "Updated just now";
  }

  // Update all .update-time elements
  function updateTimes() {
    const elements = document.querySelectorAll(".update-time");
    elements.forEach((el) => {
      const updatedTime = el.getAttribute("data-updated");
      el.textContent = timeAgo(updatedTime);
    });
  }

  // Initial load
  updateTimes();

  // Optional: Auto-refresh every 60 seconds to keep times updated
  setInterval(updateTimes, 60000);
// Function to redirect to the Post page
function goToPost() {
    window.location.href = 'posts.html'; // Replace with the actual Post section link
}

// Optional: If you want to dynamically update the sign-in button to avatar when logged in
function updateAuthButton(isLoggedIn) {
    const authButton = document.getElementById('authButton');
    if (isLoggedIn) {
        authButton.innerHTML = '<img src="avatar.png" alt="User Avatar" class="avatar">'; // Replace with actual avatar image and styling
        authButton.onclick = function() {
            window.location.href = 'profile.html'; // Link to profile page
        };
    } else {
        authButton.innerText = 'Sign In/Sign Up';
        authButton.onclick = redirectToLogin;
    }
}
const themeToggle = document.getElementById("themeToggle");
const sunIcon = document.getElementById("sunIcon");
const moonIcon = document.getElementById("moonIcon");

// Check for saved theme in local storage or set default
const currentTheme = localStorage.getItem("theme") || "light";
document.body.classList.toggle("dark-mode", currentTheme === "dark");

// Set the correct icon on page load
if (currentTheme === "dark") {
    sunIcon.style.display = "none";
    moonIcon.style.display = "block";
} else {
    sunIcon.style.display = "block";
    moonIcon.style.display = "none";
}

// Toggle theme on button click
themeToggle.addEventListener("click", () => {
    const isDarkMode = document.body.classList.toggle("dark-mode");
    
    // Update icons based on theme
    if (isDarkMode) {
        sunIcon.style.display = "none";
        moonIcon.style.display = "block";
        localStorage.setItem("theme", "dark");
    } else {
        sunIcon.style.display = "block";
        moonIcon.style.display = "none";
        localStorage.setItem("theme", "light");
    }
});


function showSlide(index) {
    slides.forEach(slide => slide.classList.remove('active'));
    slides[index].classList.add('active');
}
document.addEventListener("DOMContentLoaded", function() {
    const authButton = document.getElementById("authButton");
    const profileButton = document.getElementById("profileButton");

    if (localStorage.getItem("isLoggedIn") === "true") {
        profileButton.style.display = "inline-block";
        authButton.style.display = "none";
    }
});

function updateAuthButton(isLoggedIn) {
    const authButton = document.getElementById("authButton");
    const profileButton = document.getElementById("profileButton");
    if (isLoggedIn) {
        authButton.style.display = "none";
        profileButton.style.display = "inline-block";
    } else {
        authButton.style.display = "inline-block";
        profileButton.style.display = "none";
    }
}

window.onload = function() {
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
    updateAuthButton(isLoggedIn);
};

// script.js
function logout() {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("username");
    window.location.href = "index.html"; // Reload to update UI
}




