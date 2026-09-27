const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");
const emptyMessage = document.getElementById("emptyMessage");

const totalTasks = document.getElementById("totalTasks");
const completedTasks = document.getElementById("completedTasks");
const pendingTasks = document.getElementById("pendingTasks");

const clearBtn = document.getElementById("clearBtn");

let tasks = [];

function updateStats() {
  const total = tasks.length;

  const completed = tasks.filter(
    task => task.completed
  ).length;

  const pending = total - completed;

  totalTasks.textContent = total;
  completedTasks.textContent = completed;
  pendingTasks.textContent = pending;
}

function displayTasks() {
  taskList.innerHTML = "";

  if (tasks.length === 0) {
    emptyMessage.style.display = "block";
    updateStats();
    return;
  }

  emptyMessage.style.display = "none";

  tasks.forEach(task => {

    const li = document.createElement("li");

    li.className = "task-item";

    if (task.completed) {
      li.classList.add("completed");
    }

    const checkbox = document.createElement("input");

    checkbox.type = "checkbox";
    checkbox.checked = task.completed;

    checkbox.addEventListener("change", () => {
      task.completed = checkbox.checked;
      displayTasks();
    });

    const text = document.createElement("span");

    text.className = "task-text";
    text.textContent = task.text;

    const deleteButton = document.createElement("button");

    deleteButton.className = "delete-btn";
    deleteButton.textContent = "Delete";

    deleteButton.addEventListener("click", () => {
      tasks = tasks.filter(item => item.id !== task.id);
      displayTasks();
    });

    li.appendChild(checkbox);
    li.appendChild(text);
    li.appendChild(deleteButton);

    taskList.appendChild(li);
  });

  updateStats();
}

function addTask() {
  const text = taskInput.value.trim();

  if (text === "") {
    alert("Please enter a task.");
    return;
  }

  const newTask = {
    id: Date.now(),
    text: text,
    completed: false
  };

  tasks.push(newTask);

  taskInput.value = "";

  displayTasks();
}

addTaskBtn.addEventListener("click", addTask);

taskInput.addEventListener("keydown", event => {
  if (event.key === "Enter") {
    addTask();
  }
});

clearBtn.addEventListener("click", () => {
  tasks = tasks.filter(task => !task.completed);

  displayTasks();
});

displayTasks();