<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8"/>
  <meta content="width=device-width, initial-scale=1.0" name="viewport"/>
  <title>ReClaimMe - Lost and Found Service</title>
  <link href="style.css" rel="stylesheet"/>
  <style>
    .nav-button.active {
      background-color: #ffffff;
      color: #000000;
      font-weight: bold;
    }
    .page-section { display: none; }
    .page-section.active { display: block; }
    .item-card {
      border: 1px solid #ccc;
      padding: 12px;
      border-radius: 8px;
      background: #f9f9f9;
      box-sizing: border-box;
      cursor: pointer;
    }
    .item-card img {
      max-width: 100%;
      margin-top: 8px;
    }
  </style>
</head>
<body>
  <div class="container">
    <!-- Header -->
    <div class="header">
      <img alt="Logo" src="ReClaimMeLogo.jpg"/>
      <h1>ReClaimMe</h1>
      <div class="nav-buttons">
        <button class="nav-button" id="nav-home">Home</button>
        <button class="nav-button" id="nav-report-lost">Report Lost</button>
        <button class="nav-button" id="nav-report-found">Report Found</button>
        <button class="nav-button" id="nav-profile">Profile</button>
        <button class="nav-button" id="nav-signout">Sign Out</button>
      </div>
    </div>

    <!-- Main Content -->
    <div class="main-content">
      <div class="page-section active" id="home">
        <div class="home-columns">
          <div class="column-box lost">
            <h2>Lost Items</h2>
            <div id="lost-grid" style="display: flex; flex-wrap: wrap; gap: 16px;"></div>
          </div>
          <div class="column-box found">
            <h2>Found Items</h2>
            <div id="found-grid" style="display: flex; flex-wrap: wrap; gap: 16px;"></div>
          </div>
        </div>
      </div>

      <!-- Report Lost Section -->
      <div class="page-section" id="report-lost">
        <h2 style="text-align: center;">Report Lost Item</h2>
        <div style="display: flex; justify-content: center;">
          <form id="lost-form" style="max-width: 600px; width: 100%; background: #eaeaea; padding: 30px; border-radius: 10px; border: 2px solid #333;">
            <div style="display: flex; align-items: center; margin-bottom: 15px;">
              <label style="width: 150px;">Name:</label>
              <input name="name" required style="flex: 1;" type="text"/>
            </div>
            <div style="display: flex; align-items: center; margin-bottom: 15px;">
              <label style="width: 150px;">Item:</label>
              <input name="item" required style="flex: 1;" type="text"/>
            </div>
            <div style="display: flex; align-items: center; margin-bottom: 15px;">
              <label style="width: 150px;">Location:</label>
              <input name="location" required style="flex: 1;" type="text"/>
            </div>
            <div style="display: flex; align-items: center; margin-bottom: 15px;">
              <label style="width: 150px;">Date:</label>
              <input name="date" required style="flex: 1;" type="date"/>
            </div>
            <div style="display: flex; align-items: center; margin-bottom: 15px;">
              <label style="width: 150px;">Contact:</label>
              <input name="contact" required style="flex: 1;" type="text"/>
            </div>
            <div style="display: flex; align-items: flex-start; margin-bottom: 15px;">
              <label style="width: 150px;">Item Description:</label>
              <textarea name="description" required rows="4" style="flex: 1;"></textarea>
            </div>
            <div style="display: flex; align-items: center; margin-bottom: 25px;">
              <label style="width: 150px;">Upload Photo:</label>
              <input accept="image/*" id="lost-photo" style="flex: 1;" type="file"/>
            </div>
            <div style="display: flex; justify-content: center; gap: 20px;">
              <button type="submit">Submit</button>
              <button onclick="navigateToPage('home')" type="button">Cancel</button>
            </div>
          </form>
        </div>
      </div>

      <!-- Report Found Section -->
      <div class="page-section" id="report-found">
        <h2 style="text-align: center;">Report Found Item</h2>
        <div style="display: flex; justify-content: center;">
          <form id="found-form" style="max-width: 600px; width: 100%; background: #eaeaea; padding: 30px; border-radius: 10px; border: 2px solid #333;">
            <div style="display: flex; align-items: center; margin-bottom: 15px;">
              <label style="width: 150px;">Name:</label>
              <input name="name" required style="flex: 1;" type="text"/>
            </div>
            <div style="display: flex; align-items: center; margin-bottom: 15px;">
              <label style="width: 150px;">Item:</label>
              <input name="item" required style="flex: 1;" type="text"/>
            </div>
            <div style="display: flex; align-items: center; margin-bottom: 15px;">
              <label style="width: 150px;">Location:</label>
              <input name="location" required style="flex: 1;" type="text"/>
            </div>
            <div style="display: flex; align-items: center; margin-bottom: 15px;">
              <label style="width: 150px;">Date:</label>
              <input name="date" required style="flex: 1;" type="date"/>
            </div>
            <div style="display: flex; align-items: center; margin-bottom: 15px;">
              <label style="width: 150px;">Contact:</label>
              <input name="contact" required style="flex: 1;" type="text"/>
            </div>
            <div style="display: flex; align-items: flex-start; margin-bottom: 15px;">
              <label style="width: 150px;">Item Description:</label>
              <textarea name="description" required rows="4" style="flex: 1;"></textarea>
            </div>
            <div style="display: flex; align-items: center; margin-bottom: 25px;">
              <label style="width: 150px;">Upload Photo:</label>
              <input accept="image/*" id="found-photo" style="flex: 1;" type="file"/>
            </div>
            <div style="display: flex; justify-content: center; gap: 20px;">
              <button type="submit">Submit</button>
              <button onclick="navigateToPage('home')" type="button">Cancel</button>
            </div>
          </form>
        </div>
      </div>
