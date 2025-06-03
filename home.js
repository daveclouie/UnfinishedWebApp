import { initializeApp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js";
import {
  getFirestore,
  collection,
  addDoc,
  doc,
  setDoc,
  getDoc,
  getDocs,
  deleteDoc,
  query,
  where,
  onSnapshot
} from "https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js";
import { signOut } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js";
import { firebaseConfig } from './firebase.js';

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth();

const lostForm = document.getElementById("lostForm");
const foundForm = document.getElementById("foundForm");
const lostItems = document.getElementById("lostItems");
const foundItems = document.getElementById("foundItems");
const profileContent = document.getElementById("profileContent");


document.addEventListener("DOMContentLoaded", () => {
  let savedTab = localStorage.getItem('activeTab') || 'home';

  // If we reload on the signout tab, switch to home
  if (savedTab === 'signout') {
    savedTab = 'home';
    localStorage.setItem('activeTab', 'home');
  }

  const tabButton = Array.from(document.querySelectorAll('.tab-button'))
    .find(btn => btn.textContent.toLowerCase().replace(/\s+/g, "") === savedTab);

  // Show the saved tab right away
  showTab(savedTab, tabButton);

  // Make everything visible now
  document.body.classList.add('tabs-ready');
});


function showTab(tabId, button) {
  document.querySelectorAll('.tab-content').forEach(tab => tab.classList.remove('active'));
  const target = document.getElementById(tabId);
  if (target) target.classList.add('active');

  document.querySelectorAll('.tab-button').forEach(btn => btn.classList.remove('active-tab'));
  if (button) button.classList.add('active-tab');

  // Save current tab to localStorage
  localStorage.setItem('activeTab', tabId);

    // Reset forms when switching away from them
  if (tabId !== 'reportlost') {
    const lostForm = document.getElementById("lostForm");
    if (lostForm) lostForm.reset();
  }

  if (tabId !== 'reportfound') {
    const foundForm = document.getElementById("foundForm");
    if (foundForm) foundForm.reset();
  }

}

document.querySelectorAll(".tab-button").forEach(button => {
  button.addEventListener("click", () => {
    const tabId = button.textContent.toLowerCase().replace(/\s+/g, "");
    showTab(tabId, button);
  });
});

document.addEventListener("click", function (e) {
  if (e.target && e.target.classList.contains("cancel-btn")) {
    console.log("✅ Cancel button clicked");

    const form = e.target.closest("form");
    if (form) form.reset();

    const homeTabButton = Array.from(document.querySelectorAll(".tab-button"))
      .find(btn => btn.textContent.trim().toLowerCase() === "home");

    if (homeTabButton) {
      showTab("home", homeTabButton);
    }
  }
});


async function uploadImageToCloudinary(file) {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", "lost-and-found");

  const response = await fetch("https://api.cloudinary.com/v1_1/dbcgpoclo/image/upload", {
    method: "POST",
    body: formData,
  });

  const data = await response.json();
  return data.secure_url;
}

if (lostForm) {
  lostForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const submitBtn = lostForm.querySelector("button[type='submit']");
    submitBtn.disabled = true;
    submitBtn.textContent = "Submitting...";

    const user = auth.currentUser;
    if (!user) {
      alert("You must be signed in to report.");
      submitBtn.disabled = false;
      submitBtn.textContent = "Submit";
      return;
    }

    try {
      const imageFile = document.getElementById("lostImage").files[0];
      const imageUrl = imageFile ? await uploadImageToCloudinary(imageFile) : "";

      const docData = {
        title: document.getElementById("lostTitle").value,
        location: document.getElementById("lostLocation").value,
        description: document.getElementById("lostDescription").value,
        contact: document.getElementById("lostContact").value,
        date: document.getElementById("lostDate").value,
        imageUrl,
        type: "lost",
        uid: user.uid,
        timestamp: Date.now(),
      };

      await addDoc(collection(db, "items"), docData);
e.target.reset();

// ✅ Reload page and show profile tab with new item
localStorage.setItem("activeTab", "profile");
window.location.reload();


// 🔁 If user is on profile, refresh it
if (localStorage.getItem("activeTab") === "profile" && auth.currentUser) {
  loadUserItems(auth.currentUser.uid);
}

    } catch (err) {
      alert("Error submitting item. Please try again.");
    } finally {
      submitBtn.disabled = false;
      submitBtn.textContent = "Submit";
    }
  });
}

