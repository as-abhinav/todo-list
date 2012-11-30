$(document).ready(function(){
	// toDoModel = new ToDoModel();
	ToDoModel.setCategories(JSON.parse(localStorage.getItem('ToDo'))|| {});
	ToDoView(ToDoModel);
});

$(window).unload(function(e){
	localStorage.setItem('ToDo',JSON.stringify(ToDoModel.getCategories()));
});