<div class="page-section" id="profile">
<div style="text-align: center;">
<h2>User Profile</h2>
<div id="user-info" style="margin: 20px auto; padding: 20px; max-width: 500px; background: #f0f0f0; border: 2px solid #444; border-radius: 10px;">
<p><strong>Name:</strong> <span id="profile-name">Loading...</span></p>
<p><strong>Email:</strong> <span id="profile-email">Loading...</span></p>
<p><strong>Phone:</strong> <span id="profile-phone">Loading...</span></p>
<button onclick="openEditProfile()">Edit Profile</button>
</div>
<h3>Your Submissions</h3>
<div id="user-submissions" style="display: flex; flex-wrap: wrap; gap: 16px; justify-content: center;"></div>
</div>
</div>
<div class="page-section" id="signout">
<h2>Signing Out...</h2>
<p>You have been signed out.</p>
</div>
</div> <!-- End of .main-content -->
<!-- Footer -->
<div class="footer">
<div class="footer-left">
<img alt="Footer Logo" src="ReClaimMeLogo.jpg"/>
<div>
<strong>ReClaimMe</strong><br/>
          Lost items? We've got a team dedicated to bringing them back to you.
        </div>
</div>
<div class="footer-center">
<div>
          © 2025 ReClaimMe<br/>
          All Rights Reserved
        </div>
</div>
<div class="footer-right">
        Contact<br/>
        Tel: +93463575478<br/>
        Email: <span class="email">reclaimme@gmail.com</span><br/>
<div class="social-icons">
<img alt="Facebook" id="social-facebook" src="fb.jpg"/>
<img alt="Instagram" id="social-instagram" src="ig.jpg"/>
</div>
</div>
</div>
</div> <!-- End of .container -->
<!-- Zoom Overlay -->
<div id="item-overlay" style="
    position: fixed;
    top: 0; left: 0; width: 100%; height: 100%;
    background-color: rgba(0,0,0,0.5);
    display: none; justify-content: center; align-items: center;
    z-index: 1000;">
<div id="zoomed-box" style="
      background: white;
      max-width: 600px;
      width: 90%;
      padding: 20px;
      border-radius: 10px;
      position: relative;
      overflow-y: auto;
      max-height: 90vh;">
<span id="close-overlay" style="
        position: absolute;
        top: 10px; right: 15px;
        font-size: 24px;
        cursor: pointer;">×</span>
<div id="zoomed-content"></div>
</div>
</div>
<!-- Firebase SDKs -->
<script src="https://www.gstatic.com/firebasejs/9.22.2/firebase-app-compat.js">
function showToast(message) {
  const toast = document.getElementById("toast");
  toast.innerText = message;
  toast.style.visibility = "visible";
  toast.style.opacity = "1";
  setTimeout(() => {
    toast.style.opacity = "0";
    toast.style.visibility = "hidden";
  }, 3000);
}