if (foundForm) {
  foundForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const submitBtn = foundForm.querySelector("button[type='submit']");
    submitBtn.disabled = true;
    submitBtn.textContent = "Submitting...";

    const user = auth.currentUser;
    if (!user) {
      alert("You must be signed in to report.");
      submitBtn.disabled = false;
      submitBtn.textContent = "Submit";
      return;
    }

    try {
      const imageFile = document.getElementById("foundImage").files[0];
      const imageUrl = imageFile ? await uploadImageToCloudinary(imageFile) : "";

      const docData = {
        title: document.getElementById("foundTitle").value,
        location: document.getElementById("foundLocation").value,
        description: document.getElementById("foundDescription").value,
        contact: document.getElementById("foundContact").value,
        date: document.getElementById("foundDate").value,
        imageUrl,
        type: "found",
        uid: user.uid,
        timestamp: Date.now(),
      };

      await addDoc(collection(db, "items"), docData);
e.target.reset();

// ✅ Reload page and show profile tab with new item
localStorage.setItem("activeTab", "profile");
window.location.reload();


if (localStorage.getItem("activeTab") === "profile" && auth.currentUser) {
  loadUserItems(auth.currentUser.uid);
}


    } catch (err) {
      alert("Error submitting item. Please try again.");
    } finally {
      submitBtn.disabled = false;
      submitBtn.textContent = "Submit";
    }
  });
}

onSnapshot(collection(db, "items"), (snapshot) => {
  lostItems.innerHTML = "";
  foundItems.innerHTML = "";

  snapshot.forEach((doc) => {
    const item = doc.data();
    const div = document.createElement("div");
    div.className = "item-box" + (item.type === "found" ? " found" : "");
    div.innerHTML = `
      <h3>${item.title} (${item.location})</h3>
      ${item.imageUrl ? `<img src="${item.imageUrl}" alt="${item.title}" />` : ""}
      <p>${item.description}</p>
      <p><strong>Contact:</strong> ${item.contact}</p>
      <p><strong>Date:</strong> ${item.date}</p>
    `;
    if (item.type === "lost") {
      lostItems.appendChild(div);
    } else {
      foundItems.appendChild(div);
    }
  });
});

async function loadUserItems(uid) {
  const q = query(collection(db, "items"), where("uid", "==", uid));
  const querySnapshot = await getDocs(q);

  const userItemsHTML = querySnapshot.docs.map(doc => {
    const item = doc.data();
    const itemId = doc.id;
    return `
      <div class="item-box${item.type === 'found' ? ' found' : ''}" style="padding:10px; margin:10px 0;">
        <h4 style="font-size: 14px;">${item.title} (${item.location})</h4>
        ${item.imageUrl ? `<img src="${item.imageUrl}" alt="${item.title}" style="width:100%; max-width:150px; border-radius:8px;" />` : ""}
        <p style="font-size:12px;">${item.description}</p>
        <p style="font-size:12px;"><strong>Contact:</strong> ${item.contact}</p>
        <p style="font-size:12px;"><strong>Date:</strong> ${item.date}</p>
        <button class="edit-btn" data-id="${itemId}" data-type="${item.type}">Edit</button>
        <button class="delete-btn" data-id="${itemId}">Delete</button>
      </div>
    `;
  }).join('');

  const wrapper = `
    <div style="margin-top:20px;">
      <h3 style="font-size:16px;">Your Posted Items</h3>
      <div style="display:grid; grid-template-columns: repeat(auto-fill, minmax(160px, 1fr)); gap:10px;">
        ${userItemsHTML}
      </div>
    </div>
  `;

  const container = document.createElement('div');
  container.innerHTML = wrapper;

  const existingItems = document.querySelector('#profileContent .item-box')?.parentNode?.parentNode;
  if (existingItems) existingItems.remove();
  profileContent.appendChild(container);

  attachItemButtons(uid);
}

function attachItemButtons(uid) {
  document.querySelectorAll('.delete-btn').forEach(btn => {
    btn.addEventListener('click', async () => {
      const id = btn.dataset.id;
      if (confirm('Are you sure you want to delete this item?')) {
        await deleteDoc(doc(db, "items", id));
        alert("Item deleted.");
        loadUserItems(uid);
      }
    });
  });

  document.querySelectorAll('.edit-btn').forEach(btn => {
    btn.addEventListener('click', async () => {
      const id = btn.dataset.id;
      const type = btn.dataset.type;
      const docSnap = await getDoc(doc(db, "items", id));
      const item = docSnap.data();

      showTab(type === 'lost' ? 'reportlost' : 'reportfound', document.querySelector(`.tab-button[onclick*="${type}"]`));

      document.getElementById(`${type}Title`).value = item.title;
      document.getElementById(`${type}Location`).value = item.location;
      document.getElementById(`${type}Description`).value = item.description;
      document.getElementById(`${type}Contact`).value = item.contact;
      document.getElementById(`${type}Date`).value = item.date;

      const form = document.getElementById(`${type}Form`);





      newForm.addEventListener("submit", async (e) => {
        e.preventDefault();

        const updatedData = {
          title: document.getElementById(`${type}Title`).value,
          location: document.getElementById(`${type}Location`).value,
          description: document.getElementById(`${type}Description`).value,
          contact: document.getElementById(`${type}Contact`).value,
          date: document.getElementById(`${type}Date`).value,
        };

        const imageFile = document.getElementById(`${type}Image`).files[0];
        if (imageFile) {
          updatedData.imageUrl = await uploadImageToCloudinary(imageFile);
        }

        await setDoc(doc(db, "items", id), { ...item, ...updatedData });
        alert("Item updated.");
        newForm.reset();
        showTab("profile", document.querySelector(".tab-button[onclick*='profile']"));
        loadUserItems(uid);
      });
    });
  });
}

