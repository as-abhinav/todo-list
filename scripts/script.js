$(document).ready(function(){
	var todoView = ToDoView.getInstance();
});

$(window).unload(function(e){
	localStorage.setItem('ToDo',JSON.stringify(ToDoModel.getCategories()));
});