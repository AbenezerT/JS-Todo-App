//selectors
const toDoInput = document.querySelector('.todo-input')
const todoButton = document.querySelector('.todo-button')
const todoList  = document.querySelector('.todo-list')
const filterOption = document.querySelector('.filter-todo')


// event Listener
document.addEventListener('DOMContentLoaded', getTodos)
todoButton.addEventListener('click', addTodo);
todoList.addEventListener('click', deleteCheck)
filterOption.addEventListener('change', filterTodo)

//functions

function addTodo(event){
    event.preventDefault()
    // Todo DIV
    const todoDiv = document.createElement("div")
    todoDiv.classList.add("todo");

    //create LI
    const newTodo = document.createElement("li");
    newTodo.innerText = toDoInput.value
    newTodo.classList.add('todo-item')
    todoDiv.appendChild(newTodo)
    // Add todo to localStorage
    saveLocalTodos(toDoInput.value)
    // check mark button 
    const completedButton = document.createElement('button')
    completedButton.innerHTML = `<i class= "fas fa-check"></i>`
    completedButton.classList.add('complete-btn')
    todoDiv.appendChild(completedButton)
    // delete button
    const deleteButton = document.createElement('button')
    deleteButton.innerHTML = `<i class= "fas fa-trash"></i>`
    deleteButton.classList.add('delete-btn')
    todoDiv.appendChild(deleteButton)
    //append to list 
    todoList.appendChild(todoDiv)
    toDoInput.value = ''
}

function deleteCheck(e){
    const item = e.target;
    if(item.classList[0] === 'delete-btn'){
        const todo = item.parentElement
        //Animation
        todo.classList.add('fall')
        removeLocalTodos(todo)
        todo.addEventListener('transitionend', function(){
             todo.remove()
        })
    }

    // check mark
    if(item.classList[0] === 'complete-btn'){
        const todo = item.parentElement;
        todo.classList.toggle('completed')
    }

}

function filterTodo(e){
    const todos = todoList.childNodes
    todos.forEach(function(todo){
        switch(e.target.value){
            case "all":
                todo.style.display = 'flex'
                break;
            case "completed":
                if(todo.classList.contains('completed')){
                    todo.style.display = 'flex';
                }else{
                    todo.style.display = 'none';
                }   
                break;
            case "uncompleted":
                if(!todo.classList.contains('completed')){
                    todo.style.display = 'flex';
                }else{
                    todo.style.display = 'none';
                }
                break;      
        }
    })
}

function saveLocalTodos(todo){
    //check
    let todos;

    if(localStorage.getItem('todos') === null){
        todos = []
    }else{
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    todos.push(todo);
    localStorage.setItem("todos", JSON.stringify(todos));
}
function getTodos(){


    if(localStorage.getItem('todos') === null){
        todos = []
    }else{
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    todos.forEach(function(todo){
        // Todo DIV
    const todoDiv = document.createElement("div")
    todoDiv.classList.add("todo");

    //create LI
    const newTodo = document.createElement("li");
    newTodo.innerText = todo
    newTodo.classList.add('todo-item')
    todoDiv.appendChild(newTodo)
    // check mark button 
    const completedButton = document.createElement('button')
    completedButton.innerHTML = `<i class= "fas fa-check"></i>`
    completedButton.classList.add('complete-btn')
    todoDiv.appendChild(completedButton)
    // delete button
    const deleteButton = document.createElement('button')
    deleteButton.innerHTML = `<i class= "fas fa-trash"></i>`
    deleteButton.classList.add('delete-btn')
    todoDiv.appendChild(deleteButton)
    //append to list 
    todoList.appendChild(todoDiv)
    })

}

function removeLocalTodos(todo){
    if(localStorage.getItem('todos') === null){
        todos = []
    }else{
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    const todoIndex = todo.children[0].innerText
    todos.splice(todos.indexOf(todoIndex), 1)
    localStorage.setItem('todos', JSON.stringify(todos))
}