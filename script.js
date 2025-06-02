function addTask(event) {
    // prevent page reboot
    event.preventDefault();

    // storing value from input
    let inputValue = document.querySelector("#task-input").value;

    let tasksList;
    const stored = localStorage.getItem("tasks");

    if (stored === null) {        
        tasksList = [];
    } else {
        tasksList = JSON.parse(stored);
    }

    tasksList.push(inputValue);
    
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
            newEl.textContent = element;
            domTaskList.appendChild(newEl);
       });
    }
}

function deleteTasks(event) {    
    localStorage.clear();
}

let form = document.querySelector("#task-form");
const deleteBtn = document.querySelector("#delete-btn");

form.addEventListener("submit", addTask);
deleteBtn.addEventListener("click", deleteTasks);
loadTasks();
