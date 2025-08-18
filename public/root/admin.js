// profile data helpers
function getProfileData() {
  return {
    pic: localStorage.getItem('profilePic') || "Assets/image.png",
    name: localStorage.getItem('profileName') || "Ms Irene",
    position: localStorage.getItem('profilePosition') || "Associates Technician",
    firstName: localStorage.getItem('profileFirstName') || "Irene Estelle",
    lastName: localStorage.getItem('profileLastName') || "Domingo",
    email: localStorage.getItem('profileEmail') || "irene@itcc.ph",
    phone: localStorage.getItem('profilePhone') || "+63 123 456 7898"
  };
}

function setProfileData(d) {
  Object.entries(d).forEach(([k, v]) => localStorage.setItem(k, v));
}

function updateSharedProfileBar() {
  const d = getProfileData();
  document.getElementById('sharedProfilePic').src = d.pic;
  document.getElementById('sharedProfileName').textContent = d.name;
  document.getElementById('sharedProfilePosition').textContent = d.position;
}

// Default content snippets
const dashboardContent = `
 <section class="dashboard-section">
    <div class="five-ecom-header">
      <h2>FIVE ECOM 9th FLOOR</h2>
    </div>
    <div class="five-ecom-map-container">
      <img src="Assets/Floormap.jpg" alt="Five Ecom Building" class="five-ecom-map"/>
    </div>
    <div class="five-ecom-address">
      <i class="fas fa-location-dot"></i>
      <p>9th floor, Five Ecom Center, Mall of Asia Complex, Harbor Drive, Pasay City 1300, Philippines</p>
    </div>
  </section>
`;

function getProfileContent() {
  const d = getProfileData();
  return `
    <section class="profile-section">
      <div class="profile-header">
        <label for="profilePicInput"><img id="profilePic" src="${d.pic}" class="image" style="cursor:pointer;"/></label>
        <input type="file" id="profilePicInput" accept="image/*" style="display:none;">
        <div><h2>${d.name}</h2><p>${d.position} <i class="fas fa-pen"></i></p></div>
      </div>
      <table class="info-table">
        <tr><th>First Name</th><th>Last Name</th></tr>
        <tr><td>${d.firstName}</td><td>${d.lastName}</td></tr>
        <tr><th>Email Address</th><th>Phone</th></tr>
        <tr><td>${d.email}</td><td>${d.phone}</td></tr>
      </table>
    </section>
  `;
}

function getSettingsContent() {
  const d = getProfileData();
  return `
        <button> Edit Profile </button> 
    <section class="settings-section">
      <h2>Edit Profile</h2>
      <form id="editProfileForm">
        <div><img id="editProfilePic" src="${d.pic}" class="shared-profile-pic" style="cursor:pointer;"></div>
        <input type="file" id="editProfilePicInput" accept="image/*" style="display:none;">
        <div><label>Name:</label><input type="text" id="editProfileName" value="${d.name}" required></div>
        <div><label>Position:</label><input type="text" id="editProfilePosition" value="${d.position}" required></div>
        <div><label>First Name:</label><input type="text" id="editProfileFirstName" value="${d.firstName}" required></div>
        <div><label>Last Name:</label><input type="text" id="editProfileLastName" value="${d.lastName}" required></div>
        <div><label>Email:</label><input type="email" id="editProfileEmail" value="${d.email}" required></div>
        <div><label>Phone:</label><input type="text" id="editProfilePhone" value="${d.phone}" required></div>
        <button type="submit">Save Changes</button>
        <div id="settingsMsg" style="color:green; margin-top:10px;"></div>
      </form>
    </section>
  `;
}

