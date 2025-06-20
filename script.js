// TODO vars visibility

// TODO functions for creating in DOM tree elements depend of const completed/active

// TODO better way to identify status? mb with an integer?

function getStoredTasks() {
    return JSON.parse(localStorage.getItem("tasks")) || [];
}

function setStoredTasks(tasks) {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function getInputValue() {
    return document.querySelector("#task-input").value.trim();
}

function objectForStorage(description) {
    return {
        id: self.crypto.randomUUID(),
        description,
        status: STATUS.ACTIVE
    };
};

const STATUS = Object.freeze({
    ACTIVE: 1,
    COMPLETED: 0
});

function addTask(event) {
    // prevent page reboot
    event.preventDefault();

    // storing value from input
    let inputValue = getInputValue();

    let tasksList;
    
    const newTasks = objectForStorage(inputValue);

    const tasks = getStoredTasks();

    tasks.push(newTasks);

    const setTasks = setStoredTasks(tasks);

    renderTask(newTasks);

    document.querySelector("#task-input").value = "";
}

const domTaskList = document.querySelector("#task-list");

// load tasks after page reboot 
function loadTasks() {
    const stored = getStoredTasks();

    if (stored != null) {       
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
                loadTasks();              
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
    const newEl = document.createElement("li");
    newEl.textContent = task.description;

    if (task.status === 0) {
        newEl.classList.add("completed");
    }

    newEl.dataset.id = task.id;

    domTaskList.appendChild(newEl);
}

function renderTaskList(tasksArray) {    
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