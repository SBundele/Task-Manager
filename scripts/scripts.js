const taskBox = document.getElementById("task-box");
const priority = document.getElementById("status");
const addBtn = document.getElementById("addBtn");
const tBody = document.getElementById("table-body");

document.addEventListener("DOMContentLoaded", () => {
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.forEach((task) => {
    createRow(task)
  })
});

function createRow(task) {
  let tableRow = document.createElement("tr");
  let color = task.status === 'pending❌' ? "red" : task.status === 'in-progress' ? "orange" : "green"
  tableRow.innerHTML = `
        <td>${task.title}</td>
        <td>${task.priority}</td>
        <td><button onclick="changeStatus('${task.title}')" class="status" style="background-color: ${color}">${task.status}</button></td>
        <td><button onclick="removeTask('${task.title}')" class="remove">Remove</button></td>
        `;
  tBody.append(tableRow);
}

function changeStatus(title){
    let tasks = JSON.parse(localStorage.getItem("tasks")) || []
    tasks.forEach((task) => {
        if(task.title === title){
            task.status === "pending❌" ? task.status = "in-progress" : task.status === "in-progress" ? task.status = "completed" : null;
            
        }
    })
    localStorage.setItem("tasks",JSON.stringify(tasks))
    location.reload()
}

function removeTask(title){
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    let deletedTask = JSON.parse(localStorage.getItem("deletedTask")) || [];

    let delTask = tasks.find((task) => task.title == title)
    tasks = tasks.filter((task) => task.title !== title)
    deletedTask.push(delTask)

    localStorage.setItem("tasks", JSON.stringify(tasks))
    localStorage.setItem("deletedTask", JSON.stringify(deletedTask))

    location.reload()
}

addBtn.addEventListener('click', () => {
    let title = taskBox.value;
    let priorityStatus = priority.value;
    if(title.length <= 0){
        alert("Task cannot be empty!");
        return
    }
    let tasks = JSON.parse(localStorage.getItem("tasks")) || []

    tasks.push({title: title, priority: priorityStatus, status: "pending❌"})

    localStorage.setItem("tasks", JSON.stringify(tasks))

    location.reload()
})