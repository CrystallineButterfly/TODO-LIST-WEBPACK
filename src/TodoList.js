/* eslint-disable no-plusplus */
let todos = JSON.parse(localStorage.getItem('todo-list')) || [];

const form = document.querySelector('.form-input');
const displayTask = (todo) => {
  const divEl = document.querySelector('.task-ul');
  const div = document.createElement('div');
  div.classList.add('todo-div');
  div.innerHTML = `
  <div>
    <input onclick="updateStatus(this)" type="checkbox" id="${todo.index}" />
    </div>
    <div>
    <p contenteditable="true" class="todo-para">${todo.name}</p>
    </div>
    <div>
    <ion-icon name="ellipsis-vertical-outline"></ion-icon>
    <ion-icon id="delete" name="trash-outline"></ion-icon>
    
    </div>
    `;
  divEl.appendChild(div);
};
const showNewTodo = () => {
  todos.forEach((todo) => {
    if (todo.index >= todos.length) {
      displayTask(todo);
    }
  });
};

const showTodo = () => {
  todos.forEach((todo) => {
    displayTask(todo);
  });
};

showTodo();
function editFunc() {
  const par = document.body.querySelectorAll('.todo-para');

  par.forEach((item) => {
    let previousTask = item.textContent;
    item.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        const newTask = item.textContent;
        const filteredNew = todos.filter((todo) => todo.name === previousTask);
        todos[filteredNew[0].index - 1].name = newTask;
        previousTask = newTask;
        localStorage.setItem('todo-list', JSON.stringify(todos));
      }
    });
  });
}
editFunc();

function showError() {
  const messageDiv = document.querySelector('.message');
  const para = document.createElement('p');
  para.classList.add('error');
  para.textContent = 'Enter a todo';
  messageDiv.appendChild(para);
  function hideElement() {
    messageDiv.style.display = 'none';
  }
  setTimeout(hideElement, 2000);
}
function deleteFunc() {
  const btnCl = document.querySelectorAll('#delete');
  btnCl.forEach((item) => {
    item.addEventListener('click', (e) => {
      const divVar = e.target.parentElement.previousElementSibling.textContent.trim();
      todos = todos.filter((todo) => todo.name !== divVar);
      for (let i = 0; i < todos.length; i++) {
        todos[i].index = i + 1;
      }
      const deletedItem = item.parentElement.parentElement;
      const parent = deletedItem.parentElement;
      parent.removeChild(deletedItem);
      localStorage.setItem('todo-list', JSON.stringify(todos));
    });
  });
}
deleteFunc();

form.addEventListener('submit', (e) => {
  const todoVal = document.querySelector('#todo');
  const todoValue = todoVal.value.trim();
  if (!todoValue) {
    e.preventDefault();
    showError();
  } else {
    e.preventDefault();
    todoVal.value = '';
    if (!todos) {
      todos = [];
    }
    const taskInfo = {
      name: todoValue,
      completed: false,
      index: todos.length + 1,
    };
    todos.push(taskInfo);
    localStorage.setItem('todo-list', JSON.stringify(todos));
    showNewTodo();
    editFunc();
    deleteFunc();
  }
});
