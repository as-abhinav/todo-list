var ToDoView = (function(){
	var instance,
	
	init = function(todoModel){
		todoModel.setCategories(JSON.parse(localStorage.getItem('ToDo'))|| {});
		var categoryList = $('#todoCategoryList'),
			todoList = $('#todolist'),

		getToDoList = function(e, data){
			return todoModel.getToDoList(data);
		},
		addNewCategory = function(categoryList, data){
			categoryList.append('<li><a href="#">'
				+ data.categoryName + '</a></li>');
			$('#todoCategoryList li:last').bind('categoryChanged', getToDoList);
		},
		renderToDoList = function(currentToDoList){
			var	todolist = $('#todolist');
			todolist.empty();
			for(var itemId in currentToDoList){
				renderItem(todolist,currentToDoList[itemId],itemId);
			}
			updateCount();
		},
		renderItem = function(listEl,data,itemId){
			var todoItemOptions = $('<div class="item-options"></div>'),
				deleteBtn = $('<a href="#" itemId="' + itemId + '" class="delete"></a>'),
				editBtn = $('<a href="#" itemId="' + itemId + '" class="edit"></a>'),
				doneBtn = $('<a href="#" itemId="' + itemId + '" class="todo-checkbox"></a>'),
				listItemEl = $('<li itemId="' + itemId + '"></li>');
			
			todoItemOptions.append(doneBtn);
			todoItemOptions.append(editBtn);
			todoItemOptions.append(deleteBtn);
			
			listItemEl.append('<p>' + data.title + '</p>');

			listItemEl.append(todoItemOptions);
			listEl.append(listItemEl);

			if(data.status){
				doneBtn.addClass('done');
				listItemEl.addClass('done');
			}

			deleteBtn.bind('removeFromModel', function(e, data) {
				todoModel.removeItem(data);
			});
			doneBtn.bind('changeStatus', function(e, data) {
				todoModel.toggleStatus(data);
			});
		},
		showErrorMessage = function(parentEl){
			$('.error-message').fadeIn().delay(1000).fadeOut();
		},

		bindEventHandlers = function(){
			var updateModel = function(e,data){
				return todoModel.updateModel(data);
			},
			validateEditElements = function(){
				$('#todolist li p.editable').removeClass('editable')
					.attr('contentEditable',false);			
				$('#todolist li .editDone').remove();
			},
			editTodoItem = function(event) {
				event.preventDefault();
				var itemId = parseInt($(this).attr('itemid')),
					thisTodoItem = $('#todolist li[itemId='+itemId+'] p');

				validateEditElements();

				thisTodoItem.addClass('editable').attr('contentEditable',true);
				$('<div class="editDone"><button>Done</button></div>').on('click',function(){
					todoModel.updateToDoItem({
						'itemId': itemId,
						'todoText' : thisTodoItem.text()
					});
					$(this).remove();
					thisTodoItem.removeClass('editable').attr('contentEditable',false);
				}).appendTo('#todolist li[itemId='+itemId+']');
				thisTodoItem.focus();
			};

			$('#todosubmit').bind('updateModel',updateModel);
			$('#todoListItemSubmit').bind('updateModel',updateModel);
			$('#todoCategoryList li').bind('categoryChanged',getToDoList);

			$('#todosubmit').on('click', function(event){
				event.preventDefault();
				var todoData = $('#tododata').val();
				if(!todoData){
					showErrorMessage($('#todoform'));
					return false;
				}

				var itemId = $(this).triggerHandler('updateModel',{
					category: categoryList.children('.selected').text(),
					todoItem: {'title':todoData,
								'status':false}
				});

				renderItem($('#todolist'),{
					'title':todoData
				},itemId);
				$('#tododata').val('');
				updateCount();
			});

			$('#todoCategoryList').on('click','li',function(e) {
				$('.selected').removeClass('selected');
				$(this).addClass('selected');
				var todoListData = $(this).triggerHandler('categoryChanged',{
						'currentCategoryName': $(this).text()
				});
				renderToDoList(todoListData);
			});

			$('#todoListItemSubmit').on('click', function(event) {
				event.preventDefault();
				var categoryName = $('#todoListItem').val();
				if(!categoryName) {
					return false;
				}
				addNewCategory(categoryList, {
					'categoryName': categoryName
				});

				$(this).triggerHandler('updateModel', {
					category: categoryName,
					todoItem: null
				});
				$('#todoListItem').val('');
				$('#todoCategoryList li').click();
				updateCount();
			});

			$('#todolist').on('click','.delete',function(event) {
				event.preventDefault();
				var itemId = parseInt($(this).attr('itemid'));
				$(this).triggerHandler('removeFromModel',itemId);
				$('#todolist li#' + itemId).remove();
				$('#todolist li[itemid='+itemId+']').remove();
				updateCount();
			});

			$('#todolist').on('click', '.todo-checkbox', function(event) {
				event.preventDefault();
				var itemId = parseInt($(this).attr('itemid'));
				$(this).triggerHandler('changeStatus', itemId);
				$(this).toggleClass('done');
				$('#todolist li[itemid=' + itemId+']').toggleClass('done');
			});

			$('#todolist').on('dblclick', 'li', editTodoItem);
			$('#todolist').on('click', '.edit', editTodoItem);

		},

		updateCount = function(){
			$('.count').text(todoModel.getCurrentCategory()+" : "+todoModel.getCount({'category':todoModel.getCurrentCategory()}));
		},
		renderInitialList = function(){
			var categories = todoModel.getCategories();
			for(category in categories){
				addNewCategory(categoryList ,{'categoryName' : category});
			}
			$('#todoCategoryList li:first').click();
		};

		bindEventHandlers();
		renderInitialList();
	};
	return {
		getInstance: function(){
			if(!instance){
				instance = init(new ToDoModel());
			}
			return instance;
		}
	}


})();