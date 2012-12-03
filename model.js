var ToDoModel = (function(){
	var currentCategory = null,
		categories = {};

	return {
		getCategories: function(){
			return categories;
		},
		setCategories: function(data){
			categories = data;
		},
		getCurrentCategory: function(){
			return currentCategory;
		},
		updateModel: function(data){
			if(!data.todoItem){
				console.log(categories);
				categories[data.category]={
					'count' : 0,
					'todoItems' : {}
				};
				return 0;
			}
			categories[data.category]['count']+=1;
			var currentCount = categories[data.category]['count'];
			categories[data.category]['todoItems'][currentCount]=data.todoItem;
			return currentCount;	
		},
		getToDoList: function(category) {
			currentCategory = category.currentCategoryName;
			return categories[currentCategory]['todoItems'];
		},
		removeItem: function(itemId){
			var currentToDoList = categories[currentCategory]['todoItems'];
			delete currentToDoList[itemId];
		},
		getCount: function(data){
			var count =0;
			for(todoItem in categories[data.category]['todoItems']){
				count++;
			}
			return count;
		},
		toggleStatus: function(itemId){
			var currentToDoList = categories[currentCategory]['todoItems'];
			currentToDoList[itemId]['status'] = !currentToDoList[itemId]['status'];			
		},
		updateToDoItem: function(data){
			var currentToDoList = categories[currentCategory]['todoItems'];
			currentToDoList[data.itemId]['title']=data.todoText;
			console.log(currentToDoList);
		}

	}
})();