let currentUser = null;

function openEditProfile() {
  document.getElementById("edit-profile-modal").style.display = "flex";
  document.getElementById("edit-name").value = document.getElementById("profile-name").innerText;
  document.getElementById("edit-phone").value = document.getElementById("profile-phone").innerText;
}
function closeEditProfile() {
  document.getElementById("edit-profile-modal").style.display = "none";
}

async function loadUserProfile() {
  const user = firebase.auth().currentUser;
  if (!user) return;
  currentUser = user;
  const userDoc = await db.collection("users").doc(user.uid).get();
  const userData = userDoc.data() || {};
  document.getElementById("profile-name").innerText = userData.name || user.displayName || "Unknown";
  document.getElementById("profile-email").innerText = user.email;
  document.getElementById("profile-phone").innerText = userData.phone || "N/A";
  loadUserItems(user.email);
}

document.getElementById("edit-profile-form").addEventListener("submit", async (e) => {
  e.preventDefault();
  const name = document.getElementById("edit-name").value;
  const phone = document.getElementById("edit-phone").value;
  await db.collection("users").doc(currentUser.uid).set({ name, phone }, { merge: true });
  showToast('Profile saved successfully!');
  closeEditProfile();
  loadUserProfile();
});

async function loadUserItems(email) {
  const container = document.getElementById("user-submissions");
  container.innerHTML = "";

  const collections = ["lost_items", "found_items"];
  for (const collection of collections) {
    const snapshot = await db.collection(collection).where("contact", "==", email).get();
    snapshot.forEach(doc => {
      const data = doc.data();
      const card = document.createElement("div");
      card.className = "item-card";
      card.style.flex = "1 1 300px";
      card.innerHTML = `
        <h4>${data.item}</h4>
        ${data.imageUrl ? `<img alt="${data.item}" src="${data.imageUrl}"/>` : ''}
        <p><strong>Location:</strong> ${data.location}</p>
<p><strong>Date:</strong> ${data.date}</p>
<p>${data.description}</p>
<div style="display: flex; justify-content: space-between; margin-top: 10px;">
<button onclick="editItem('${collection}', '${doc.id}')">Edit</button>
<button onclick="deleteItem('${collection}', '${doc.id}')">Delete</button>
</div>
      `;
      container.appendChild(card);
    });
  }
}

function closeEditItem() {
  document.getElementById("edit-item-modal").style.display = "none";
}

async function editItem(collection, id) {
  const doc = await db.collection(collection).doc(id).get();
  const data = doc.data();
  document.getElementById("edit-item-id").value = id;
  document.getElementById("edit-item-collection").value = collection;
  document.getElementById("edit-item-name").value = data.item;
  document.getElementById("edit-item-location").value = data.location;
  document.getElementById("edit-item-date").value = data.date;
  document.getElementById("edit-item-description").value = data.description;
  document.getElementById("edit-item-image").value = '';
  document.getElementById("edit-item-modal").style.display = "flex";
}

document.getElementById("edit-item-form").addEventListener("submit", async (e) => {
  e.preventDefault();
  const id = document.getElementById("edit-item-id").value;
  const collection = document.getElementById("edit-item-collection").value;
  const imageInput = document.getElementById("edit-item-image");
  let imageUrl = null;

  if (imageInput.files.length > 0) {
    imageUrl = await uploadToCloudinary(imageInput.files[0]);
  }

  const updatedData = {
    item: document.getElementById("edit-item-name").value,
    location: document.getElementById("edit-item-location").value,
    date: document.getElementById("edit-item-date").value,
    description: document.getElementById("edit-item-description").value,
  };
  if (imageUrl) {
    updatedData.imageUrl = imageUrl;
  }

  await db.collection(collection).doc(id).update(updatedData);
  showToast('Item updated successfully!');
  closeEditItem();
  loadUserItems(currentUser.email);
});

async function deleteItem(collection, id) {
  if (confirm("Are you sure you want to delete this item?")) {
    await db.collection(collection).doc(id).delete();
    showToast('Item deleted.');
    loadUserItems(currentUser.email);
  }
}

