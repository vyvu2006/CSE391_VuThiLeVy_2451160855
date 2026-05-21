const todoInput = document.querySelector("#todoInput");
const addBtn = document.querySelector("#addBtn");
const todoList = document.querySelector("#todoList");
const count = document.querySelector("#count");
const clearCompletedBtn = document.querySelector("#clearCompleted");

const filterButtons = document.querySelectorAll(".filter-btn");

let todos = JSON.parse(localStorage.getItem("todos")) || [];

let currentFilter = "all";

renderTodos();

// Add todo
function addTodo() {
  const text = todoInput.value.trim();

  if (text === "") return;

  todos.push({
    id: Date.now(),
    text,
    completed: false,
  });

  todoInput.value = "";

  saveTodos();
  renderTodos();
}

addBtn.addEventListener("click", addTodo);

todoInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    addTodo();
  }
});

// Render
function renderTodos() {
  todoList.innerHTML = "";

  let filteredTodos = todos;

  if (currentFilter === "active") {
    filteredTodos = todos.filter((todo) => !todo.completed);
  }

  if (currentFilter === "completed") {
    filteredTodos = todos.filter((todo) => todo.completed);
  }

  filteredTodos.forEach((todo) => {
    const li = document.createElement("li");
    li.className = "todo-item";
    li.dataset.id = todo.id;

    const span = document.createElement("span");

    span.className = "todo-text";
    span.textContent = todo.text;

    if (todo.completed) {
      span.classList.add("completed");
    }

    const deleteBtn = document.createElement("button");

    deleteBtn.textContent = "❌";
    deleteBtn.className = "delete-btn";

    li.appendChild(span);
    li.appendChild(deleteBtn);

    todoList.appendChild(li);
  });

  updateCount();
}

// Event Delegation
todoList.addEventListener("click", (e) => {
  const li = e.target.closest("li");

  if (!li) return;

  const id = Number(li.dataset.id);

  // Delete
  if (e.target.classList.contains("delete-btn")) {
    todos = todos.filter((todo) => todo.id !== id);

    saveTodos();
    renderTodos();
  }

  // Toggle completed
  if (e.target.classList.contains("todo-text")) {
    const todo = todos.find((todo) => todo.id === id);

    todo.completed = !todo.completed;

    saveTodos();
    renderTodos();
  }
});

// Edit todo
todoList.addEventListener("dblclick", (e) => {
  if (!e.target.classList.contains("todo-text")) return;

  const span = e.target;
  const li = span.closest("li");
  const id = Number(li.dataset.id);

  const input = document.createElement("input");

  input.type = "text";
  input.value = span.textContent;

  li.replaceChild(input, span);

  input.focus();

  input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      const todo = todos.find((todo) => todo.id === id);

      todo.text = input.value.trim();

      saveTodos();
      renderTodos();
    }
  });
});

// Filter
filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    filterButtons.forEach((btn) => btn.classList.remove("active"));

    button.classList.add("active");

    currentFilter = button.dataset.filter;

    renderTodos();
  });
});

// Clear completed
clearCompletedBtn.addEventListener("click", () => {
  todos = todos.filter((todo) => !todo.completed);

  saveTodos();
  renderTodos();
});

// Count
function updateCount() {
  const activeTodos = todos.filter((todo) => !todo.completed).length;

  count.textContent = `${activeTodos} items left`;
}

// Save localStorage
function saveTodos() {
  localStorage.setItem("todos", JSON.stringify(todos));
}
