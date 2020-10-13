"use strict";

var todo_item =
/** @class */
function () {
  function todo_item(title, description, place, dueDate) {
    this.title = title;
    this.description = description;
    this.place = place;
    this.dueDate = dueDate;
  }

  return todo_item;
}();

var todoList = [];
$.ajax({
  // copy Your bin identifier here. It can be obtained in the dashboard
  url: 'https://api.jsonbin.io/b/5f7f5a7365b18913fc5ccf2c/latest',
  type: 'GET',
  headers: {
    'secret-key': "$2b$10$NTKfR.Ut9Z8el6x6WakuV.yUvORzT5RI.w3yTnSLcHInw6elnEB3e"
  },
  success: function success(data) {
    console.log(data);
    todoList = data;
  },
  error: function error(err) {
    console.log(err.responseJSON);
  }
});

var updateJSONbin = function updateJSONbin() {
  $.ajax({
    url: 'https://api.jsonbin.io/b/5f7f5a7365b18913fc5ccf2c',
    type: 'PUT',
    headers: {
      'secret-key': "$2b$10$NTKfR.Ut9Z8el6x6WakuV.yUvORzT5RI.w3yTnSLcHInw6elnEB3e",
      'versioning': "false"
    },
    contentType: 'application/json',
    data: JSON.stringify(todoList),
    success: function success(data) {
      console.log(data);
    },
    error: function error(err) {
      console.log(err.responseJSON);
    }
  });
};

var updateTodoList = function updateTodoList() {
  var deleteTodo = function deleteTodo(index) {
    todoList.splice(index, 1);
    updateTodoList();
    updateJSONbin();
  };

  var todoListDiv = document.getElementById("todoListView"); //remove all elements

  while (todoListDiv.firstChild) {
    todoListDiv.removeChild(todoListDiv.firstChild);
  }

  var filterInputDesc = document.getElementById("inputSearch");
  var filterInputDate1 = document.getElementById("inputSearchDate1");
  var filterInputDate2 = document.getElementById("inputSearchDate2");
  var dateStart = new Date(filterInputDate1.value);
  var dateEnd = new Date(filterInputDate2.value); // add all elements

  var containing_table = document.createElement("table");
  containing_table.className = "table";
  {
    var thead = document.createElement("thead");
    thead.className = "thead-dark";
    var tr = document.createElement("tr");

    for (var item in todoList[0]) {
      var theader = document.createElement('th');
      theader.appendChild(document.createTextNode(item));
      tr.appendChild(theader);
    }

    var title_header_remove = document.createElement('th');
    title_header_remove.appendChild(document.createTextNode("remove"));
    tr.appendChild(title_header_remove);
    thead.appendChild(tr);
    thead.className = "thead-dark";
    containing_table.appendChild(thead);
  }

  var _loop_1 = function _loop_1(todo) {
    if (filterInputDesc.value == "" || todoList[todo].title.includes(filterInputDesc.value) || todoList[todo].description.includes(filterInputDesc.value)) {
      if (filterInputDate1.value == "" && filterInputDate2.value == "" || dateStart <= new Date(todoList[todo].dueDate) && filterInputDate2.value == "" || dateEnd >= new Date(todoList[todo].dueDate) && filterInputDate1.value == "" || dateEnd >= new Date(todoList[todo].dueDate) && dateStart <= new Date(todoList[todo].dueDate)) {
        var tr = containing_table.insertRow();
        var newDeleteButton = document.createElement("input");
        newDeleteButton.type = "button";
        newDeleteButton.value = "x";
        newDeleteButton.addEventListener("click", function () {
          deleteTodo(todoList.indexOf(todo));
        });

        for (var item in todoList[todo]) {
          var td_title = tr.insertCell();
          td_title.appendChild(document.createTextNode(todoList[todo][item]));
        }

        var td_delete_button = tr.insertCell();
        td_delete_button.appendChild(newDeleteButton);
      }
    }
  };

  for (var todo in todoList) {
    _loop_1(todo);
  }

  if (todoList.length != 0) todoListDiv.appendChild(containing_table);
};

var addTodo = function addTodo() {
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