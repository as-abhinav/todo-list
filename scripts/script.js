(function() {

  $(document).ready(function() {
    var Events;
    Events = (function() {
      var addNewCategory, addNewItem, category_list, editToDo, removeToDo, todo_list, toggleStatus;
      category_list = $('#category-list');
      todo_list = $('.todo-list');
      addNewItem = function() {
        var createInputBox, createOptionsDiv, createSidebar, inputBox, itemId, newItem;
        itemId = $.now();
        newItem = $('<li></li>');
        inputBox = $('<input type="text">');
        createInputBox = function() {
          var taskDiv;
          taskDiv = $('<div class="task"></div>');
          inputBox.on('keyup', function(event) {
            var text;
            if (event.keyCode === 13) {
              text = inputBox.val();
              taskDiv.empty();
              taskDiv.append('<span>' + text + '</span>');
              return newItem.append(createOptionsDiv());
            }
          });
          newItem.attr('itemId', itemId);
          taskDiv.append(inputBox);
          return taskDiv;
        };
        createOptionsDiv = function() {
          var editDiv, optionsDiv, removeDiv;
          editDiv = $('<span class="edit"></span>');
          removeDiv = $('<span class="remove"></span>');
          optionsDiv = $('<span class="options"></div>');
          editDiv.attr('itemId', itemId);
          removeDiv.attr('itemId', itemId);
          editDiv.on('click', editToDo);
          removeDiv.on('click', removeToDo);
          optionsDiv.append(editDiv);
          optionsDiv.append(removeDiv);
          return optionsDiv;
        };
        createSidebar = function() {
          var checkbox, sidebarDiv;
          sidebarDiv = $('<div class="sidebar"></div>');
          checkbox = $('<span class="uncheck"></span>');
          checkbox.attr('itemId', itemId);
          sidebarDiv.append(checkbox);
          return sidebarDiv;
        };
        newItem.append(createSidebar());
        newItem.append(createInputBox());
        todo_list.append(newItem);
        return inputBox.focus();
      };
      editToDo = function(event) {
        var inputBox, itemData, itemId, taskDiv;
        itemId = $(this).attr('itemId');
        taskDiv = todo_list.children('[itemId=' + itemId + ']').children('.task');
        itemData = taskDiv.children('span').text();
        taskDiv.empty();
        inputBox = $('<input type="text" value="' + itemData + '" />');
        inputBox.on('keyup', function(event) {
          var text;
          if (event.keyCode === 13) {
            text = inputBox.val();
            taskDiv.empty();
            return taskDiv.append('<span>' + text + '</span>');
          }
        });
        return taskDiv.append(inputBox);
      };
      removeToDo = function(event) {
        var itemId, liEle;
        itemId = $(this).attr('itemId');
        liEle = todo_list.children('[itemId=' + itemId + ']');
        return liEle.remove();
      };
      addNewCategory = function(event) {
        var newCategory, newCategoryName;
        if (event.keyCode === 13) {
          newCategoryName = $(this).val().charAt(0).toUpperCase() + $(this).val().slice(1);
          newCategory = $('<li>' + newCategoryName + '</li>');
          category_list.append(newCategory);
          return $(this).val('');
        }
      };
      toggleStatus = function(itemId) {
        var itemSpan;
        console.log(itemId);
        itemSpan = todo_list.children('[itemId=' + itemId + ']').children('.task').children('span');
        return itemSpan.toggleClass('completed');
      };
      return {
        bindEvents: function() {
          category_list.on('hover', 'li', function(event) {
            return $(this).addClass('selected').siblings().removeClass();
          });
          todo_list.on('click', '.sidebar .uncheck', function(event) {
            $(this).removeClass().addClass('check');
            return toggleStatus($(this).attr('itemId'));
          });
          todo_list.on('click', '.sidebar .check', function(event) {
            $(this).removeClass().addClass('uncheck');
            return toggleStatus($(this).attr('itemId'));
          });
          $('.list-container .add-category').on('focus', 'input', function(event) {
            $(this).addClass('adding');
            return $(this).attr('placeholder', '');
          });
          $('.list-container .add-category').on('blur', 'input', function(event) {
            $(this).removeClass('adding');
            return $(this).attr('placeholder', 'Create New List...');
          });
          $('.list-container .add-category').on('keyup', 'input', addNewCategory);
          return $('.add-new').on('click', addNewItem);
        }
      };
    })();
    return Events.bindEvents();
  });

}).call(this);
