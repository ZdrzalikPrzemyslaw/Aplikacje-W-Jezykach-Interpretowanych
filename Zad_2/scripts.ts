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

$.ajax({
    // copy Your bin identifier here. It can be obtained in the dashboard
    url: 'https://api.jsonbin.io/b/5f7f5a7365b18913fc5ccf2c/latest',
    type: 'GET',
    headers: { //Required only if you are trying to access a private bin
        'secret-key': "$2b$10$NTKfR.Ut9Z8el6x6WakuV.yUvORzT5RI.w3yTnSLcHInw6elnEB3e"
    },
    success: (data) => {
        console.log(data)
        todoList = data;
    },
    error: (err) => {
        console.log(err.responseJSON);
    }
});

let updateJSONbin = function () {
    $.ajax({
        url: 'https://api.jsonbin.io/b/5f7f5a7365b18913fc5ccf2c',
        type: 'PUT',
        headers: { //Required only if you are trying to access a private bin
            'secret-key': "$2b$10$NTKfR.Ut9Z8el6x6WakuV.yUvORzT5RI.w3yTnSLcHInw6elnEB3e",
            'versioning': "false"
        },
        contentType: 'application/json',
        data: JSON.stringify(todoList),
        success: (data) => {
            console.log(data);
        },
        error: (err) => {
            console.log(err.responseJSON);
        }
    });
}

let updateTodoList = function () {

    let deleteTodo = function (index) {
        todoList.splice(index, 1);
        updateTodoList();
        updateJSONbin();
    }

    let todoListDiv =
        document.getElementById("todoListView");

    //remove all elements
    while (todoListDiv.firstChild) {
        todoListDiv.removeChild(todoListDiv.firstChild);
    }

    let filterInput = <HTMLInputElement>document.getElementById("inputSearch");

    // add all elements
    let containing_table = document.createElement("table");

    containing_table.className = "table";

    {
        let thead = document.createElement("thead");
        thead.className = "thead-dark";
        let tr = document.createElement("tr");
        for (let item in todoList[0]) {
            let theader = document.createElement('th');
            theader.appendChild(document.createTextNode(item));
            tr.appendChild(theader);
        }
        let title_header_remove = document.createElement('th');
        title_header_remove.appendChild(document.createTextNode("remove"));
        tr.appendChild(title_header_remove);
        thead.appendChild(tr);
        thead.className = "thead-dark";
        containing_table.appendChild(thead);
    }

    for (let todo in todoList) {
        if ((filterInput.value == "") || (todoList[todo].title.includes(filterInput.value)) || (todoList[todo].description.includes(filterInput.value))) {

            let tr = containing_table.insertRow();

            let newDeleteButton = document.createElement("input");
            newDeleteButton.type = "button";
            newDeleteButton.value = "x";
            newDeleteButton.addEventListener("click",
                function (index) {
                    deleteTodo(index);
                });


            for (let item in todoList[todo]) {
                let td_title = tr.insertCell();
                td_title.appendChild(document.createTextNode(todoList[todo][item]));
            }

            let td_delete_button = tr.insertCell();
            td_delete_button.appendChild(newDeleteButton);
        }
    }
    if (todoList.length != 0)
        todoListDiv.appendChild(containing_table);
}

let addTodo = function () {
    let inputTitle = (<HTMLInputElement>document.getElementById("inputTitle")).value;
    let inputDescription = (<HTMLInputElement>document.getElementById("inputDescription")).value;
    let inputPlace = (<HTMLInputElement>document.getElementById("inputPlace")).value;
    let inputDate = (<HTMLInputElement>document.getElementById("inputDate")).value;
    let newTodo: todo_item = new todo_item(inputTitle, inputDescription, inputPlace, new Date(inputDate));
    todoList.push(newTodo);
    updateTodoList();
    updateJSONbin();
}

setInterval(updateTodoList, 1000);
