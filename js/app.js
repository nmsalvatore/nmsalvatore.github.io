/* global variable declaration */

const clearBtn = document.getElementById('clear-btn'),
      taskUl = document.getElementById('task-ul'),
      form = document.getElementById('task-form'),
      toggleTaskVisibilityBtn = document.getElementById('toggle-task-visibility'),
      taskWrapper = document.querySelector('.collection-wrapper'),
      alert = document.getElementById('alert'),
      closeModalBtn = document.getElementById('close-modal-btn'),
      progressContainer = document.querySelector('.progress-container'),
      progressBar = document.querySelector('.progress-bar'),
      collectionFooter = document.querySelector('.collection-footer');

let tasks, completed, progressStartValue, progressEndValue;

const local = {
  retrieveTasks() {
    if (localStorage.getItem('tasks') === null) {
      tasks = [];
    } else {
      tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    return tasks;
  },
  storeTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  },
  retrieveCompleted() {
    if (localStorage.getItem('completed-tasks') === null) {
      completed = [];
    } else {
      completed = JSON.parse(localStorage.getItem('completed-tasks'));
    }
    return completed;
  },
  storeCompleted() {
    localStorage.setItem('completed-tasks', JSON.stringify(completed));
  },
  addTask(task) {
    if (task === '') {
      alert('Please enter a valid task');
      return;
    }
    
    this.retrieveTasks();
    tasks.push({
      taskText: task,
      completed: false,
    });
    this.storeTasks();
  },
  deleteTask(targetId) {
    this.retrieveTasks();
    tasks.forEach(function(task, index) {
      if (targetId == index) {
        tasks.splice(index, 1);
        this.storeTasks();
      }
    }, this);
  },
  clearTasks() {
    localStorage.clear();
  },
  toggleCompleted(targetId) {
    this.retrieveTasks();
    tasks.forEach(function(task, index) {
      if (targetId == index) {
        if (tasks[index].completed === true) {
          tasks[index].completed = false;
        } else {
          tasks[index].completed = true;
        }
        this.storeTasks();
      }
    }, this);
  }
}

const handlers = {
  addTask(e) {
    let input = document.getElementById('task-input');
    local.addTask(input.value);
    input.value = '';
    view.displayTasks();
    view.toggleCollectionOn();
    e.preventDefault();
  },
  deleteTask(e) {
    let targetId = e.target.parentElement.id;
    local.deleteTask(targetId);
    view.displayTasks();
  },
  clearTasks() {
    local.clearTasks();
    view.toggleCollectionOff();
    view.displayTasks();
  },
  toggleCompleted(e) {
    let targetId = e.target.children[0].id;
    local.toggleCompleted(targetId);
    view.displayTasks();
    setTimeout(function() {
      storeCompletedTasks();
      view.displayTasks();
    }, 500);
  }
}

const view = {
  displayTasks() {
    /* reset completed value */
    completed = 0;

    /* clear collection */
    taskUl.innerHTML = null;

    /* retrieve local storage and convert to array */
    local.retrieveTasks();

    tasks.forEach(function(task, position) {
      /* create list item */
      let taskLi = document.createElement('li');
      taskLi.textContent = task.taskText;
      taskLi.className = 'collection-item flex ai-center jc-space-between';

      /* create delete button */
      let link = document.createElement('a');
      link.id = position;
      link.className = 'delete-btn';
      link.innerHTML = '<img src="img/option-btn.png" />';
      taskLi.appendChild(link);

      /* if task complete, add complete class and add to completed count */
      if (task.completed === false) {
        if (taskLi.classList.contains('completed')) {
          taskLi.classList.remove('completed');
        }
      } else {
        taskLi.classList.add('completed');
      }
      
      /* append list item to collection */
      taskUl.appendChild(taskLi);
    });

    /* if all tasks are completed, display modal */
    if (completed === tasks.length) {
      alert.style.display = 'block';
    }

    /* display number of tasks to be completed */
    let incompleteTasksAlert = document.getElementById('tasks-incomplete');
    if (tasks.length === 1) {
      incompleteTasksAlert.innerHTML = `<em>${tasks.length} task incomplete</em>`;
    } else {
      incompleteTasksAlert.innerHTML = `<em>${tasks.length} tasks incomplete</em>`;
    }

    /* display number of tasks completed */
    local.retrieveCompleted();
    let completedTasksAlert = document.getElementById('tasks-complete');
    if (completed.length === 1) {
      completedTasksAlert.innerHTML = `<em>${completed.length} task completed</em>`;
    } else {
      completedTasksAlert.innerHTML = `<em>${completed.length} tasks completed</em>`;
    }

    /* update progress bar */
    view.progressBarMove();
  },
  approveClearTasks() {
    handlers.clearTasks();
    alert.style.display = 'none';
  },
  denyClearTasks() {
    alert.style.display = 'none';
  },
  toggleCollectionOn() {
    taskWrapper.style.display = 'block';
    toggleTaskVisibilityBtn.src = 'img/hide-tasks.png';
  },
  toggleCollectionOff() {
    taskWrapper.style.display = 'none';
    collectionFooter.style.display = 'flex';
    toggleTaskVisibilityBtn.src = 'img/show-tasks.png';
  },
  progressBarMove() {
    let totalTasks = completed.length + tasks.length;
    let progressValue = (completed.length / totalTasks) * 100;
    progressBar.style.width = `${progressValue}%`;
  
    if (progressValue >= 100) {
      progressBar.style.borderRadius = '5px 5px 0 0';
    } else {
      progressBar.style.borderRadius = '5px 0 0 0';
    }
    console.log(progressValue);
  },
  loadEventListeners() {
    document.addEventListener('DOMContentLoaded', view.displayTasks);
  
    form.addEventListener('submit', handlers.addTask);
  
    taskUl.onclick = function(e) {
      if (e.target.classList.contains('collection-item')) {
        handlers.toggleCompleted(e);
      } else if (e.target.parentElement.classList.contains('delete-btn')) {
        handlers.deleteTask(e);
      }
    };
  
    toggleTaskVisibilityBtn.onclick = function() {
      if (taskWrapper.style.display !== 'none') {
        view.toggleCollectionOff();
      } else {
        view.toggleCollectionOn();
      }
    };
  }
}

view.loadEventListeners();

function storeCompletedTasks() {
  local.retrieveCompleted();
  local.retrieveTasks();

  tasks.forEach(function(task, position) {
    if (task.completed === true) {
      tasks.splice(position, 1);
      completed.push(task);
    }
  });

  local.storeCompleted()
  local.storeTasks()
}