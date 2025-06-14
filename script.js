let todos = JSON.parse(localStorage.getItem("todos")) || [];

function saveToLocalStorage() {
  localStorage.setItem("todos", JSON.stringify(todos));
}

function renderTodos() {
  const list = document.getElementById("todo-list");
  list.innerHTML = "";

  todos.forEach((todo, index) => {
    const li = document.createElement("li");

    const span = document.createElement("span");
    span.textContent = todo;

    const input = document.createElement("input");
    input.type = "text";
    input.value = todo;
    input.style.display = "none";
    input.classList.add("edit-input");

    input.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        const newValue = input.value.trim();
        if (newValue !== "") {
          todos[index] = newValue;
          saveToLocalStorage();
          renderTodos();
        }
      }
    });

    const actions = document.createElement("div");
    actions.className = "actions";

    const editBtn = document.createElement("button");
    editBtn.textContent = "✏️";
    editBtn.className = "edit";
    editBtn.onclick = () => {
      span.style.display = "none";
      input.style.display = "inline-block";
      input.focus();
    };

    const delBtn = document.createElement("button");
    delBtn.textContent = "🗑️";
    delBtn.onclick = () => deleteTodo(index);

    actions.appendChild(editBtn);
    actions.appendChild(delBtn);

    li.appendChild(span);
    li.appendChild(input);
    li.appendChild(actions);
    list.appendChild(li);
  });
}

function addTodo() {
  const input = document.getElementById("todo-input");
  const value = input.value.trim();
  if (value) {
    todos.push(value);
    input.value = "";
    saveToLocalStorage();
    renderTodos();
  }
}

function deleteTodo(index) {
  todos.splice(index, 1);
  saveToLocalStorage();
  renderTodos();
}

renderTodos();
