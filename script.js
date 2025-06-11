// TODO vars visibility

// TODO ID to identify in cards const?

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

    const active = 1;
    const completed = 0;
    const cards = {
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

function deleteTasks(event) {    
    event.preventDefault();

    let tree = document.querySelectorAll("#task-list li");

    localStorage.clear();

    tree.forEach((element) => element.remove());
}

let form = document.querySelector("#task-form");

const deleteBtn = document.querySelector("#delete-btn");

form.addEventListener("submit", addTask);
deleteBtn.addEventListener("click", deleteTasks);

loadTasks();