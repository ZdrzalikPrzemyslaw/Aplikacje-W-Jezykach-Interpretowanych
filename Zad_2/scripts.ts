"use strict"
class todo_item {
    title: string;
    description: string;
    place: string;
    dueDate: Date;

    constructor(title: string, description: string, place: string, dueDate: Date) {
        this.title = title;
        this.description = description;
        this.place = place;
        this.dueDate = dueDate;
    }
}

let todoList = []

let initList = function() {
    todoList.push(
        new todo_item("Learn JS", "Create a demo application for my TODO's", "445", new Date(2019,10,16)),
        new todo_item("Lecture Test", "Quick test from the first three lectures", "F6", new Date(2019,10,17))
        )
}

initList();

let updateTodoList = function() {
    let todoListDiv =
    document.getElementById("todoListView");

    //remove all elements
    while (todoListDiv.firstChild) {
        todoListDiv.removeChild(todoListDiv.firstChild);
    }

    //add all elements
    for (let todo in todoList) {
        let newElement = document.createElement("div");
        let newContent = document.createTextNode(
            todoList[todo].title + " " + todoList[todo].description);
        newElement.appendChild(newContent);
        todoListDiv.appendChild(newElement);
    }
}

let addTodo = function() {
    let inputTitle = (<HTMLInputElement>document.getElementById("inputTitle")).value;
    let inputDescription = (<HTMLInputElement>document.getElementById("inputDescription")).value;
    let inputPlace = (<HTMLInputElement>document.getElementById("inputPlace")).value;
    let inputDate = (<HTMLInputElement>document.getElementById("inputDate")).value;
    let newTodo: todo_item = new todo_item(inputTitle, inputDescription, inputPlace, new Date(inputDate));
    todoList.push(newTodo);
}

setInterval(updateTodoList, 1000);
