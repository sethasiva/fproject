
// =====================
// TASK DATA
// =====================
let tasks = [];
let filter = "all";


// LOAD DATA
window.onload = () => {
  const saved = localStorage.getItem("tasks");
  if (saved) {
    tasks = JSON.parse(saved);
  }
  renderTasks();
};


// SAVE DATA
function save() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}


// =====================
// ADD TASK
// =====================
function addTask() {
  const input = document.getElementById("taskInput");
  const text = input.value.trim();

  if (text === "") return;

  tasks.push({
    id: Date.now(),
    text: text,
    completed: false
  });

  input.value = "";
  save();
  renderTasks();
}


// =====================
// TOGGLE DONE / UNDO
// =====================
function toggleTask(id) {
  tasks = tasks.map(task => {
    if (task.id === id) {
      task.completed = !task.completed;
    }
    return task;
  });

  save();
  renderTasks();
}


// =====================
// DELETE TASK
// =====================
function deleteTask(id) {
  tasks = tasks.filter(task => task.id !== id);
  save();
  renderTasks();
}


// =====================
// EDIT TASK
// =====================
function editTask(task) {
  const newText = prompt("Edit task:", task.text);

  if (newText) {
    task.text = newText;
    save();
    renderTasks();
  }
}


// =====================
// FILTER + ACTIVE BUTTON
// =====================
function setFilter(type) {
  filter = type;

  document.querySelectorAll(".filters button").forEach(btn => {
    btn.classList.remove("active");
  });

  const activeBtn = document.querySelector(`[data-filter="${type}"]`);
  if (activeBtn) activeBtn.classList.add("active");

  renderTasks();
}


// =====================
// RENDER TASKS
// =====================
function renderTasks() {
  const list = document.getElementById("taskList");
  list.innerHTML = "";

  let filtered = tasks;

  if (filter === "pending") {
    filtered = tasks.filter(t => !t.completed);
  }

  if (filter === "completed") {
    filtered = tasks.filter(t => t.completed);
  }

  filtered.forEach(task => {

    const li = document.createElement("li");

    if (task.completed) {
      li.classList.add("completed");
    }

    // TEXT
    const span = document.createElement("span");
    span.textContent = task.text;
    span.onclick = () => toggleTask(task.id);

    // ACTIONS
    const actions = document.createElement("div");
    actions.classList.add("actions");

    // DONE (pending only)
    if (!task.completed) {
      const doneBtn = document.createElement("button");
      doneBtn.textContent = "Done";
      doneBtn.classList.add("done");
      doneBtn.onclick = () => toggleTask(task.id);
      actions.appendChild(doneBtn);
    }

    // UNDO (completed only)
    if (task.completed) {
      const undoBtn = document.createElement("button");
      undoBtn.textContent = "Undo";
      undoBtn.classList.add("undo");
      undoBtn.onclick = () => toggleTask(task.id);
      actions.appendChild(undoBtn);
    }

    // EDIT (only pending)
    if (!task.completed) {
      const editBtn = document.createElement("button");
      editBtn.textContent = "Edit";
      editBtn.classList.add("edit");
      editBtn.onclick = () => editTask(task);
      actions.appendChild(editBtn);
    }

    // DELETE (always)
    const delBtn = document.createElement("button");
    delBtn.textContent = "Delete";
    delBtn.classList.add("delete");
    delBtn.onclick = () => deleteTask(task.id);

    actions.appendChild(delBtn);

    li.appendChild(span);
    li.appendChild(actions);

    list.appendChild(li);
  });
}