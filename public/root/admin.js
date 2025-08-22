function getTodayDateTime() {
  const now = new Date();
  return now.toLocaleString(); 
}

function loadProfile() {
  const profileData = JSON.parse(localStorage.getItem('profileData') || '{}');

  if (profileData.name) document.getElementById('profileName').value = profileData.name;
  if (profileData.email) document.getElementById('profileEmail').value = profileData.email;
  if (profileData.phone) document.getElementById('profilePhone').value = profileData.phone;
  if (profileData.position) document.getElementById('profilePosition').value = profileData.position;
  if (profileData.pic) {
    document.getElementById('profilePic').src = profileData.pic;
  } else {
    document.getElementById('profilePic').src = 'default.png';
  }

  document.getElementById('uploadPic').addEventListener('change', function(e) {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = function(e) {
      document.getElementById('profilePic').src = e.target.result;
    };
    reader.readAsDataURL(file);
  });
  document.getElementById('saveProfile').addEventListener('click', saveProfile);
}

function saveProfile() {
  const profileData = {
    name: document.getElementById('profileName').value,
    email: document.getElementById('profileEmail').value,
    phone: document.getElementById('profilePhone').value,
    position: document.getElementById('profilePosition').value,
    pic: document.getElementById('profilePic').src
  };

  localStorage.setItem('profileData', JSON.stringify(profileData));
  let users = JSON.parse(localStorage.getItem('usersData') || "[]");
  const existingIndex = users.findIndex(u => u.email === profileData.email);
  if (existingIndex >= 0) {
    users[existingIndex] = profileData;
  } else {
    users.push(profileData);
  }
  localStorage.setItem('usersData', JSON.stringify(users));

  alert("Profile saved!");
}