// Modify page navigation to also load profile data
const originalNavigateToPage = navigateToPage;
navigateToPage = function(pageId) {
  document.querySelectorAll('.page-section').forEach(section => section.classList.remove('active'));
  document.getElementById(pageId)?.classList.add('active');
  if (pageId === 'home') {
    loadItems("lost_items", "#lost-grid");
    loadItems("found_items", "#found-grid");
  }
  if (pageId === 'profile') {
    loadUserProfile();
  }
}
</script>
<script src="https://www.gstatic.com/firebasejs/9.22.2/firebase-firestore-compat.js"></script>
<!-- Main JavaScript -->
<script>
    const CLOUD_NAME = "dbcgpoclo";
    const UPLOAD_PRESET = "lost-and-found";

    const firebaseConfig = {
      apiKey: "AIzaSyApp2dcT-9ugKRz1VZg-jHXZn1sjHYZUl4",
      authDomain: "lost-and-found-f8d19.firebaseapp.com",
      projectId: "lost-and-found-f8d19",
      storageBucket: "lost-and-found-f8d19.appspot.com",
      messagingSenderId: "957496896040",
      appId: "1:957496896040:web:cd966f33d9be206398e31d"
    };

    firebase.initializeApp(firebaseConfig);
    const db = firebase.firestore();

    function navigateToPage(pageId) {
      document.querySelectorAll('.page-section').forEach(section => section.classList.remove('active'));
      document.getElementById(pageId)?.classList.add('active');
      if (pageId === 'home') {
        loadItems("lost_items", "#lost-grid");
        loadItems("found_items", "#found-grid");
      }
    }

    async function uploadToCloudinary(file) {
      if (!file) return '';
      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', UPLOAD_PRESET);
      const res = await fetch(`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`, {
        method: 'POST',
        body: formData
      });
      const data = await res.json();
      return data.secure_url || '';
    }

    function renderItem(container, data) {
      const card = document.createElement('div');
      card.classList.add('item-card');
      card.style.flex = "1 1 calc(50% - 16px)";
      card.innerHTML = `
        <h4>${data.item} (${data.location})</h4>
        ${data.imageUrl ? `<img src="${data.imageUrl}" alt="${data.item}">` : ''}
        <p>${data.description}</p>
        <p><strong>Contact:</strong> ${data.contact}</p>
        <p><strong>Date:</strong> ${data.date}</p>
        <p><strong>Reported by:</strong> ${data.name}</p>
      `;
      card.addEventListener('click', () => {
        const content = `
          <h2>${data.item}</h2>
          ${data.imageUrl ? `<img src="${data.imageUrl}" alt="${data.item}" style="max-width: 100%; border-radius: 8px;">` : ''}
          <p><strong>Location:</strong> ${data.location}</p>
          <p><strong>Date:</strong> ${data.date}</p>
          <p><strong>Description:</strong> ${data.description}</p>
          <p><strong>Contact:</strong> ${data.contact}</p>
          <p><strong>Reported by:</strong> ${data.name}</p>
        `;
        document.getElementById("zoomed-content").innerHTML = content;
        document.getElementById("item-overlay").style.display = "flex";
      });
      container.appendChild(card);
    }

    async function loadItems(collectionName, containerSelector) {
      const container = document.querySelector(containerSelector);
      container.innerHTML = "";
      try {
        const snapshot = await db.collection(collectionName).orderBy("timestamp", "desc").get();
        if (snapshot.empty) {
          container.innerHTML = "<p>No items yet.</p>";
        } else {
          snapshot.forEach(doc => renderItem(container, doc.data()));
        }
      } catch (err) {
        console.error(`Failed to load ${collectionName}:`, err);
      }
    }

    async function handleFormSubmit(e, type) {
      e.preventDefault();
      const form = e.target;
      const fileInput = form.querySelector('input[type="file"]');
      const imageUrl = await uploadToCloudinary(fileInput.files[0]);

      const data = {
        name: form.name.value,
        item: form.item.value,
        location: form.location.value,
        date: form.date.value,
        contact: form.contact.value,
        description: form.description.value,
        imageUrl,
        timestamp: Date.now()
      };

      try {
        await db.collection(type === "lost" ? "lost_items" : "found_items").add(data);
        alert(`${type === "lost" ? "Lost" : "Found"} item submitted!`);
        form.reset();
        navigateToPage("home");
      } catch (err) {
        alert("Failed to submit. Please try again.\n" + err.message);
        console.error(err);
      }
    }

    document.addEventListener('DOMContentLoaded', () => {
      document.getElementById("lost-form").addEventListener("submit", e => handleFormSubmit(e, "lost"));
      document.getElementById("found-form").addEventListener("submit", e => handleFormSubmit(e, "found"));

      const navButtons = {
        'nav-home': 'home',
        'nav-report-lost': 'report-lost',
        'nav-report-found': 'report-found',
        'nav-profile': 'profile',
        'nav-signout': 'signout'
      };

      for (const [btnId, pageId] of Object.entries(navButtons)) {
        document.getElementById(btnId)?.addEventListener('click', () => navigateToPage(pageId));
      }

      document.getElementById('social-facebook')?.addEventListener('click', () => alert("Opening Facebook"));
      document.getElementById('social-instagram')?.addEventListener('click', () => alert("Opening Instagram"));

      document.getElementById("close-overlay").addEventListener("click", () => {
        document.getElementById("item-overlay").style.display = "none";
      });

      document.getElementById("item-overlay").addEventListener("click", (e) => {
        if (e.target === document.getElementById("item-overlay")) {
          document.getElementById("item-overlay").style.display = "none";
        }
      });

      navigateToPage("home");
    });
  </script>
