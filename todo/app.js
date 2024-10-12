// // Selectors
const addInput = document.querySelector("#todoName");
const form = document.querySelector("#todoAddForm");
const todoList = document.querySelector(".list-group");
const firstCardBody = document.querySelectorAll(".card-body")[0];
const secondCardBody = document.querySelectorAll(".card-body")[1];
const clearButton = document.querySelector("#clearButton");
const searchInput = document.querySelector("#todoSearch");

todos = [];
const todosParsed = JSON.parse(localStorage.getItem("todos"))

runEvents();

function runEvents() {
    form.addEventListener("submit", addTodo);
    clearButton.addEventListener("click", removeAllTodosFromUI);
    todoList.addEventListener("click", removeTodoFromUI)
    searchInput.addEventListener("keyup", searchTodos);
    document.addEventListener("DOMContentLoaded", reloadTodos)
}

function addTodo(e) {
    e.preventDefault();
    const inputText = addInput.value.trim();
    if (inputText == null || inputText == "") {
        showAlert("warning", "No text avaiable")
    } else {
        // UI adding
        addTodoToUI(inputText);
        // Straoge adding
        addTodoToStorage(inputText);
        showAlert("success", "Todo Added")
    }

}

function addTodoToUI(newtodo) {
    const li = document.createElement("li");
    li.className = "list-group-item d-flex justify-content-between";
    li.innerHTML = newtodo;

    const a = document.createElement("a");
    a.className = "delete-item";
    a.href = "#";

    const i = document.createElement("i");
    i.className = "fa fa-remove";
    a.appendChild(i);
    li.appendChild(a);
    todoList.appendChild(li);

    addInput.value = "";
}

function addTodoToStorage(newtodo) {
    checkTodosFromStorage();
    todos.push(newtodo)
    localStorage.setItem("todos", JSON.stringify(todos));
}

function checkTodosFromStorage() {
    if (localStorage.getItem("todos") === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
}

function showAlert(type, message) {
    const div = document.createElement("div");
    div.className = `alert alert-${type}`;
    div.innerHTML = message;

    firstCardBody.appendChild(div)

    setTimeout(removeAlert, 2 * 1000)

}

function removeAlert() {
    firstCardBody.removeChild(firstCardBody.lastElementChild);
}

function removeTodoFromUI(e) {
    e.preventDefault();
    checkTodosFromStorage()
    const deleteButton = e.target.closest(".delete-item");
    if (deleteButton) {
        const todoItem = deleteButton.parentElement; // Get the <li> element
        const todoText = todoItem.innerText.replace("✖", "").trim(); // Extract the todo text

        // Remove the todo item from the UI
        todoItem.remove();

        // Remove the todo from the storage
        todos = todos.filter(todo => todo !== todoText); // Update the todos array
        localStorage.setItem("todos", JSON.stringify(todos)); // Save the updated array to localStorage

        showAlert("success", "Todo Removed");
    }
}

function removeAllTodosFromUI() {

    if (todoList.innerHTML == null || todoList.innerHTML == "") {
        showAlert("warning", "There is no todo :(")
    } else {
        localStorage.removeItem("todos");
        todoList.innerHTML = "";
        showAlert("success", "All Todos are deleted");
    }
}

function reloadTodos() {

    checkTodosFromStorage()
    todosParsed.forEach(e => {
        addTodoToUI(e);
    });
}

function searchTodos() {
    const searchText = searchInput.value.toLowerCase();
    const todoItems = todoList.getElementsByTagName("li");

    console.log("Search Text:", searchText); // Debugging line

    Array.from(todoItems).forEach(item => {
        const itemText = item.innerText.toLowerCase();
        console.log("Item Text:", itemText); // Debugging line
        if (itemText.includes(searchText)) {
            item.style.setProperty("display","","important"); // Show the item
        } else {
            item.style.setProperty("display","none","important"); // Hide the item
        }
    });
}