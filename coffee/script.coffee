$(document).ready ->
	Events = (() ->
		category_list = $('#category-list')
		todo_list = $('.todo-list')

		addNewItem = () ->
			itemId = $.now()
			newItem = $('<li></li>')
			inputBox = $('<input type="text">')	

			createInputBox = () ->
				taskDiv = $('<div class="task"></div>')

				inputBox.on 'keyup', (event) ->
					if event.keyCode == 13
						text = inputBox.val()
						taskDiv.empty()
						taskDiv.append '<span>' + text + '</span>'
						newItem.append createOptionsDiv()
				newItem.attr 'itemId', itemId
				taskDiv.append inputBox
				taskDiv

			createOptionsDiv = () ->
				editDiv = $('<span class="edit"></span>')
				removeDiv = $('<span class="remove"></span>')
				optionsDiv = $('<span class="options"></div>')

				editDiv.attr 'itemId', itemId
				removeDiv.attr 'itemId', itemId

				editDiv.on 'click', editToDo
				removeDiv.on 'click', removeToDo 

				optionsDiv.append editDiv
				optionsDiv.append removeDiv
				optionsDiv

			createSidebar = () ->
				sidebarDiv = $('<div class="sidebar"></div>')
				checkbox = $('<span class="uncheck"></span>')
				checkbox.attr 'itemId', itemId
				sidebarDiv.append checkbox
				sidebarDiv

			newItem.append createSidebar()
			newItem.append createInputBox()
			todo_list.append newItem
			inputBox.focus()

		editToDo = (event) ->
			itemId = $(this).attr 'itemId'
			taskDiv = todo_list.children('[itemId='+itemId+']').children('.task')
			itemData = taskDiv.children('span').text()
			taskDiv.empty()
			inputBox = $('<input type="text" value="'+itemData+'" />')
			inputBox.on 'keyup', (event) ->
				if event.keyCode == 13
					text = inputBox.val()
					taskDiv.empty()
					taskDiv.append '<span>' + text + '</span>'
			taskDiv.append inputBox

		removeToDo = (event) ->
			itemId = $(this).attr 'itemId'
			liEle = todo_list.children('[itemId='+itemId+']')
			liEle.remove()

		addNewCategory = (event) ->
			if event.keyCode == 13
				newCategoryName = $(this).val().charAt(0).toUpperCase() + $(this).val().slice 1
				newCategory = $('<li>' + newCategoryName + '</li>')
				category_list.append newCategory
				$(this).val ''

		toggleStatus = (itemId) ->
			console.log(itemId)
			itemSpan = todo_list.children('[itemId='+itemId+']').children('.task').children('span')	
			itemSpan.toggleClass 'completed'

		{
			bindEvents: () ->
				category_list.on 'hover', 'li', (event) ->
					$(this).addClass('selected').siblings().removeClass()

				todo_list.on 'click', '.sidebar .uncheck', (event) ->
					$(this).removeClass().addClass 'check'
					toggleStatus($(this).attr('itemId'))

				todo_list.on 'click', '.sidebar .check', (event) ->
					$(this).removeClass().addClass 'uncheck'
					toggleStatus($(this).attr('itemId'))

				$('.list-container .add-category').on 'focus', 'input', (event) ->
					$(this).addClass 'adding'
					$(this).attr 'placeholder', ''

				$('.list-container .add-category').on 'blur', 'input', (event) ->
					$(this).removeClass 'adding'
					$(this).attr 'placeholder', 'Create New List...'

				$('.list-container .add-category').on 'keyup', 'input', addNewCategory
				$('.add-new').on 'click', addNewItem
		}
	)()
	
	Events.bindEvents()






