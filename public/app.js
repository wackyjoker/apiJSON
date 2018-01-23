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
	$('.list').on('click','span',function(){
		console.log('clicked');
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