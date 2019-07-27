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

const mobility = [
    {type: 'bar hang', reps: 5},
    {type: 'improved cobra', reps: 5},
    {type: 'side bend', reps: 5},
    {type: 'spine rotation', reps: 5},
    {type: 'later neck & trap stretch', reps: 5},
    {type: 'headache buster', reps: 5},
    {type: 'head turner', reps: 5},
    {type: 'chest opener', reps: 5},
    {type: 'overhead reach', reps: 5},
    {type: 'biceps & shoulder stretch', reps: 5},
    {type: 'shoulder blade & lat stretch', reps: 5},
    {type: 'upper back loosener', reps: 5},
    {type: 'wrist flexion', reps: 5},
    {type: 'wrist extension', reps: 5},
    {type: 'good morning hamstring stretch', reps: 5},
    {type: 'kneeling hip flexor stretch', reps: 5},
    {type: 'lunge hip flexor stretch', reps: 5},
    {type: 'karate stance hip flexor stretch', reps: 5},
    {type: 'karate stance groin stretch', reps: 5},
    {type: 'seated groin stretch', reps: 5},
    {type: 'calf stretch', reps: 5},
    {type: 'shin and instep stretch', reps: 5}
  ]

function displayWorkout(movementGroup) {
  const navUl = document.querySelector('.navbar .collection');

  for (let i = 0; i < 4; i++) {
    if (navUl.children[i].classList.contains('active')) {
      movementGroup = navUl.children[i].textContent;
    } 
  }

  const collection = document.getElementById('movement-collection');
  collection.innerHTML = null;

  // for (let key in rehab) {
  //   createNewList( rehab[key] );
  // }

  switch (movementGroup) {
    case 'rehab':
      createNewList(rehab.neck);
      createNewList(rehab.wrists);
      createNewList(getRandomMovements(rehab.back, 3));
      createNewList(getRandomMovements(rehab.core, 2));
      createNewList(getRandomMovements(rehab.chest, 1));
      createNewList(getRandomMovements(rehab.hips, 3));
      break;
    case 'mobility':
      createNewList(getRandomMovements(mobility, 5));
  }

  function createNewList(movementType) {
    const movementUl = document.createElement('ul');
    movementUl.className = 'collection';

    movementType.forEach(function createListItems(movement) {
      const movementLi = document.createElement('li');
      movementLi.className = 'collection-item';
     
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
  const navUl = document.querySelector('.navbar .collection');

  for (let i = 0; i < 4; i++) {
    if (navUl.children[i].classList.contains('active')) {
      navUl.children[i].classList.remove('active');
    } 
  }
}

function loadEventListeners() {
  document.addEventListener('DOMContentLoaded', displayWorkout('rehab'));

  const navUl = document.querySelector('.navbar .collection');
  navUl.addEventListener('click', selectCollectionType);

  function selectCollectionType(e) {
    toggleActivityClass();
    e.target.classList.add('active');

    const movementGroup = e.target.textContent;
    displayWorkout(movementGroup);
  }

  const redoBtn = document.getElementById('redo-btn');
  redoBtn.addEventListener('click', displayWorkout);
}

loadEventListeners();