function loadUsers() {
  const users = JSON.parse(localStorage.getItem('usersData') || "[]");
  const tbody = document.querySelector('#usersTable tbody');
  tbody.innerHTML = "";
  users.forEach(user => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td><img src="${user.pic}" width="50" alt="User Pic"></td>
      <td>${user.name}</td>
      <td>${user.email}</td>
      <td>${user.phone}</td>
      <td>${user.position}</td>
    `;
    tbody.appendChild(row);
  });
}

function saveTableData(programKey) {
  const rows = document.querySelectorAll('.program-table tbody tr');
  const data = Array.from(rows).map(row => Array.from(row.children).map(cell => cell.textContent));
  localStorage.setItem(programKey, JSON.stringify(data));
}

function loadTableData(programKey) {
  const table = document.querySelector('.program-table tbody');
  const data = JSON.parse(localStorage.getItem(programKey) || "[]");
  table.innerHTML = "";
  data.forEach(rowData => {
    const row = document.createElement('tr');
    row.innerHTML = rowData.map(cell => `<td>${cell}</td>`).join('');
    table.appendChild(row);
  });

  enableRowSelection();
}

function enableRowSelection() {
  document.querySelectorAll('.program-table tbody tr').forEach(row => {
    row.onclick = function () {
      this.classList.toggle('selected');
      this.style.backgroundColor = this.classList.contains('selected') ? '#ffe6e6' : '';
    };
  });
}

const gympassContent = `
  <div class="program-table"> 
    <h1>GYMPASS CS</h1>
    <div class="search-box" style="margin: 30px 0;">
      <i class="fas fa-search left-icon"></i>
      <input type="text" id="searchInputGympass" placeholder="FILTER BY PORT">
    </div>

    <div class="table-controls">
      <div class="left-controls">
        <button class="deployed"><i class="fas fa-server"></i> DEPLOYED</button>
        <button class="replacement"><i class="fas fa-file"></i> REPLACEMENT</button>
        <button class="edit"><i class="fas fa-edit"></i> EDIT</button>
        <button class="add"><i class="fas fa-plus"></i> ADD</button>
        <button class="delete"><i class="fas fa-trash"></i> DELETE</button>
      </div>
      <div class="right-controls">
        <button class="export"><i class="fas fa-download"></i> EXPORT</button>
      </div>
    </div>
    
    <table border="1">
      <thead>
        <tr>
          <th>PROGRAM</th>
          <th>PORT</th>
          <th>CPU SN</th>
          <th>CPU MODEL</th>
          <th>MONITOR-1 SN</th>
          <th>MONITOR-1 MODEL</th>
          <th>MONITOR-2 SN</th>
          <th>MONITOR-2 MODEL</th>
          <th>STATUS</th>
        </tr>
      </thead>
      <tbody></tbody>
    </table>
  </div>
`;

const fashionPhileContent = gympassContent
  .replace("GYMPASS CS", "FASHION PHILE")
  .replace("searchInputGympass", "searchInputFashion");


  function rebindProgramEvents() {
  const isGympass = document.querySelector('h1')?.textContent.includes("GYMPASS");
  const storageKey = isGympass ? "gympassTableData" : "fashionTableData";

  loadTableData(storageKey);

  document.querySelectorAll('.add').forEach(btn => {
    btn.onclick = () => {
      const table = btn.closest('.program-table').querySelector('tbody');
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${prompt("PROGRAM") || ''}</td>
        <td>${prompt("PORT") || ''}</td>
        <td>${prompt("CPU SN") || ''}</td>
        <td>${prompt("CPU MODEL") || ''}</td>
        <td>${prompt("MONITOR-1 SN") || ''}</td>
        <td>${prompt("MONITOR-1 MODEL") || ''}</td>
        <td>${prompt("MONITOR-2 SN") || ''}</td>
        <td>${prompt("MONITOR-2 MODEL") || ''}</td>
        <td>DEPLOYED - ${getTodayDateTime()}</td>
      `;
      table.appendChild(row);
      enableRowSelection();
      saveTableData(storageKey);
    };
  });


  document.querySelectorAll('.delete').forEach(btn => {
    btn.onclick = () => {
      const table = btn.closest('.program-table').querySelector('tbody');
      const selectedRows = table.querySelectorAll('tr.selected');
      if (selectedRows.length === 0) {
        alert("Please select rows to delete.");
        return;
      }
      if (!confirm(`Are you sure you want to delete ${selectedRows.length} row(s)?`)) return;
      selectedRows.forEach(row => row.remove());
      saveTableData(storageKey);
    };
  });

  document.querySelectorAll('.edit').forEach(btn => {
    btn.onclick = () => {
      const table = btn.closest('.program-table').querySelector('tbody');
      const isEditing = btn.classList.contains('editing');

      if (!isEditing) {
        previousTableData = Array.from(table.rows).map(row => Array.from(row.cells).map(cell => cell.textContent));
        table.querySelectorAll('td').forEach(cell => {
          if (cell.cellIndex !== 8) {
            cell.setAttribute('contenteditable', true);
            cell.style.backgroundColor = '#fff7e6';
          }
        });
        btn.textContent = "SAVE";
      } else {
        const now = getTodayDateTime();
        Array.from(table.rows).forEach((row, rowIndex) => {
          const newRowData = Array.from(row.cells).map(cell => cell.textContent);
          const oldRowData = previousTableData[rowIndex] || [];
          let isReplacement = false;
          for (let i = 1; i <= 6; i++) {
            if (newRowData[i] !== oldRowData[i]) isReplacement = true;
          }
          if (isReplacement) row.cells[8].textContent = `REPLACEMENT - ${now}`;
        });
        table.querySelectorAll('td').forEach(cell => {
          cell.removeAttribute('contenteditable');
          cell.style.backgroundColor = '';
        });
        btn.textContent = "EDIT";
        saveTableData(storageKey);
      }
      btn.classList.toggle('editing');
    };
  });


  document.querySelectorAll('.deployed').forEach(btn => {
  btn.onclick = () => {
    document.querySelectorAll('.program-table tbody tr').forEach(row => {
      const status = row.children[8]?.textContent || "";
      row.style.display = status.includes("DEPLOYED") ? '' : 'none';
    });
  };
});

