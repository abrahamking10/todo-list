const newTask = document.getElementById('create_task')
const addTask = document.getElementById('addTask')
const modal = document.getElementById('modal')
const inputBox = document.getElementById('inputBox')
const taskContainer = document.getElementById('taskContainer')

let placeholderOptions = ["Wash Dishes",
    "Take Out Trash",
    "Clean Garbage",
    "Mow Lawn"];

function addNoTasksCreated() {
    let newH3 = document.createElement('h3');
    newH3.innerText = "No tasks created. Click the plus button to add one :)";
    newH3.classList.add('noTasksCreated');
    taskContainer.appendChild(newH3);
}

function removeNoTasksCreated() {
    let noTasksCreated = document.querySelector('.noTasksCreated');
    noTasksCreated.remove()
}

function updateTaskCount() {
    const taskCount = document.querySelectorAll('.task').length;
    console.log("Number of tasks:", taskCount);
    if (taskCount == 0){
        addNoTasksCreated();
    }
}

function removeTask(targetTask) {
    targetTask.remove()
    updateTaskCount();
}

function openPopup() {
    console.log("Opening Popup")
    modal.classList.add("openModal")

    let randomTask = placeholderOptions[Math.floor(Math.random() * placeholderOptions.length)];
    inputBox.placeholder = randomTask;
}

function closePopup() {
    console.log("Closing Popup")
    modal.classList.remove("openModal")
}

//Handles everything and assigns the task.
function assignTask() {
    if (inputBox.value == '') {
        window.alert("You must write something")
    }
    else {
        removeNoTasksCreated();
        const taskDiv = document.createElement("div");
        const taskTitle = document.createElement("h2");
        const taskDelete = document.createElement("button");
        const taskImage = document.createElement("img");
        
        //TASK DIV
        taskContainer.appendChild(taskDiv);
        taskDiv.classList.add("task");

        //TASK TITLE
        taskTitle.textContent = inputBox.value;
        taskDiv.appendChild(taskTitle);

        //TASK BUTTON
        taskDelete.classList.add("delete");
        taskDiv.appendChild(taskDelete);

        //TASK IMAGE
        taskImage.src = "Images/Icons/trash-x.png";
        taskDelete.appendChild(taskImage);

        inputBox.value = "";
        
        updateTaskCount();
        closePopup();

        //Delete the task
        taskDelete.addEventListener("click", () => {
            removeTask(taskDiv);
        });
    }
}

//Allows you to add a task using the enter key.
document.addEventListener("keydown", function(event) {
  if (event.key === "Enter" && modal.classList.contains('openModal')) {
    assignTask();
  }
});

//Close popup once they click off
modal.addEventListener("click", (e) => {
    if (e.target === modal) {
        closePopup();
    }
});