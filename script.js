function addTask(event) {
    // prevent page reboot
    event.preventDefault();

    // storing value from input
    let inputValue = document.querySelector("#task-input").value;
    
    // storing value from list
    let taskList = document.querySelector("#task-list");

    // adding the new value to the list
    let newEl = document.createElement("li");
    newEl.textContent = inputValue;
    
    taskList.appendChild(newEl);
}

let form = document.querySelector("#task-form");

form.addEventListener("submit", addTask);
