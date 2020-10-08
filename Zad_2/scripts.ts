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

let initList = function () {
    let savedList = window.localStorage.getItem("todos");
    if (savedList != null) {
        todoList = JSON.parse(savedList);
    }
    else {
        todoList.push(
            new todo_item("Learn JS", "Create a demo application for my TODO's", "445", new Date(2019, 10, 16)),
            new todo_item("Lecture Test", "Quick test from the first three lectures", "F6", new Date(2019, 10, 17))
        )
    }
}

initList();



let updateTodoList = function () {

    let deleteTodo = function (index) {
        todoList.splice(index, 1);
    }


    let todoListDiv =
        document.getElementById("todoListView");

    //remove all elements
    while (todoListDiv.firstChild) {
        todoListDiv.removeChild(todoListDiv.firstChild);
    }

    let filterInput = <HTMLInputElement>document.getElementById("inputSearch");

    // add all elements
    for (let todo in todoList) {
        if ((filterInput.value == "") || (todoList[todo].title.includes(filterInput.value)) || (todoList[todo].description.includes(filterInput.value))) {
            let newDeleteButton = document.createElement("input");
            newDeleteButton.type = "button";
            newDeleteButton.value = "x";
            newDeleteButton.addEventListener("click",
                function (index) {
                    deleteTodo(index);
                    updateTodoList();
                });
            let newElement = document.createElement("p");
            let newContent = document.createTextNode(todoList[todo].title + " " +
                todoList[todo].description);
            newElement.appendChild(newContent);
            todoListDiv.appendChild(newElement);
            newElement.appendChild(newDeleteButton);
        }


    }
}


let addTodo = function () {
    let inputTitle = (<HTMLInputElement>document.getElementById("inputTitle")).value;
    let inputDescription = (<HTMLInputElement>document.getElementById("inputDescription")).value;
    let inputPlace = (<HTMLInputElement>document.getElementById("inputPlace")).value;
    let inputDate = (<HTMLInputElement>document.getElementById("inputDate")).value;
    let newTodo: todo_item = new todo_item(inputTitle, inputDescription, inputPlace, new Date(inputDate));
    todoList.push(newTodo);
    updateTodoList();
    window.localStorage.setItem("todos", JSON.stringify(todoList));
}

setInterval(updateTodoList, 1000);
