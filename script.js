// TODO vars visibility

// TODO functions for creating in DOM tree elements depend of const completed/active

// TODO better way to identify status? mb with an integer?

//let domTaskList = document.querySelector("#task-list");

//const stored = localStorage.getItem("tasks");

function addTask(event) {
    // prevent page reboot
    event.preventDefault();

    // storing value from input
    let inputValue = document.querySelector("#task-input").value;

    let tasksList;
    let uuid = self.crypto.randomUUID();

    const active = 1;
    const completed = 0;
    const cards = {
        id: uuid,
        description: inputValue,
        status: active
    };

    const stored = localStorage.getItem("tasks");

    if (stored === null) {        
        tasksList = [];
    } else {
        tasksList = JSON.parse(stored);
    }

    tasksList.push(cards);
    
    let serializationList = JSON.stringify(tasksList);

    //adding data to localStorage
    localStorage.setItem("tasks", serializationList);
    
    // storing value from list
    let domTaskList = document.querySelector("#task-list");

    // adding the new value to the list
    let newEl = document.createElement("li");
    newEl.textContent = inputValue;

    domTaskList.appendChild(newEl);
}

// load tasks after page reboot 
function loadTasks() {
    const stored = localStorage.getItem("tasks");

    let parsedList = [];

    if (stored != null) {
       parsedList = JSON.parse(stored);
       let domTaskList = document.querySelector("#task-list");
       parsedList.forEach(element => {
            let newEl = document.createElement("li");
            newEl.textContent = element.description;
            domTaskList.appendChild(newEl);
       });
    }
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

    switch (clickedId) {
        case "all-btn":
            console.log("all");
            break;
        case "active-btn":
            console.log("active");
            break;
        case "completed-btn":
            console.log("completed");
            break;
        default:
            console.log("unknown")
    }
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