const priorityFilter = document.getElementById("priority-filter")
const statusFilter = document.getElementById("status-filter")
const tbody = document.getElementById("table-body")

document.addEventListener("DOMContentLoaded", () => {
    let deletedTask = JSON.parse(localStorage.getItem("deletedTask")) || [];
    createRow(deletedTask)
})

priorityFilter.addEventListener('change', () => {
    let deletedTask = JSON.parse(localStorage.getItem("deletedTask")) || [];
    let priority = priorityFilter.value;
    if(priority === ""){
        createRow(deletedTask)
    }else {
        let newTask = deletedTask.filter((task) => task.priority === priority)
        createRow(newTask)
    }
})

statusFilter.addEventListener("change", () => {
    let deletedTask = JSON.parse(localStorage.getItem("deletedTask")) || [];
    let status = statusFilter.value;
    if (status === "") {
      createRow(deletedTask);
    } else {
      let newTask = deletedTask.filter((task) => task.status === status);
      createRow(newTask);
    }
})

function createRow(tasks){
    tbody.innerHTML = null
    tasks.forEach((task) => {
        let tableRow = document.createElement("tr");
        tableRow.innerHTML = `
        <td>${task.title}</td>
        <td>${task.priority}</td>
        <td>${task.status}</td>
        <td><button onclick="restoreTask('${task.title}')" class="restore">Restore</button></td>
        <td><button onclick="deleteTask('${task.title}')" class="remove">Delete</button></td>
        `;
        tbody.append(tableRow); 
    });
    
}

function restoreTask(title){
    let delTasks = JSON.parse(localStorage.getItem("deletedTask")) || [];
    let tasks = JSON.parse(localStorage.getItem("tasks")) || []
    let resTask = delTasks.find((task) => task.title === title)
    console.log(resTask);
    tasks.push(resTask);
    localStorage.setItem("tasks", JSON.stringify(tasks));
    deleteTask(resTask.title);
}


function deleteTask(title){
    let delTasks = JSON.parse(localStorage.getItem('deletedTask')) || []
    delTasks = delTasks.filter((task) => task.title !== title)
    localStorage.setItem("deletedTask", JSON.stringify(delTasks))
    location.reload()
}