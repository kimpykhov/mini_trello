function addTask(event) {
    // prevent page reboot
    event.preventDefault();

    // storing value from input
    let inputValue = document.querySelector("#task-input").value;

    if (localStorage.length === 0) {
        let tasksList = [];
    } else {
        tasksList.push(inputValue);
    }

    
    let serializationList = JSON.stringify(tasksList);
    
    // storing value from list
    let taskList = document.querySelector("#task-list");

    // adding the new value to the list
    let newEl = document.createElement("li");
    newEl.textContent = inputValue;

    taskList.appendChild(newEl);

    //adding data to localStorage
    localStorage.setItem(1, serializationList);
}

let form = document.querySelector("#task-form");

form.addEventListener("submit", addTask);