document.querySelectorAll('.replacement').forEach(btn => {
  btn.onclick = () => {
    document.querySelectorAll('.program-table tbody tr').forEach(row => {
      const status = row.children[8]?.textContent || "";
      row.style.display = status.includes("REPLACEMENT") ? '' : 'none';
    });
  };
});


  document.getElementById('searchInputGympass')?.addEventListener('input', function () {
    const val = this.value.toLowerCase();
    document.querySelectorAll('.program-table tbody tr').forEach(row => {
      const program = row.children[0]?.textContent.toLowerCase() || "";
      const port = row.children[1]?.textContent.toLowerCase() || "";
      row.style.display = (program.includes(val) || port.includes(val)) ? '' : 'none';
    });
  });

  document.getElementById('searchInputFashion')?.addEventListener('input', function () {
    const val = this.value.toLowerCase();
    document.querySelectorAll('.program-table tbody tr').forEach(row => {
      const program = row.children[0]?.textContent.toLowerCase() || "";
      const port = row.children[1]?.textContent.toLowerCase() || "";
      row.style.display = (program.includes(val) || port.includes(val)) ? '' : 'none';
    });
  });
}

let currentUserRole = "user";

const dashboardContent = `
   <h1>FIVE ECOM 9th FLOOR</h1>
<div style="margin-top:20px; justify-content: center; text-align: center; font-size:50px; font-weight:bold;">
    <p>Level 9 Five Ecom Center, Mall of Asia Complex, Harbor Drive, Pasay City 1300, Phillippines</p>
    <iframe 
      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3859.97475675724!2d121.05626947413406!3d14.60044587843924!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3397b7b7a8f5fef7%3A0x9d5a6ed5e90c2f75!2sManila%2C%20Philippines!5e0!3m2!1sen!2sph!4v1690000000000!5m2!1sen!2sph" 
      width="100%" height="300" style="border:0;" allowfullscreen="" loading="lazy">
    </iframe>
  </div>
`;

const profileContent = `
  <div class="profile-container">
    <h1>Profile</h1>
    <table class="profile-table">
      <tr>
        <td rowspan="4">
          <img id="profilePic" src="default.png" alt="Profile Picture" width="120">
          <input type="file" id="uploadPic">
        </td>
        <td>Name:</td>
        <td><input type="text" id="profileName"></td>
      </tr>
      <tr>
        <td>Email:</td>
        <td><input type="email" id="profileEmail"></td>
      </tr>
      <tr>
        <td>Phone:</td>
        <td><input type="text" id="profilePhone"></td>
      </tr>
      <tr>
        <td>Position:</td>
        <td><input type="text" id="profilePosition"></td>
      </tr>
    </table>
    <button id="saveProfile">Save</button>
  </div>
`;

const usersManagementContent = `
  <div class="users-container">
    <h1>Users</h1>
    <table id="usersTable">
      <thead>
        <tr>
          <th>Picture</th>
          <th>Name</th>
          <th>Email</th>
          <th>Phone</th>
          <th>Position</th>
        </tr>
      </thead>
      <tbody></tbody>
    </table>
  </div>
`;

function loadContent(html, callback) {
  document.getElementById('mainContent').innerHTML = html;
  if (callback) callback();
}

function initNavigation() {
  document.getElementById('btnDashboard')?.addEventListener('click', () => {
    loadContent(dashboardContent);
  });

  document.getElementById('btnProfile')?.addEventListener('click', () => {
    loadContent(profileContent, loadProfile);
  });

  document.getElementById('btnUsers')?.addEventListener('click', () => {
    if (currentUserRole === "admin") {
      loadContent(usersManagementContent, loadUsers);
    } else {
      alert("Only admins can access Users.");
    }
  });

  document.getElementById('btnGympass')?.addEventListener('click', () => {
    loadContent(gympassContent, rebindProgramEvents);
  });

  document.getElementById('btnFashionPhile')?.addEventListener('click', () => {
    loadContent(fashionPhileContent, rebindProgramEvents);
  });

  document.getElementById('btnPrograms')?.addEventListener('click', () => {
    const menu = document.getElementById('programsMenu');
    if (menu) menu.style.display = menu.style.display === 'none' ? 'block' : 'none';
  });

  document.getElementById("btnSettings")?.addEventListener("click", function () {
    const menu = document.getElementById("settingsMenu");
    menu.style.display = menu.style.display === "block" ? "none" : "block";
  });

  document.querySelector('.logout')?.addEventListener('click', function () {
    localStorage.removeItem('userRole'); 
    localStorage.removeItem('loggedIn'); 
    window.location.href = 'index.html';
  });
}
window.onload = function () {
  initNavigation();
  document.getElementById('btnDashboard')?.click();
};
