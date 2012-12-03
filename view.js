var ToDoView = function(ToDoModel){
	var categoryList = $('#todoCategoryList'),
		todoList = $('#todolist'),

	getToDoList = function(e, data){
		return ToDoModel.getToDoList(data);
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

		deleteBtn.bind('removeFromModel', function(e,data){
			ToDoModel.removeItem(data);
		});
		doneBtn.bind('changeStatus', function(e, data){
			ToDoModel.toggleStatus(data);
		});
	},
	showErrorMessage = function(parentEl){
		$('.error-message').fadeIn().delay(1000).fadeOut();
	},

	bindEventHandlers = function(){
		var updateModel = function(e,data){
			return ToDoModel.updateModel(data);
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
	},

	updateCount = function(){
		$('.count').text(ToDoModel.getCurrentCategory()+" : "+ToDoModel.getCount({'category':ToDoModel.getCurrentCategory()}));
	},
	renderInitialList = function(){
		var categories = ToDoModel.getCategories();
		for(category in categories){
			addNewCategory(categoryList ,{'categoryName' : category});
		}
		$('#todoCategoryList li:first').click();
	};

	bindEventHandlers();
	renderInitialList();

};