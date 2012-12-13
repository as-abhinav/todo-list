$(document).ready(function(){
	var Events = (function() {

		var addNewItem = function() {
			var todo_list = $('.todo-list'),	
				newItem = $('<li><div class="sidebar"><span class="uncheck"></span></div></li>'),

			prepareInputBox = function() {
				var inputBox = $('<input type="text">'),
					taskDiv = $('<div class="task"></div>'),
					itemId = todo_list.children().length + 1;

				inputBox.keyup(function(event) {
					if (event.keyCode === 13){
						var text = inputBox.val();
						taskDiv.empty();
						taskDiv.append('<span>' + text + '</span>');
					}	
				});
				inputBox.attr('itemId', itemId);
				taskDiv.append(inputBox);
				return taskDiv;	
			} 
			newItem.append(prepareInputBox());	
			todo_list.append(newItem);
		};

		return {
			bindEvents : function() {
				$('.list li').hover(function() {
					$(this).addClass('selected').siblings().removeClass();
				});

				$('.todo-list').on('click', '.sidebar .uncheck', function() {
					$(this).removeClass().addClass('check');
				});

				$('.todo-list').on('click', ' .sidebar .check', function(){
					$(this).removeClass().addClass('uncheck');
				});

				$('.add-new').on('click', addNewItem);
			}
		}
	})();
	

	Events.bindEvents();
});
