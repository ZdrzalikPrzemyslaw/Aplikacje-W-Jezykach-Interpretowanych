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
function initList() {
    todoList.push(new todo_item("Learn JS", "Create a demo application for my TODO's", "445", new Date(2019, 10, 16)), new todo_item("Lecture Test", "Quick test from the first three lectures", "F6", new Date(2019, 10, 17)));
}
initList();
var updateTodoList = function () {
    var todoListDiv = document.getElementById("todoListView");
    //remove all elements
    while (todoListDiv.firstChild) {
        todoListDiv.removeChild(todoListDiv.firstChild);
    }
    //add all elements
    for (var todo in todoList) {
        var newElement = document.createElement("div");
        var newContent = document.createTextNode(todoList[todo].title + " " + todoList[todo].description);
        newElement.appendChild(newContent);
        todoListDiv.appendChild(newElement);
    }
};
setInterval(updateTodoList, 1000);
