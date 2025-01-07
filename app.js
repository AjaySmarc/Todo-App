let addTaskBtn = document.getElementById('add-task-btn');
let taskInput = document.getElementById('task-input');
let taskList = document.getElementById('task-list');
let taskCount = document.getElementById('task-count');
let taskId = 0; // For unique task IDs


// Function to update the task count
function updateTaskCount() {
    let totalTasks = document.querySelectorAll('li').length;
    taskCount.innerText = `Total Tasks: ${totalTasks}`;
}

// Function to create a new task item
function createTaskItem(taskText) {
    let li = document.createElement('li');
    li.setAttribute('id', `task-${taskId++}`);
    li.innerHTML = `
        <input type="checkbox" class="tick-box" />
        <span class="task-text">${taskText}</span>
        <span class="timer">00:00</span>
        <div>
            <button class="edit">Edit</button>
            <button class="delete">Delete</button>
        </div>
    `;
    taskList.appendChild(li);

    let tickBox = li.querySelector('.tick-box');
    let editBtn = li.querySelector('.edit');
    let deleteBtn = li.querySelector('.delete');
    let timerElement = li.querySelector('.timer');

    // Start timer when task is added
    let startTime = Date.now();
    setInterval(function() {
        if (!tickBox.checked) {
            let elapsed = Math.floor((Date.now() - startTime) / 1000);
            let minutes = String(Math.floor(elapsed / 60)).padStart(2, '0');
            let seconds = String(elapsed % 60).padStart(2, '0');
            timerElement.innerText = `${minutes}:${seconds}`;
        }
    }, 1000);

    // Handle Task Completion (Tick Box)
    tickBox.addEventListener('change', function () {
        if (tickBox.checked) {
            li.querySelector('.task-text').classList.add('completed');
        } else {
            li.querySelector('.task-text').classList.remove('completed');
        }
    });

    // Edit Task
    editBtn.addEventListener('click', function () {
        let taskText = li.querySelector('.task-text');
        let newTaskText = prompt('Edit Task:', taskText.innerText);
        if (newTaskText) {
            taskText.innerText = newTaskText;
        }
    });

    // Delete Task
    deleteBtn.addEventListener('click', function () {
        li.remove();
        updateTaskCount();
    });

    updateTaskCount();
}

// Add Task Button Functionality
addTaskBtn.addEventListener('click', function () {
    let taskText = taskInput.value.trim();
    if (taskText) {
        createTaskItem(taskText);
        taskInput.value = ''; // Clear input field
    } else {
        alert('Please enter a task.');
    }
});

// Add Task on Enter Key Press
taskInput.addEventListener('keydown', function (e) {
    if (e.key === 'Enter') {
        let taskText = taskInput.value.trim();
        if (taskText) {
            createTaskItem(taskText);
            taskInput.value = ''; // Clear input field
        } else {
            alert('Please enter a task.');
        }
    }
});
