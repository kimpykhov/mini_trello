// TODO vars visibility

// TODO functions for creating in DOM tree elements depend of const completed/active

// TODO better way to identify status? mb with an integer?

function getStoredTasks() {
    return JSON.parse(localStorage.getItem("tasks")) || [];
}

function setStoredTasks(tasks) {
    let serializationList = JSON.stringify(tasks);
    return localStorage.setItem("tasks", serializationList);
}


function getInputValue() {
    return document.querySelector("#task-input").value.trim();
}


function addTask(event) {
    // prevent page reboot
    event.preventDefault();

    // storing value from input
    // let inputValue = document.querySelector("#task-input").value;
    let inputValue = getInputValue();

    let tasksList;
    let uuid = self.crypto.randomUUID();

    const active = 1;
    const completed = 0;
    const cards = {
        id: uuid,
        description: inputValue,
        status: active
    };

    const tasks = getStoredTasks();

    tasks.push(cards);

    const setTasks = setStoredTasks(tasks);

    renderTask(cards);
}

// load tasks after page reboot 
function loadTasks() {
    const stored = getStoredTasks();

    if (stored != null) {
       let domTaskList = document.querySelector("#task-list");
       stored.forEach(element => {
            let newEl = document.createElement("li");
            newEl.textContent = element.description;
            domTaskList.appendChild(newEl);
       });
    } else {
        console.log("empty");
    }
    // TODO to add exception if user tries to load tasks on empty
}

// tasks removal
function deleteTasks(event) { 
    let tree = document.querySelectorAll("#task-list li");

    localStorage.clear();

    tree.forEach((element) => element.remove());
}

//filter tasks by typeof
function filterTasks(event) {
    
    const clickedId = event.target.id;
    const stored = getStoredTasks();

    switch (clickedId) {
        case "all-btn":            
            stored.forEach(task => {
                console.log("all");               
            });            
            break;
        case "active-btn":            
            stored.forEach(task => {
                if (task.status === 1) {
                    console.log("active");
                }
            })
            break;
        case "completed-btn":            
            stored.forEach(task => {
            if (task.status === 0) {
                console.log("completed");
            }
        })
        break;
        default:
            console.log("unknown")
    }
}

function renderTask(task) {
    const domTaskList = document.querySelector("#task-list");

    const newEl = document.createElement("li");
    newEl.textContent = task.description;

    if (task.status === 0) {
        newEl.classList.add("completed");
    }

    newEl.dataset.id = task.id;

    domTaskList.appendChild(newEl);
}

function renderTaskList(tasksArray) {
    const domTaskList = document.querySelector("#task-list");
    domTaskList.innerHTML = "";

    tasksArray.forEach(renderTask);
}

let form = document.querySelector("#task-form");

// buttons declaration
const deleteBtn = document.querySelector("#delete-btn");
const allBtn = document.querySelector("#all-btn");
const activeBtn = document.querySelector("#active-btn");
const completedBtn = document.querySelector("#completed-btn");

form.addEventListener("submit", addTask);
deleteBtn.addEventListener("click", deleteTasks);
allBtn.addEventListener("click", filterTasks);
activeBtn.addEventListener("click", filterTasks);
completedBtn.addEventListener("click", filterTasks);

loadTasks();