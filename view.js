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
		var deleteBtn = $('<a href="#" itemId="' + itemId + '" class="delete"></a>'),
			listItemEl = $('<li itemId="' + itemId + '"></li>');
		listItemEl.append('<p>' + data.title + '</p>');
		listItemEl.append(deleteBtn);
		listEl.append(listItemEl);
		deleteBtn.bind('removeFromModel', function(e,data){
			ToDoModel.removeItem(data);
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
				todoItem: {'title':todoData}
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