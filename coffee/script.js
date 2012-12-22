(function() {

  $(document).ready(function() {
    var Events;
    Events = (function() {
      var addNewCategory, addNewItem, category_list, todo_list;
      category_list = $('#category-list');
      todo_list = $('.todo-list');
      addNewItem = function() {
        var createOptionsDiv, inputBox, itemId, newItem, prepareInputBox;
        itemId = $.now();
        newItem = $('<li><div class="sidebar"><span class="uncheck"></span></div></li>');
        inputBox = $('<input type="text">');
        prepareInputBox = function() {
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
          var closeDiv, editDiv, optionsDiv;
          editDiv = $('<span class="edit"></span>');
          closeDiv = $('<span class="close"></span>');
          optionsDiv = $('<span class="options"></div>');
          editDiv.attr('itemId', itemId);
          closeDiv.attr('itemId', itemId);
          editDiv.on('click', function(event) {});
          closeDiv.on('click', function(event) {});
          optionsDiv.append(editDiv);
          optionsDiv.append(closeDiv);
          return optionsDiv;
        };
        newItem.append(prepareInputBox());
        todo_list.append(newItem);
        return inputBox.focus();
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
      return {
        bindEvents: function() {
          category_list.on('hover', 'li', function(event) {
            return $(this).addClass('selected').siblings().removeClass();
          });
          todo_list.on('click', '.sidebar .uncheck', function(event) {
            return $(this).removeClass().addClass('check');
          });
          todo_list.on('click', '.sidebar .check', function(event) {
            return $(this).removeClass().addClass('uncheck');
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
