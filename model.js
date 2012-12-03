var ToDoModel = function(){
	var currentCategory = null,
		categories = {};

	this.getCategories = function(){
		return categories;
	}
	this.setCategories = function(data){
		categories = data;
	}
	this.getCurrentCategory = function(){
		return currentCategory;
	}
	this.updateModel = function(data){
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
	}
	this.getToDoList = function(category) {
		currentCategory = category.currentCategoryName;
		return categories[currentCategory]['todoItems'];
	}
	this.removeItem = function(itemId){
		var currentToDoList = categories[currentCategory]['todoItems'];
		delete currentToDoList[itemId];
	}
	this.getCount = function(data){
		var count = 0;
		for(todoItem in categories[data.category]['todoItems']){
			count++;
		}
		return count;
	}
	this.toggleStatus = function(itemId){
		var currentToDoList = categories[currentCategory]['todoItems'];
		currentToDoList[itemId]['status'] = !currentToDoList[itemId]['status'];			
	}
	this.updateToDoItem = function(data){
		var currentToDoList = categories[currentCategory]['todoItems'];
		currentToDoList[data.itemId]['title']=data.todoText;
	}

};