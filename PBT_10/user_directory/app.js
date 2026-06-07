const API_URL = "https://jsonplaceholder.typicode.com";

let users = [];
let editingId = null;

const userList = document.getElementById("userList");

const loading = document.getElementById("loading");

const userForm = document.getElementById("userForm");

const searchInput = document.getElementById("searchInput");

const nameInput = document.getElementById("name");

const emailInput = document.getElementById("email");

// =====================
// API LAYER
// =====================

const api = {
  baseURL: API_URL,

  async getUsers() {
    const response = await fetch(`${this.baseURL}/users`);

    if (!response.ok) throw new Error("Load users failed");

    return await response.json();
  },

  async getUser(id) {
    const response = await fetch(`${this.baseURL}/users/${id}`);

    if (!response.ok) throw new Error("User not found");

    return await response.json();
  },

  async createUser(data) {
    const response = await fetch(`${this.baseURL}/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) throw new Error("Create failed");

    return await response.json();
  },

  async updateUser(id, data) {
    const response = await fetch(`${this.baseURL}/users/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) throw new Error("Update failed");

    return await response.json();
  },

  async deleteUser(id) {
    const response = await fetch(`${this.baseURL}/users/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) throw new Error("Delete failed");

    return true;
  },
};

// =====================
// UI LAYER
// =====================

const ui = {
  renderUsers(users) {
    userList.innerHTML = "";

    users.forEach((user) => {
      const div = document.createElement("div");

      div.className = "user-card";

      div.innerHTML = `
                <h3>${user.name}</h3>
                <p>${user.email}</p>

                <div class="actions">
                    <button
                        class="edit-btn"
                        onclick="editUser(${user.id})">
                        Edit
                    </button>

                    <button
                        class="delete-btn"
                        onclick="deleteUser(${user.id})">
                        Delete
                    </button>
                </div>
            `;

      userList.appendChild(div);
    });
  },

  showLoading() {
    loading.classList.remove("hidden");
  },

  hideLoading() {
    loading.classList.add("hidden");
  },

  showError(message) {
    alert("❌ " + message);
  },

  showSuccess(message) {
    alert("✅ " + message);
  },
};

// =====================
// READ
// =====================

async function loadUsers() {
  ui.showLoading();

  try {
    users = await api.getUsers();

    ui.renderUsers(users);
  } catch (error) {
    ui.showError(error.message);
  } finally {
    ui.hideLoading();
  }
}

// =====================
// CREATE + UPDATE
// =====================

userForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const userData = {
    name: nameInput.value,
    email: emailInput.value,
  };

  try {
    // UPDATE
    if (editingId) {
      const updated = await api.updateUser(editingId, userData);

      users = users.map((user) =>
        user.id === editingId
          ? {
              ...user,
              ...updated,
            }
          : user,
      );

      ui.showSuccess("Cập nhật user thành công");

      editingId = null;
    } else {
      // CREATE
      const newUser = await api.createUser(userData);

      users.unshift({
        ...newUser,
        id: Date.now(),
      });

      ui.showSuccess("Thêm user thành công");
    }

    ui.renderUsers(users);

    userForm.reset();
  } catch (error) {
    ui.showError(error.message);
  }
});

// =====================
// EDIT
// =====================

async function editUser(id) {
  try {
    const user = await api.getUser(id);

    nameInput.value = user.name;

    emailInput.value = user.email;

    editingId = id;
  } catch (error) {
    ui.showError(error.message);
  }
}

// =====================
// DELETE
// =====================

async function deleteUser(id) {
  const confirmDelete = confirm("Bạn chắc chắn muốn xóa?");

  if (!confirmDelete) return;

  try {
    await api.deleteUser(id);

    users = users.filter((user) => user.id !== id);

    ui.renderUsers(users);

    ui.showSuccess("Xóa user thành công");
  } catch (error) {
    ui.showError(error.message);
  }
}

// =====================
// SEARCH
// =====================

searchInput.addEventListener("input", (e) => {
  const keyword = e.target.value.toLowerCase();

  const filtered = users.filter(
    (user) =>
      user.name.toLowerCase().includes(keyword) ||
      user.email.toLowerCase().includes(keyword),
  );

  ui.renderUsers(filtered);
});

// Load data khi mở app
loadUsers();