const gympassContent = `<div class="program-table">
 <h1>GYMPAS CS</h1>
 <br><br><button class="search">
  <i class="fas fa-search left-icon"></i>
  FILTER BY PORT
  <i class="fas fa-microphone right-icon"></i>
</button>
   <br><br><br><br>

      <div class="table-controls">
        <div>
          <button class="deployed"><i class="fas fa-file-export"></i> DEPLOYED</button>
          <button class="replacement"><i class="fas fa-file-export"></i> REPLACEMENT</button>
          <button class="edit"><i class="fas fa-file-export"></i> EDIT</button>
          <button class="add"><i class="fas fa-plus"></i> ADD </button>
          <button class="delete"><i class="fas fa-plus"></i> DELETE </button>
          <button class="export"><i class="fas fa-file-export"></i> EXPORT</button>
          
          
          

        </div>
      </div>
      <table>
        <thead>
          <tr>
            <th>PROGRAM</th>
            <th>PORT#</th>
            <th>CPU SN</th>
            <th>MODEL</th>
            <th>MONITOR#1-SN</th>
            <th>MODEL</th>
            <th>MONITOR#2-SN</th>
            <th>PREVIOUS</th>
            <th>LATEST</th>

          </tr>
        </thead>
        <tbody>
          <tr>
            <td>ABG</td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>


            <td>
            </td>
          </tr>
          <!-- Add more rows as needed -->
        </tbody>
      </table>
    </div>
  </section>`; 

const fashionPhileContent = `<div class="program-table">
 <h1>GYMPAS CS</h1>
 <br><br><button class="search">
  <i class="fas fa-search left-icon"></i>
  FILTER BY PORT
  <i class="fas fa-microphone right-icon"></i>
</button>
     <br><br><br><br>
      <div class="table-controls">
        <div>
          <button class="deployed"><i class="fas fa-file-export"></i> DEPLOYED</button>
          <button class="replacement"><i class="fas fa-file-export"></i> REPLACEMENT</button>
          <button class="edit"><i class="fas fa-file-export"></i> EDIT</button>
          <button class="add"><i class="fas fa-plus"></i> ADD </button>
          <button class="delete"><i class="fas fa-plus"></i> DELETE </button>
          <button class="export"><i class="fas fa-file-export"></i> EXPORT</button>
        </div>
      </div>
      <table>
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Customer</th>
            <th>Items</th>
            <th>Total</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>FP001</td>
            <td>Jane Smith</td>
            <td>T-shirt, Pants</td>
            <td>₱1,500</td>
            <td><span class="status pending">Pending</span></td>
            <td>
              <button class="btn-edit"><i class="fas fa-edit"></i></button>
              <button class="btn-delete"><i class="fas fa-trash"></i></button>
            </td>
          </tr>
          <!-- Add more rows as needed -->
        </tbody>
      </table>
    </div>
  </section>`;
const usersContent = ` <section class="users-section">
    <div class="users-header">
      <h2><i class="fas fa-users"></i> User Management</h2>
    </div>

    <div class="users-controls">
      <div class="search-filter">
        <input type="text" placeholder="Search users...">
        <select>
          <option value="">All Roles</option>
          <option value="admin">Admin</option>
          <option value="staff">Staff</option>
        </select>
      </div>
      <button class="add-user"><i class="fas fa-user-plus"></i> Add User</button>
    </div>

    <div class="users-grid">
      <div class="user-card">
        <img src="images/image.png" alt="User" class="user-avatar">
        <h3>John Doe</h3>
        <p class="role">Admin</p>
        <p class="email">john@example.com</p>
        <div class="user-actions">
          <button class="btn-edit"><i class="fas fa-edit"></i> Edit</button>
          <button class="btn-delete"><i class="fas fa-trash"></i> Delete</button>
        </div>
      </div>
      <!-- Add more user cards as needed -->
    </div>
  </section>`;

// SPA navigation & event binding
function loadContent(html, callback) {
  document.getElementById('mainContent').innerHTML = html;
  if (callback) callback();
}

function setActive(btn) {
  document.querySelectorAll('.nav button').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  localStorage.setItem('lastActivePage', btn.id);
  document.getElementById('programsMenu').style.display = 'none';
}

