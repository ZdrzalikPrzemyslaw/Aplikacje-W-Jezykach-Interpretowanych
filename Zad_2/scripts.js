"use strict";
var todo_item = /** @class */ (function () {
    function todo_item(title, description, place, dueDate) {
        this.title = title;
        this.description = description;
        this.place = place;
        this.dueDate = dueDate;
    }
    return todo_item;
}());
var todoList = [];
var initList = function () {
    var savedList = window.localStorage.getItem("todos");
    if (savedList != null) {
        todoList = JSON.parse(savedList);
    }
    else {
        todoList.push(new todo_item("Learn JS", "Create a demo application for my TODO's", "445", new Date(2019, 10, 16)), new todo_item("Lecture Test", "Quick test from the first three lectures", "F6", new Date(2019, 10, 17)));
    }
};
initList();
var updateTodoList = function () {
    var deleteTodo = function (index) {
        todoList.splice(index, 1);
    };
    var todoListDiv = document.getElementById("todoListView");
    //remove all elements
    while (todoListDiv.firstChild) {
        todoListDiv.removeChild(todoListDiv.firstChild);
    }
    var filterInput = document.getElementById("inputSearch");
    // add all elements
    for (var todo in todoList) {
        if ((filterInput.value == "") || (todoList[todo].title.includes(filterInput.value)) || (todoList[todo].description.includes(filterInput.value))) {
            var newDeleteButton = document.createElement("input");
            newDeleteButton.type = "button";
            newDeleteButton.value = "x";
            newDeleteButton.addEventListener("click", function (index) {
                deleteTodo(index);
                updateTodoList();
            });
            var newElement = document.createElement("p");
            var newContent = document.createTextNode(todoList[todo].title + " " +
                todoList[todo].description);
            newElement.appendChild(newContent);
            todoListDiv.appendChild(newElement);
            newElement.appendChild(newDeleteButton);
        }
    }
};
var addTodo = function () {
    var inputTitle = document.getElementById("inputTitle").value;
    var inputDescription = document.getElementById("inputDescription").value;
    var inputPlace = document.getElementById("inputPlace").value;
    var inputDate = document.getElementById("inputDate").value;
    var newTodo = new todo_item(inputTitle, inputDescription, inputPlace, new Date(inputDate));
    todoList.push(newTodo);
    updateTodoList();
    window.localStorage.setItem("todos", JSON.stringify(todoList));
};
setInterval(updateTodoList, 1000);
