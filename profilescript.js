// Ensure Firebase is initialized (import 'auth.js' first)
import './auth.js';  // Import Firebase configuration and initialization
const database = firebase.database();
const auth = firebase.auth();

// Define a base URL for profile pictures (replace with your GitHub path to the images folder)
const baseUrl = "https://github.com/Darkstrike03/Ethereal-Archives/tree/main/assets";

// Check if the user is logged in on page load and fetch data if authenticated
auth.onAuthStateChanged((user) => {
    if (user) {
        const userId = user.uid;
        fetchUserData(userId); // Fetch profile data on page load
    } else {
        console.error("User is not logged in");
        window.location.href = 'login.html'; // Redirect to login if not logged in
    }
});

// Function to navigate to the homepage
function goToHome() {
    window.location.href = 'index.html';
}

// Variables to track username changes and profile picture selection
let usernameChangeCount = 0;
let selectedProfilePic = 'assets/Untitled design.png';

// Function to open the profile edit modal and show selected profile picture
function editProfile() {
    document.getElementById("editProfileModal").style.display = "block";
    document.getElementById("selectedProfilePic").src = `${baseUrl}/${selectedProfilePic}`;
}

// Function to close the profile edit modal
function closeModal() {
    document.getElementById("editProfileModal").style.display = "none";
}

// Function to select a profile picture
function selectProfilePic(picPath) {
    // Save only the relative path (e.g., 'images/profile-pic1.png')
    selectedProfilePic = picPath;
    document.getElementById("selectedProfilePic").src = `${baseUrl}/${selectedProfilePic}`;
}

async function saveProfile() {
    const newUsername = document.getElementById("newUsername").value;
    const user = auth.currentUser;

    if (!user) {
        console.error("User not logged in");
        return;
    }

    const userId = user.uid;
    const userRef = database.ref('users/' + userId);
    const usernameRef = database.ref('usernames/' + newUsername);

    try {
        // Check if the new username is unique
        const snapshot = await usernameRef.get();
        if (snapshot.exists()) {
            alert("Username is already taken. Please choose a different one.");
            return;
        }

        // Delete the old username entry if it exists
        const currentUsername = (await userRef.get()).val().username;
        if (currentUsername) {
            await database.ref('usernames/' + currentUsername).remove();
        }

        // Save new username and profile data
        await userRef.update({ username: newUsername, profilePicture: selectedProfilePic });
        await usernameRef.set(userId);  // Link new username with user ID
        usernameChangeCount++;  // Increment username change count

        closeModal();  // Close the modal after saving changes
    } catch (error) {
        console.error("Error updating username:", error);
    }

    // Limit username changes
    if (usernameChangeCount >= 3) {
        alert("You can only change your username 3 times.");
        return;
    }

    // Prepare the data to be saved to Firebase
    const profileData = {
        username: newUsername || document.getElementById("username").innerText,
        profilePicture: selectedProfilePic,
        stats: {
            continueReading: parseInt(document.querySelector(".stat-number[data-stat='continueReading']").textContent),
            posts: parseInt(document.querySelector(".stat-number[data-stat='posts']").textContent),
            comments: parseInt(document.querySelector(".stat-number[data-stat='comments']").textContent),
            saved: parseInt(document.querySelector(".stat-number[data-stat='saved']").textContent),
            bookmarks: parseInt(document.querySelector(".stat-number[data-stat='bookmarks']").textContent)
        }
    };

    // Save data to Firebase
    try {
        await userRef.update(profileData);
        document.getElementById("username").innerText = newUsername; // Update username on the profile page
        closeModal();
    } catch (error) {
        console.error("Error saving profile data:", error);
    }
}

// Function to display fetched user data on the profile page
function displayUserData(data) {
    document.getElementById("username").textContent = data.username || "Guest User";
    document.querySelector(".profile-avatar").src = data.profilePicture 
        ? `${baseUrl}/${data.profilePicture}` 
        : `${baseUrl}/default-profile-pic.png`;

    // Update stats on profile page
    document.querySelector(".stat-number[data-stat='continueReading']").textContent = data.stats?.continueReading || 0;
    document.querySelector(".stat-number[data-stat='posts']").textContent = data.stats?.posts || 0;
    document.querySelector(".stat-number[data-stat='comments']").textContent = data.stats?.comments || 0;
    document.querySelector(".stat-number[data-stat='saved']").textContent = data.stats?.saved || 0;
    document.querySelector(".stat-number[data-stat='bookmarks']").textContent = data.stats?.bookmarks || 0;
}

// Fetch user data from Firebase when the user ID is available
async function fetchUserData(userId) {
    const userRef = database.ref('users/' + userId);
    userRef.on('value', (snapshot) => {
        const userData = snapshot.val();
        if (userData) {
            displayUserData(userData);
        } else {
            console.error("No data available");
        }
    });
}

// Function to update a specific stat and increment it in Firebase
async function updateStat(type) {
    const user = auth.currentUser;
    if (!user) {
        console.error("User not logged in");
        return;
    }

    const userId = user.uid;
    try {
        const statRef = database.ref(`users/${userId}/stats/${type}`);
        await statRef.transaction((currentValue) => (currentValue || 0) + 1);
        console.log(`Updated ${type} stat successfully`);
        fetchUserData(userId); // Refresh data after stat update
    } catch (error) {
        console.error(`Error updating ${type} stat:`, error);
    }
}

// Event listeners for updating stats
document.addEventListener("DOMContentLoaded", () => {
    document.querySelector(".stat-item[data-type='bookmark']").addEventListener("click", () => {
        updateStat('bookmarks');
    });

    document.querySelector(".stat-item[data-type='saved']").addEventListener("click", () => {
        updateStat('saved');
    });
});

// Sign-in or Profile button display logic
auth.onAuthStateChanged((user) => {
    const signInButton = document.getElementById("authbutton");
    const profileButton = document.getElementById("profile-button");

    if (user) {
        profileButton.style.display = "inline";
        signInButton.style.display = "none";
    } else {
        profileButton.style.display = "none";
        signInButton.style.display = "inline";
    }
});

// Function to log out the user
function logout() {
    auth.signOut().then(() => {
         localStorage.removeItem("isLoggedIn");
        console.log("User logged out");
        window.location.href = "index.html";
    }).catch((error) => {
        console.error("Logout failed:", error);
    });
}
