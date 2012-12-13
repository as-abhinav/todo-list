$(document).ready(function(){
	var Events = (function() {
		var addNewItem = function() {
			var todo_list = $('.todo-list'),	
				newItem = $('<li><div class="sidebar"><span class="uncheck"></span></div></li>');

			newItem.append('<div class="task"><span class="editable" contentEditable="true"></span></div>')	
			todo_list.append(newItem);
		};

		return {
			bindEvents : function() {
				$('.list li').hover(function() {
					$(this).addClass('selected');
					$(this).siblings().removeClass();
				});

				$('.sidebar').on('click', '.uncheck', function() {
					$(this).removeClass();
					$(this).addClass('check');
				});

				$('.sidebar').on('click', '.check', function(){
					$(this).removeClass();
					$(this).addClass('uncheck');
				});

				$('.add-new').on('click', addNewItem);
			}
		}
	})();
	

	Events.bindEvents();
});
