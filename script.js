// Get the necessary elements
var addBtn = document.getElementById("add-button");
var todoInput = document.getElementById("todo-input");
var todoList = document.getElementById("todo-list");
var taskCount = document.getElementById("task-count");
var completeAllBtn = document.getElementById("complete-all-btn");
var clearCompletedBtn = document.getElementById("clear-completed-btn");

// Function to update the task count
function updateTaskCount() {
  var count = todoList.querySelectorAll("li:not(.done)").length;
  taskCount.textContent = count + (count === 1 ? " task" : " tasks") + " left";
}

// Function to toggle the task status
function toggleTaskStatus() {
  var listItem = this.parentNode;
  listItem.classList.toggle("done");

  var taskText = listItem.querySelector(".task-text");
  var isTaskDone = listItem.classList.contains("done");

  if (isTaskDone) {
    taskText.style.textDecoration = "line-through";
    this.textContent = "Undone";
  } else {
    taskText.style.textDecoration = "none";
    this.textContent = "Done";
  }

  updateTaskCount();
}

// Function to mark all tasks as done
function completeAllTasks() {
  var listItems = todoList.children;

  for (var i = 0; i < listItems.length; i++) {
    var listItem = listItems[i];
    listItem.classList.add("done");

    var taskText = listItem.querySelector(".task-text");
    taskText.style.textDecoration = "line-through";

    // Update the individual "Done" button to "Undone"
    var doneBtn = listItem.querySelector("button");
    doneBtn.textContent = "Undone";
  }

  updateTaskCount();
}

// Function to delete a task
function deleteTask() {
  var listItem = this.parentNode;
  listItem.remove();

  updateTaskCount();
}

// Function to add a task
function addTask() {
  // Get the task value from the input
  var taskText = todoInput.value;

  // Create a new list item
  var listItem = document.createElement("li");

  // Create the task text span
  var taskTextSpan = document.createElement("span");
  taskTextSpan.className = "task-text";
  taskTextSpan.textContent = taskText;

  // Create the done button
  var doneBtn = document.createElement("button");
   var checkImg = document.createElement("img");
  checkImg.src = "./assets/check-mark.png";
  checkImg.alt = "tick";
  doneBtn.appendChild(checkImg);
  doneBtn.addEventListener("click", toggleTaskStatus);

  // Create the delete button with an image
  var deleteBtn = document.createElement("button");
  var deleteImg = document.createElement("img");
  deleteImg.src = "./assets/cancel.png";
  deleteImg.alt = "Cancel";
  deleteBtn.appendChild(deleteImg);
  deleteBtn.addEventListener("click", deleteTask);

  // Append the elements to the list item
  listItem.appendChild(taskTextSpan);
  listItem.appendChild(doneBtn);
  listItem.appendChild(deleteBtn);

  // Append the new task to the todo list
  todoList.appendChild(listItem);

  // Clear the input field after adding the task
  todoInput.value = "";

  // Update the task count
  updateTaskCount();
}

// Event listener for the add button
addBtn.addEventListener("click", function (e) {
  e.preventDefault();
  addTask();
});

// Event listener for the complete all button
completeAllBtn.addEventListener("click", completeAllTasks);

// Event listener for the clear completed button
clearCompletedBtn.addEventListener("click", function () {
  var listItems = todoList.getElementsByClassName("done");
  for (var i = listItems.length - 1; i >= 0; i--) {
    var listItem = listItems[i];
    listItem.remove();
  }

  updateTaskCount();
});
