'use strict'

const ENTER_KEY = 13;

const taskList = {
  add(task) {
    let tasks = this.getLocal();
    tasks.push(task);
    this.setLocal(tasks);
  },
  delete(index) {
    let tasks = this.getLocal();
    tasks.splice(index, 1);
    this.setLocal(tasks);
  },
  update(index, newTaskName) {
    let tasks = this.getLocal();
    tasks[index] = newTaskName;
    this.setLocal(tasks);
  },
  getLocal() {
    let tasks;

    localStorage.getItem('tasks') === null ?
      tasks = [] :
      tasks = JSON.parse(localStorage.getItem('tasks'));

    return tasks;
  },
  setLocal(taskArr) {
    localStorage.setItem('tasks', JSON.stringify(taskArr));
  },
}

const handlers = {
  add() {
    const taskInput = document.getElementById('task-input');
    taskList.add(taskInput.value.trim());
    taskInput.value = null;
    view.showTasks()
  },
  delete(e) {
    taskList.delete(e.target.parentElement.id);
    view.showTasks();
  },
  update(e) {
    let editMode = e.target,
        oldTaskId = editMode.parentElement.id,
        newTask = editMode.value;
  
    taskList.update(oldTaskId, newTask);
    view.showTasks();
    editMode.style.display = 'none';
  },
}

const view = {
  showTasks() {
    let tasks = taskList.getLocal();

    const emptyTasks = document.getElementById('empty-tasks-notice');
    
    if (tasks.length === 0) {
      emptyTasks.style.display = 'flex';
    } else {
      emptyTasks.style.display = 'none';
    }

    const taskUl = document.getElementById('task-list');
    taskUl.innerHTML = null;

    tasks.forEach(function(task, index) {
      let taskLi = document.createElement('li');
      taskLi.className = 'task-item';
      taskLi.id = index;
      taskLi.innerHTML = `
        <label>${task}</label>
        <ion-icon name="ellipsis-horizontal" id="delete-btn"></ion-icon>
        <input class="edit-mode" type="text" value="${task}">`;
      taskUl.appendChild(taskLi);
    });
  },
  showEditMode(target) {
    target.style.display = 'block';
    target.focus();
  },
}

const addTaskBtn = document.getElementById('add-task-btn');
const taskInput = document.getElementById('task-input');
const taskUl = document.getElementById('task-list');

document.addEventListener('DOMContentLoaded', view.showTasks());

addTaskBtn.addEventListener('click', function() {
  taskInput.style.display = 'block';
  taskInput.focus();
});

document.addEventListener('click', function(e) {
  console.log(e.target.id);
  if ((e.target.id !== 'add-task-btn') && (e.target.id !== 'task-input')) {
    taskInput.style.display = 'none';
  }
});

taskInput.addEventListener('keydown', function(e) {
  if (e.which === ENTER_KEY) handlers.add();
});

taskUl.addEventListener('click', e => {
  if (e.target.id === 'delete-btn') handlers.delete(e);
});

taskUl.addEventListener('dblclick', e => {
  if (e.target.className === 'task-item') {
    view.showEditMode(e.target.lastChild);
  } else if (e.target.tagName === 'LABEL') {
    view.showEditMode(e.target.nextElementSibling.nextElementSibling);
  }
});

taskUl.addEventListener('focusout', e => {
  if (e.target.classList.contains('edit-mode')) handlers.update(e);
});

taskUl.addEventListener('keydown', e => {
  if (e.which === ENTER_KEY) handlers.update(e);
});


