const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");

// Load tasks from localStorage
document.addEventListener("DOMContentLoaded", loadTasks);

addBtn.addEventListener("click", addTask);

function addTask() {
  const taskText = taskInput.value.trim();
  if (taskText === "") return;

  const task = {
    id: Date.now(),
    text: taskText,
    completed: false
  };

  saveTask(task);
  renderTask(task);

  taskInput.value = "";
}

function renderTask(task) {
  const li = document.createElement("li");
  li.setAttribute("data-id", task.id);
  li.textContent = task.text;

  if (task.completed) {
    li.classList.add("completed");
  }

  li.addEventListener("click", () => toggleTask(task.id));

  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "X";
  deleteBtn.classList.add("delete-btn");

  deleteBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    deleteTask(task.id);
  });

  li.appendChild(deleteBtn);
  taskList.appendChild(li);
}

function saveTask(task) {
  const tasks = getTasks();
  tasks.push(task);
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function getTasks() {
  return JSON.parse(localStorage.getItem("tasks")) || [];
}

function loadTasks() {
  const tasks = getTasks();
  tasks.forEach(renderTask);
}

function toggleTask(id) {
  let tasks = getTasks();
  tasks = tasks.map(task => {
    if (task.id === id) {
      task.completed = !task.completed;
    }
    return task;
  });

  localStorage.setItem("tasks", JSON.stringify(tasks));
  refreshUI();
}

function deleteTask(id) {
  let tasks = getTasks();
  tasks = tasks.filter(task => task.id !== id);

  localStorage.setItem("tasks", JSON.stringify(tasks));
  refreshUI();
}

function refreshUI() {
  taskList.innerHTML = "";
  loadTasks();
}