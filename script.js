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

let form = document.querySelector("#task-form");

form.addEventListener("submit", addTask);
