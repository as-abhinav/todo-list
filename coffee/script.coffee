$(document).ready ->
	Events = (() ->
		category_list = $('#category-list')
		todo_list = $('.todo-list')

		addNewItem = () ->
			itemId = $.now()
			newItem = $('<li><div class="sidebar"><span class="uncheck"></span></div></li>')
			inputBox = $('<input type="text">')	

			prepareInputBox = () ->
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
				closeDiv = $('<span class="close"></span>')
				optionsDiv = $('<span class="options"></div>')

				editDiv.attr 'itemId', itemId
				closeDiv.attr 'itemId', itemId
				editDiv.on 'click', (event) ->

				closeDiv.on 'click', (event) ->

				optionsDiv.append editDiv
				optionsDiv.append closeDiv
				optionsDiv

			newItem.append prepareInputBox()
			todo_list.append newItem
			inputBox.focus()

		addNewCategory = (event) ->
			if event.keyCode == 13
				newCategoryName = $(this).val().charAt(0).toUpperCase() + $(this).val().slice 1
				newCategory = $('<li>' + newCategoryName + '</li>')
				category_list.append newCategory
				$(this).val ''

		{
			bindEvents: () ->
				category_list.on 'hover', 'li', (event) ->
					$(this).addClass('selected').siblings().removeClass()

				todo_list.on 'click', '.sidebar .uncheck', (event) ->
					$(this).removeClass().addClass 'check'

				todo_list.on 'click', '.sidebar .check', (event) ->
					$(this).removeClass().addClass 'uncheck'

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