function rebindProfileEvents() {
  const profilePicInput = document.getElementById('profilePicInput');
  const profilePic = document.getElementById('profilePic');
  profilePic.src = getProfileData().pic;
  profilePic.onclick = () => profilePicInput.click();

  profilePicInput.onchange = function(e) {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = function(evt) {
      const cropperImage = document.getElementById('cropperImage');
      cropperImage.src = evt.target.result;
      const cropperModal = document.getElementById('cropperModal');
      cropperModal.style.display = 'flex';
      const cropper = new Cropper(cropperImage, {
        aspectRatio: 1,
        viewMode: 1,
        movable: true,
        zoomable: true,
        scalable: true,
        rotatable: true,
        responsive: true,
      });

      document.getElementById('cropBtn').onclick = function () {
        const canvas = cropper.getCroppedCanvas({ width: 200, height: 200, imageSmoothingQuality: 'high' });
        const dataUrl = canvas.toDataURL();
        let d = getProfileData();
        d.pic = dataUrl;
        setProfileData(d);
        updateSharedProfileBar();
        cropperModal.style.display = 'none';
        loadContent(getProfileContent(), rebindProfileEvents);
      };

      document.getElementById('cancelCropBtn').onclick = function () {
        cropper.destroy();
        cropperModal.style.display = 'none';
      };
    };
    reader.readAsDataURL(file);
  };
}

function rebindSettingsEvents() {
  const editProfilePic = document.getElementById('editProfilePic');
  const editProfilePicInput = document.getElementById('editProfilePicInput');
  const form = document.getElementById('editProfileForm');
  const msg = document.getElementById('settingsMsg');

  editProfilePic.onclick = () => editProfilePicInput.click();
  editProfilePicInput.onchange = function(e) {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = function(evt) {
      editProfilePic.src = evt.target.result;
      let d = getProfileData();
      d.pic = evt.target.result;
      setProfileData(d);
      updateSharedProfileBar();
    };
    reader.readAsDataURL(file);
  };

  form.onsubmit = function(e) {
    e.preventDefault();
    let d = getProfileData();
    d.name = document.getElementById('editProfileName').value;
    d.position = document.getElementById('editProfilePosition').value;
    d.firstName = document.getElementById('editProfileFirstName').value;
    d.lastName = document.getElementById('editProfileLastName').value;
    d.email = document.getElementById('editProfileEmail').value;
    d.phone = document.getElementById('editProfilePhone').value;
    setProfileData(d);
    updateSharedProfileBar();
    msg.textContent = "Profile updated!";
    loadContent(getProfileContent(), rebindProfileEvents);
  };
}

// Setup navigation buttons
function initNavigation() {
  document.getElementById('btnDashboard').onclick = () => { setActive(btnDashboard); loadContent(dashboardContent); };
  document.getElementById('btnProfile').onclick = () => { setActive(btnProfile); loadContent(getProfileContent(), rebindProfileEvents); };
  document.getElementById('btnSettings').onclick = () => { setActive(btnSettings); loadContent(getSettingsContent(), rebindSettingsEvents); };
  document.getElementById('btnPrograms').onclick = () => {
    const menu = document.getElementById('programsMenu');
    menu.style.display = (menu.style.display === 'block') ? 'none' : 'block';
  };
  document.getElementById('btnGympass').onclick = () => { setActive(btnGympass); loadContent(gympassContent); };
  document.getElementById('btnFashionPhile').onclick = () => { setActive(btnFashionPhile); loadContent(fashionPhileContent); };
  document.getElementById('btnUsers').onclick = () => { setActive(btnUsers); loadContent(usersContent); };
  document.addEventListener('click', e => {
    const dropdown = document.getElementById('programsMenu');
    const btn = document.getElementById('btnPrograms');
    if (!dropdown.contains(e.target) && e.target !== btn) dropdown.style.display = 'none';
  });
}

window.onload = function() {
  updateSharedProfileBar();
  initNavigation();
  const last = localStorage.getItem('lastActivePage') || 'btnDashboard';
  document.getElementById(last).click();
};
