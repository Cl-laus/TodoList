const taskInput = document.getElementById('taskInput');
const addButton = document.getElementById('addButton');
const taskListUl = document.getElementById('todoList');
const numbersText = document.getElementById('numbers');

let tasks = getTasks();
updateTasksList();
updateProgress();

function updateTasksList() {
  taskListUl.innerHTML = '';
  tasks.forEach((taskObj, index) => {
    taskItem = createTasksItem(taskObj, index);
    taskListUl.appendChild(taskItem);
  });
}

function deleteTask(index) {
  tasks.splice(index, 1);
  saveTasks();
  updateTasksList();
  updateProgress();
}

function editTask(index) {
  taskInput.value = tasks[index].text;
  tasks.splice(index, 1);
  updateTasksList();
}

function updateProgress() {
  const taskChecked = document.querySelectorAll(
    'input[type="checkbox"]:checked'
  ).length;
  const taskTotal = document.querySelectorAll('input[type="checkbox"]').length;
  const percent = (taskChecked / taskTotal) * 100;

  const progressBar = document.getElementById('progress');
  progressBar.style.width = percent + '%';

  numbersText.textContent = `${taskChecked}/${taskTotal}`;
}

function createTasksItem(taskObj, index) {
  const taskID = index;
  const taskLi = document.createElement('li');
  const taskText = taskObj.text;
  taskLi.className = 'todo';
  taskLi.innerHTML = `
    <input type="checkbox" id="${taskID}" />
          <label class="custom-checkbox" for="${taskID}">
            <svg
             fill ="transparent"
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 -960 960 960"
              width="24px"
              fill="#1f1f1f"
            >
              <path d="M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z" />
            </svg>
          </label>
          <label for="${taskID}" class="todo-text"> 
          ${taskText}
          </label>
          <button class="edit-button">
            <svg
              fill ="var(--secondary-color)"
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 -960 960 960"
              width="24px"
              fill="#1f1f1f"
            >
              <path
                d="M200-200h57l391-391-57-57-391 391v57Zm-80 80v-170l528-527q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L290-120H120Zm640-584-56-56 56 56Zm-141 85-28-29 57 57-29-28Z"
              />
            </svg>
          </button>
          <button class="delete-button">
            <svg
              fill="var(--secondary-color)"
              xmlns="http://www.w3.org/2000/svg"
              height="24"
              viewBox="0 -960 960 960"
              width="24"
            >
              <path
                d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"
              />
            </svg>
          </button>
  `;

  //
  const checkbox = taskLi.querySelector('input');
  checkbox.addEventListener('change', () => {
    tasks[taskID].completed = checkbox.checked;
    saveTasks();
    updateProgress();
  });

  //mets à jour la checkbox quand on reload la page
  checkbox.checked = taskObj.completed;
 

  // recupere les boutons
  const deleteButton = taskLi.querySelector('.delete-button');
  const editButton = taskLi.querySelector('.edit-button');

  deleteButton.addEventListener('click', () => {
    deleteTask(index);
  });

  editButton.addEventListener('click', () => {
    editTask(index);
  });

  return taskLi;
}

function addTask() {
  const taskText = taskInput.value.trim();
  const taskObj = {
    text: taskText,
    completed: false,
  };

  if (taskText) {
    tasks.push(taskObj);
    taskInput.value = '';

    updateTasksList();
    saveTasks();
    updateProgress();
  }
}

addButton.addEventListener('click', function (event) {
  event.preventDefault();

  addTask();
});

function saveTasks() {
  const tasksJSON = JSON.stringify(tasks);
  localStorage.setItem('tasks', tasksJSON);
}

function getTasks() {
  const tasks = localStorage.getItem('tasks') || '[]';
  return JSON.parse(tasks);
}
