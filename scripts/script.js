$(document).ready(function() {
	var Events = (function() {

		var category_list = $('#category-list'),
			todo_list = $('.todo-list'),

		addNewItem = function() {
			var itemId = $.now(),
				newItem = $('<li><div class="sidebar"><span class="uncheck"></span></div></li>'),
				inputBox = $('<input type="text">'),

			prepareInputBox = function() {
				var taskDiv = $('<div class="task"></div>');

				inputBox.keyup(function(event) {
					if (event.keyCode === 13) {
						var text = inputBox.val();
						taskDiv.empty();
						taskDiv.append('<span>' + text + '</span>');
						newItem.append(createOptionsDiv());		
					}	
				});
				newItem.attr('itemId', itemId);
				taskDiv.append(inputBox);
				return taskDiv;	
			},
			createOptionsDiv = function() {
				var editDiv = $('<span class="edit"></span>'),
					closeDiv = $('<span class="close"></span>'),
					optionsDiv = $('<div class="options"></div>');

				editDiv.attr('itemId', itemId);
				closeDiv.attr('itemId', itemId);
				editDiv.click(function() {
					console.log($(this).attr('itemId'));
				});
				closeDiv.click(function() {
					console.log($(this).attr('itemId'));
				});

				optionsDiv.append(editDiv);
				optionsDiv.append(closeDiv);
				return optionsDiv;
			};

			newItem.append(prepareInputBox());
			todo_list.append(newItem);
			inputBox.focus();
		},
		addNewCategory = function(event) {
			if(event.keyCode === 13) {

				var newCategoryName = $(this).val().charAt(0).toUpperCase() + $(this).val().slice(1),
					newCategory = $('<li>' + newCategoryName + '</li>');
				category_list.append(newCategory);
				$(this).val('');
			}
		};

		return {
			bindEvents : function() {
				category_list.on('hover', 'li', function() {
					$(this).addClass('selected').siblings().removeClass();
				});

				$('.todo-list').on('click', '.sidebar .uncheck', function() {
					$(this).removeClass().addClass('check');
				});

				$('.todo-list').on('click', '.sidebar .check', function(){
					$(this).removeClass().addClass('uncheck');
				});

				$('.list-container .add-category input').focus(function() {
					$(this).addClass('adding');
					$(this).attr('placeholder', '');
				});

				$('.list-container .add-category input').blur(function(){ 
					$(this).removeClass('adding');
					$(this).attr('placeholder', 'Create New List...');
				});

				$('.list-container .add-category input').keyup(addNewCategory);

				$('.add-new').on('click', addNewItem);
			}
		}
	})();
	

	Events.bindEvents();
});