onAuthStateChanged(auth, async (user) => {
  if (user) {
    const userRef = doc(db, "users", user.uid);
    const userSnap = await getDoc(userRef);

    if (!userSnap.exists()) {
      await setDoc(userRef, {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName || "Anonymous",
        contact: "Not set",
        location: "Not set",
        photoURL: user.photoURL || "",
        createdAt: Date.now()
      });
    }

    const userData = (await getDoc(userRef)).data();
    profileContent.innerHTML = `
      <form id="profileForm" class="report-form">
        ${userData.photoURL ? `<img src="${userData.photoURL}" alt="Profile Picture" id="previewImage" style="width:100px; height:100px; border-radius:50%; margin-bottom:10px;">` : ""}
        <label for="newPhoto">Profile Picture</label>
        <input type="file" id="newPhoto" accept="image/*" />

        <label for="profileName">Name</label>
        <input type="text" id="profileName" value="${userData.displayName || ''}" required />

        <label for="profileEmail">Email</label>
        <input type="email" id="profileEmail" value="${userData.email}" readonly />

        <label for="profileContact">Contact</label>
        <input type="text" id="profileContact" value="${userData.contact || ''}" />

        <label for="profileLocation">Location</label>
        <input type="text" id="profileLocation" value="${userData.location || ''}" />

        <button type="submit">Save Changes</button>
      </form>
    `;

    document.getElementById("profileForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const saveBtn = document.querySelector("#profileForm button[type='submit']");
  saveBtn.disabled = true;
  saveBtn.textContent = "Saving changes...";

  const name = document.getElementById("profileName").value;
  const contact = document.getElementById("profileContact").value;
  const location = document.getElementById("profileLocation").value;
  const newPhotoFile = document.getElementById("newPhoto").files[0];

  let photoURL = userData.photoURL || "";
  if (newPhotoFile) {
    try {
      photoURL = await uploadImageToCloudinary(newPhotoFile);
    } catch (err) {
      alert("Image upload failed. Please try again.");
      saveBtn.disabled = false;
      saveBtn.textContent = "Save Changes";
      return;
    }
  }

  await setDoc(doc(db, "users", user.uid), {
    uid: user.uid,
    email: user.email,
    displayName: name,
    contact,
    location,
    photoURL,
    createdAt: userData.createdAt || Date.now()
  });

  alert("Profile updated successfully!");

  // Update the preview image if needed
  if (newPhotoFile && photoURL) {
    const previewImage = document.getElementById("previewImage");
    if (previewImage) {
      previewImage.src = photoURL;
    } else {
      const img = document.createElement("img");
      img.id = "previewImage";
      img.src = photoURL;
      img.alt = "Profile Picture";
      img.style.width = "100px";
      img.style.height = "100px";
      img.style.borderRadius = "50%";
      img.style.marginBottom = "10px";
      document.getElementById("profileForm").insertBefore(img, document.getElementById("newPhoto"));
    }
  }

  saveBtn.disabled = false;
  saveBtn.textContent = "Save Changes";
}, { once: true });


    await loadUserItems(user.uid);
  } else {
    profileContent.innerHTML = `<p>Please log in to view your profile.</p>`;
  }
});

const modal = document.getElementById("signOutModal");
const confirmBtn = document.getElementById("confirmLogout");
const cancelBtn = document.getElementById("cancelLogout");

document.querySelector('button[onclick*="signout"]').addEventListener("click", (e) => {
  e.preventDefault();
  modal.style.display = "flex";
});

confirmBtn.addEventListener("click", async () => {
  await signOut(auth);
  window.location.href = "index.html";
});

cancelBtn.addEventListener("click", () => {
  modal.style.display = "none";
  localStorage.setItem("activeTab", "home"); // Ensure future reloads go home
  showTab("home", document.querySelector(".tab-button:first-child"));
});


window.addEventListener('DOMContentLoaded', () => {
  const savedTab = localStorage.getItem('activeTab') || 'home';

  const tabButton = Array.from(document.querySelectorAll('.tab-button'))
    .find(btn => btn.textContent.toLowerCase().replace(/\s+/g, "") === savedTab);

  showTab(savedTab, tabButton);
});

// ✅ Global Cancel Button Handler (for both Report Lost and Found)
document.addEventListener("click", function (e) {
  if (e.target && e.target.classList.contains("cancel-btn")) {
    const form = e.target.closest("form");
    if (form) form.reset();

    const homeTabButton = Array.from(document.querySelectorAll(".tab-button"))
      .find(btn => btn.textContent.trim().toLowerCase() === "home");

    if (homeTabButton) {
      showTab("home", homeTabButton);
    }
  }
});


