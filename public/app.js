/* global */

$(document).ready(function(){
	$.getJSON("/api/todo")
	.then(addTodos)
	.catch(function(err){
		res.send(err);
	});	

	$('#todoInput').keypress(function(event){
		if(event.which===13){
			createTodo();
		}
	});

	$('.list').on('click','li',function(){
		updateTodo($(this));
	});


	$('.list').on('click','span',function(event){
		event.stopPropagation();
		removeTodo($(this).parent());
	});
});



function addTodos(todos){
	//add todos to page here
	todos.forEach(function(todo){
		addTodo(todo);
	})
}

function addTodo(todo){
	const newTodo = $(`<li class="task">${todo.name}<span>X</span></li>`);
	newTodo.data('id',todo._id);
	newTodo.data('completed',todo.completed);
		if(todo.completed){
			newTodo.addClass("done");
		}
		$('.list').append(newTodo);
}


function createTodo(){
		let userInput = $('#todoInput').val(); 
	$.post("/api/todo",{name:userInput})
	.then(function(newTodo){
		$('#todoInput').val(""); 
		addTodo(newTodo);
	})
	.catch(function(err){
		res.send(err);
	})
}

function removeTodo(todo){
	const clickedId = todo.data('id');
	const deleteUrl = `/api/todo/${clickedId}`;
	$.ajax({
		method:'DELETE',
		url:deleteUrl
	})
	.then(function(data){
		todo.remove();
	})
	.catch(function(err){
		console.log(err);
	})
}


function updateTodo(todo){
	const updateUrl = `/api/todo/${todo.data('id')}`;
	const isDone = !todo.data('completed');
	const updateData = {completed:isDone}
	$.ajax({
		method : 'PUT',
		url:updateUrl,
		data:updateData
	})
	.then(function(updatedTodo){
		todo.toggleClass('done');
		todo.data('completed',isDone);
	})
	.catch(function(err){
		console.log(err);
	})
}