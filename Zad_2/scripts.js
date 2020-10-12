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
$.ajax({
    // copy Your bin identifier here. It can be obtained in the dashboard
    url: 'https://api.jsonbin.io/b/5f7f5a7365b18913fc5ccf2c/latest',
    type: 'GET',
    headers: {
        'secret-key': "$2b$10$NTKfR.Ut9Z8el6x6WakuV.yUvORzT5RI.w3yTnSLcHInw6elnEB3e"
    },
    success: function (data) {
        console.log(data);
        todoList = data;
    },
    error: function (err) {
        console.log(err.responseJSON);
    }
});
var updateJSONbin = function () {
    $.ajax({
        url: 'https://api.jsonbin.io/b/5f7f5a7365b18913fc5ccf2c',
        type: 'PUT',
        headers: {
            'secret-key': "$2b$10$NTKfR.Ut9Z8el6x6WakuV.yUvORzT5RI.w3yTnSLcHInw6elnEB3e",
            'versioning': "false"
        },
        contentType: 'application/json',
        data: JSON.stringify(todoList),
        success: function (data) {
            console.log(data);
        },
        error: function (err) {
            console.log(err.responseJSON);
        }
    });
};
var updateTodoList = function () {
    var deleteTodo = function (index) {
        todoList.splice(index, 1);
        updateTodoList();
        updateJSONbin();
    };
    var todoListDiv = document.getElementById("todoListView");
    //remove all elements
    while (todoListDiv.firstChild) {
        todoListDiv.removeChild(todoListDiv.firstChild);
    }
    var filterInput = document.getElementById("inputSearch");
    // add all elements
    var containing_table = document.createElement("table");
    containing_table.style.width = '100%';
    containing_table.setAttribute('border', '1');
    var tbdy = document.createElement('tbody');
    for (var todo in todoList) {
        if ((filterInput.value == "") || (todoList[todo].title.includes(filterInput.value)) || (todoList[todo].description.includes(filterInput.value))) {
            var tr = document.createElement('tr');
            var newDeleteButton = document.createElement("input");
            newDeleteButton.type = "button";
            newDeleteButton.value = "x";
            newDeleteButton.addEventListener("click", function (index) {
                deleteTodo(index);
            });
            for (var item in todoList[todo]) {
                var td = document.createElement('td');
                td.appendChild(document.createTextNode(item));
                tr.appendChild(td);
            }
            var td_delete_button = document.createElement('td');
            td_delete_button.appendChild(newDeleteButton);
            tr.appendChild(td_delete_button);
            tbdy.appendChild(tr);
        }
    }
    containing_table.appendChild(tbdy);
    if (tbdy.firstChild) {
        todoListDiv.appendChild(containing_table);
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
    updateJSONbin();
};
setInterval(updateTodoList, 1000);
