let form = document.querySelector('form'); //
let text = document.getElementById('text');
let todoContent = document.querySelector('.todo-content');
form.addEventListener('submit', (e) => {
  e.preventDefault();
  addItemTodo();
});
let todos = JSON.parse(localStorage.getItem('todos'));
if (todos) {
  todos.forEach((element) => {
    addItemTodo(element);
  });
}

function addItemTodo(element) {
  let todoCollection = document.createElement('div');
  todoCollection.classList.add('todocoll');
  let todotext = text.value;
  if (element) {
    todotext = element.text;
  }
  if (todotext) {
    todoCollection.innerHTML = `
    <div class="todo-li">
    <div class="check ${
      element && element.complete ? 'active-check' : ''
    }"><img src="./images/icon-check.svg" alt=""></div>
    <p class="ptag ${
      element && element.complete ? 'complete' : ''
    }">${todotext}</p>
    <button class="close"><img src="./images/icon-cross.svg" alt=""></button>
  </div>
  <div class="hr"></div>`;
    todoContent.appendChild(todoCollection);
    updateList();
  }
  //close button
  let close = todoCollection.querySelector('.close');
  close.addEventListener('click', () => {
    todoCollection.remove();
    updateList();
  });
  let check = todoCollection.querySelector('.check');
  check.addEventListener('click', () => {
    check.classList.toggle('active-check');
    todoCollection.children[0].children[1].classList.add('complete');
    updateList();
  });
  text.value = '';
}

function updateList() {
  let ptag = document.querySelectorAll('.ptag');
  let arr = [];
  ptag.forEach((element) => {
    arr.push({
      text: element.innerText,
      //even after refresh the class hold up
      complete: element.classList.contains('complete'),
    });
  });
  localStorage.setItem('todos', JSON.stringify(arr));
}

let information = document.querySelectorAll('.choice p');
let todoli = document.querySelectorAll('.todocoll');
console.log(information);
information.forEach((element) => {
  element.addEventListener('click', () => {
    information.forEach((item) => {
      item.classList.remove('active');
    });
    element.classList.add('active');
    if (element.innerText == 'Active') {
      todoli.forEach((element) => {
        if (!element.children[0].children[1].classList.contains('complete')) {
          element.style.display = 'block';
        } else {
          element.style.display = 'none';
        }
      });
    } else if (element.innerText == 'Completed') {
      todoli.forEach((element) => {
        if (element.children[0].children[1].classList.contains('complete')) {
          element.style.display = 'block';
        } else {
          element.style.display = 'none';
        }
      });
    } else {
      todoli.forEach((element) => {
        element.style.display = 'block';
      });
    }
  });
});
let clear = document.querySelector('.clear');
clear.addEventListener('click', () => {
  todoli.forEach((element) => {
    if (element.children[0].children[1].classList.contains('complete')) {
      element.remove();
      updateList();
    }
  });
});
let left = document.querySelector('.left');

//every time the window refresh the setitem works
function setitem() {
  let activeTodo = document.querySelectorAll('.todo-li .active-check');
  let diff = todoli.length - activeTodo.length;
  left.innerText = `${diff} items left`;
}
setitem();
