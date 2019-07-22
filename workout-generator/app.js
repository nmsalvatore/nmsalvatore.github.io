'use strict';

const rehab = {
  neck: [
    {type: 'radial nerve flossing', reps: 10},
    {type: 'median nerve flossing', reps: 10},
    {type: 'ulnar nerve flossing', reps: 10},
  ],
  wrists: [
    {type: 'banded finger extensions', reps: 20},
    {type: 'pvc wrist rotations', reps: 10},
  ],
  chest: [
    {type: 'pushups, diamond', reps: 15},
    {type: 'pushups, standard', reps: 15},
    {type: 'pushups, parallette', reps: 15},
  ],
  back: [
    {type: 'banded pull-aparts, pronated', reps: 20},
    {type: 'banded pull-aparts, supinated', reps: 20},
    {type: 'banded rows', reps: 20},
    {type: 'banded straight-arm pull-downs', reps: 20},
    {type: 'banded external rotations', reps: 20},
    {type: 'banded tricep pulldowns', reps: 20},
  ],
  core: [
    {type: 'pallof press', reps: 20},
    {type: 'pallof rotation', reps: 20},
    {type: 'plank', reps: '2 minutes'},
    {type: 'side plank', reps: '1 minute'},
  ],
  hips: [
    {type: 'banded box squats', reps: 30},
    {type: 'banded glute bridges', reps: 30},
    {type: 'banded clamshells', reps: 30},
    {type: 'banded lateral walk', reps: 30},
    {type: 'weighted reverse lunges', reps: 40},
    {type: 'weighted wide stance air squats', reps: 30},
  ],
}

function displayWorkout() {
  const collection = document.getElementById('movement-collection');
  collection.innerHTML = null;

  createNewList(rehab.neck);
  createNewList(rehab.wrists);
  createNewList(getRandomMovements(rehab.back, 4));
  createNewList(getRandomMovements(rehab.core, 3));
  createNewList(getRandomMovements(rehab.chest, 1));
  createNewList(getRandomMovements(rehab.hips, 4));

  function createNewList(movementType) {
    const movementUl = document.createElement('ul');

    movementType.forEach(function createListItems(movement) {
      const movementLi = document.createElement('li');
     
      (typeof movement.reps === 'number') ?
        movementLi.textContent = `${movement.reps}x, ${movement.type}` :
        movementLi.textContent = `${movement.reps}, ${movement.type}`;
      
      movementUl.appendChild(movementLi);
    });
    
    collection.appendChild(movementUl);
  }
}

function getRandomMovements(movementGroup, numberOfMovements) {
  let randomMovements = [];
  
  (function findMovements() {
    while (randomMovements.length < numberOfMovements) {
      let index = Math.floor(Math.random() * movementGroup.length),
          movement = movementGroup[index];

      if (randomMovements.includes( movement )) continue;

      randomMovements.push( movement );
    };
  })();
  
  return randomMovements;
}

function toggleActivityClass() {
  const navUl = document.querySelector('.nav-ul');

  for (let i = 0; i < 4; i++) {
    if (navUl.children[i].classList.contains('active')) {
      navUl.children[i].classList.remove('active');
    } 
  }
}

function loadEventListeners() {
  document.addEventListener('DOMContentLoaded', displayWorkout);

  const navUl = document.querySelector('.nav-ul');
  navUl.addEventListener('click', selectCollectionType);

  function selectCollectionType(e) {
    const type = e.target.id.slice(0, -4);

    if (rehab[type]) {
      toggleActivityClass();
      e.target.className = 'active';
    }
  }

  const redoBtn = document.getElementById('redo-btn');
  redoBtn.addEventListener('click', displayWorkout);
}

loadEventListeners();