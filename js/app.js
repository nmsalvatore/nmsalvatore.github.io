const clearBtn = document.getElementById('clear-btn'),
      taskUl = document.getElementById('task-ul'),
      completedUl = document.getElementById('completed-ul'),
      form = document.getElementById('task-form'),
      toggleTaskVisibilityBtn = document.getElementById('toggle-task-visibility'),
      taskWrapper = document.getElementById('collection-wrapper'),
      completedWrapper = document.getElementById('completed-wrapper'),
      alert = document.getElementById('alert'),
      closeModalBtn = document.getElementById('close-modal-btn'),
      progressContainer = document.querySelector('.progress-container'),
      progressBar = document.querySelector('.progress-bar'),
      collectionFooter = document.querySelector('.collection-footer');

let tasks, 
    completed, 
    progressStartValue, 
    progressEndValue,
    completedTasksAlert = document.getElementById('tasks-complete');

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
  deleteCompleted(targetId) {
    this.retrieveCompleted();
    completed.forEach(function(task, index) {
      if (targetId == index) {
        completed.splice(index, 1);
        this.storeCompleted();
      }
    }, this);
  },
  clearTasks() {
    localStorage.clear();
  },
  clearCompleted() {
    localStorage.removeItem('completed-tasks');
  },
  toggleTask(targetId) {
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
  },
  toggleCompleted(targetId) {
    this.retrieveCompleted();
    completed.forEach(function(task, index) {
      if (targetId == index) {
        if (completed[index].completed === true) {
          completed[index].completed = false;
        } else {
          completed[index].completed = true;
        }
        this.storeCompleted();
      }
    }, this);
  },
}

const handlers = {
  addTask(e) {
    let input = document.getElementById('task-input');
    local.addTask(input.value);
    input.value = '';
    view.displayIncompleted();
    e.preventDefault();
  },
  deleteCompleted(e) {
    let targetId = e.target.parentElement.id;
    local.deleteCompleted(targetId);
    view.displayAllTasks();
  },
  clearTasks() {
    local.clearTasks();
    view.toggleCollectionOff();
    view.displayAllTasks();
  },
  clearCompleted() {
    local.clearCompleted();
    view.displayAllTasks();
  },
  toggleTask(e) {
    let targetId = e.target.children[0].id;
    local.toggleTask(targetId);
    view.displayIncompleted();
    setTimeout(function() {
      storeCompletedTasks();
      view.displayAllTasks();
    }, 500);
  },
  toggleCompleted(e) {
    let targetId = e.target.children[0].id;
    local.toggleCompleted(targetId);
    storeIncompletedTasks();
    view.displayAllTasks();
  },
}

const view = {
  displayIncompleted() {
    taskUl.innerHTML = null;
    local.retrieveTasks();

    tasks.forEach(function(task, position) {
      let li = document.createElement('li');
      li.textContent = task.taskText;
      li.className = 'collection-item flex ai-center jc-space-between';

      let link = document.createElement('a');
      link.id = position;
      link.className = 'delete-btn';
      link.innerHTML = '<img src="img/option-btn.png" />';
      li.appendChild(link);

      if (task.completed === false) {
        if (li.classList.contains('completed')) {
          li.classList.remove('completed');
        }
      } else {
        li.classList.add('completed');
      }
      
      taskUl.appendChild(li);
    });

    local.retrieveCompleted();
    if (completed.length === 1) {
      completedTasksAlert.innerHTML = `<em>${completed.length} task completed</em>`;
    } else {
      completedTasksAlert.innerHTML = `<em>${completed.length} tasks completed</em>`;
    }

    view.progressBarMove();
  },
  displayCompleted() {
      completedUl.innerHTML = null;
      local.retrieveCompleted();
  
      completed.forEach(function(task, position) {
        let li = document.createElement('li');
        li.textContent = task.taskText;
        li.className = 'collection-item flex ai-center jc-space-between';
  
        let link = document.createElement('a');
        link.id = position;
        link.className = 'delete-btn';
        link.innerHTML = '<img src="img/delete-btn.png" />';
        li.appendChild(link);
  
        if (task.completed === false) {
          if (li.classList.contains('completed')) {
            li.classList.remove('completed');
          }
        } else {
          li.classList.add('completed');
        }
        
        completedUl.appendChild(li);
      });
  },
  displayAllTasks() {
    view.displayIncompleted();
    view.displayCompleted();
  },
  approveClearTasks() {
    handlers.clearTasks();
    alert.style.display = 'none';
  },
  denyClearTasks() {
    alert.style.display = 'none';
  },
  toggleCollectionOn() {
    completedWrapper.style.display = 'block';
    clearBtn.style.display = 'inline';
    toggleTaskVisibilityBtn.src = 'img/hide-tasks.png';
  },
  toggleCollectionOff() {
    completedWrapper.style.display = 'none';
    clearBtn.style.display = 'none';
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
  },
  loadEventListeners() {
    document.addEventListener('DOMContentLoaded', view.displayAllTasks);
  
    form.addEventListener('submit', handlers.addTask);
  
    taskUl.onclick = function(e) {
      if (e.target.classList.contains('collection-item')) {
        handlers.toggleTask(e);
      } else if (e.target.parentElement.classList.contains('delete-btn')) {
        /* add an option function */
      }
    };


    completedUl.onclick = function(e) {
      if (e.target.classList.contains('collection-item')) {
        handlers.toggleCompleted(e);
      } else if (e.target.parentElement.classList.contains('delete-btn')) {
        handlers.deleteCompleted(e);
      }
    };
  
    toggleTaskVisibilityBtn.onclick = function() {
      if (completedWrapper.style.display == 'none') {
        view.toggleCollectionOn();
      } else {
        view.toggleCollectionOff();
      }
    };

    completedTasksAlert.onclick = function() {
      view.toggleCollectionOn();
    }

    clearBtn.onclick = function() {
      handlers.clearCompleted();
    }
  }
}

view.loadEventListeners();
view.toggleCollectionOff();

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

function storeIncompletedTasks() {
  local.retrieveCompleted();
  local.retrieveTasks();

  completed.forEach(function(task, position) {
    if (task.completed === false) {
      completed.splice(position, 1);
      tasks.push(task);
    }
  });

  local.storeCompleted()
  local.storeTasks()
}