<!-- Edit Profile Modal -->
<div id="edit-profile-modal" style="
  display: none; position: fixed; top: 0; left: 0; width: 100%; height: 100%;
  background-color: rgba(0, 0, 0, 0.5); justify-content: center; align-items: center; z-index: 1001;">
<div style="background: white; padding: 30px; border-radius: 10px; width: 90%; max-width: 400px; position: relative;">
<span onclick="closeEditProfile()" style="position: absolute; top: 10px; right: 15px; cursor: pointer; font-size: 22px;">×</span>
<h3>Edit Profile</h3>
<form id="edit-profile-form">
<label>Name:<br/><input id="edit-name" required="" type="text"/></label><br/><br/>
<label>Phone:<br/><input id="edit-phone" required="" type="text"/></label><br/><br/>
<button type="submit">Save</button>
<button onclick="closeEditProfile()" type="button">Cancel</button>
</form>
</div>
</div>
<!-- Edit Item Modal -->
<div id="edit-item-modal" style="
  display: none; position: fixed; top: 0; left: 0; width: 100%; height: 100%;
  background-color: rgba(0, 0, 0, 0.5); justify-content: center; align-items: center; z-index: 1002;">
<div style="background: white; padding: 30px; border-radius: 10px; width: 90%; max-width: 500px; position: relative;">
<span onclick="closeEditItem()" style="position: absolute; top: 10px; right: 15px; cursor: pointer; font-size: 22px;">×</span>
<h3>Edit Item</h3>
<form id="edit-item-form">
<input id="edit-item-id" type="hidden"/>
<input id="edit-item-collection" type="hidden"/>
<label>Item Name:<br/><input id="edit-item-name" required="" type="text"/></label><br/><br/>
<label>Location:<br/><input id="edit-item-location" required="" type="text"/></label><br/><br/>
<label>Date:<br/><input id="edit-item-date" required="" type="date"/></label><br/><br/>
<label>Description:<br/><textarea id="edit-item-description" required="" rows="4"></textarea></label><br/><br/>
<label>Replace Image (optional):<br/><input id="edit-item-image" type="file"/></label><br/><br/>
<button type="submit">Save Changes</button>
<button onclick="closeEditItem()" type="button">Cancel</button>
</form>
</div>
</div>

<!-- Toast Notification -->
<div id="toast" style="
  visibility: hidden;
  min-width: 250px;
  margin-left: -125px;
  background-color: #333;
  color: #fff;
  text-align: center;
  border-radius: 8px;
  padding: 16px;
  position: fixed;
  z-index: 9999;
  left: 50%;
  bottom: 30px;
  font-size: 17px;
  transition: visibility 0s, opacity 0.5s ease-in-out;
  opacity: 0;">
</div>
</body>
</html>
