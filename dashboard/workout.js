// -------- global methods -------

const random = (min, max) => Math.floor(Math.random() * (max - min)) + min;

// -------- workout type ---------

const wodType = ['strength', 'strength', 'strength', 'rest', 'rest'];

// ---------- movements ----------

const activation = {
    push: [ 
        { movement: 'pushups with tempo',
          measure: '3 reps', },
    ],
    pull: [ 
        { movement: 'banded pull-aparts',
          measure: '20 reps' },
        { movement: 'reverse chest flys',
          measure: '20 reps' },
        { movement: 'banded rows',
          measure: '20 reps' },
        { movement: 'banded external rotation',
          measure: '20 reps each' },
        { movement: 'dumbbell external rotation',
          measure: '20 reps each' },
    ],
    legs: [
        { movement: 'banded box squats', 
          measure: '20 reps' },
        { movement: 'banded lateral walk',
          measure: '20 reps' },
        { movement: 'monster walk',
          measure: '20 reps', },
        { movement: 'single-leg glute bridges',
          measure: '15 reps each', },
        { movement: 'single-leg deadlifts', 
          measure: '10 reps each' },
        { movement: 'good mornings',
          measure: '15 reps',
          type: 'legs', },
    ],
}

const strength = {
    push: [ 
        { movement: 'pushups',
          measure: '8 reps',
          type: 'arms' },
        { movement: 'pushups on blocks',
          measure: '8 reps',
          type: 'arms' },
    ],
    pull: [ 
        { movement: 'inverted rows',
          measure: '12 reps',
          type: 'arms', },
        { movement: 'weight plate rows',
          measure: '15 reps',
          type: 'arms', },
    ],
    squat: [
        { movement: 'air squats', 
          measure: '30 reps', 
          type: 'legs', },
        { movement: 'goblet squats',
          measure: '15 reps', 
          type: 'legs', },
    ],
    hinge: [ 
        { movement: 'kettlebell RDLs',
          measure: '15 reps',
          type: 'legs', },
    ],
    lunge: [ 
        { movement: 'reverse goblet lunges', 
          measure: '20 reps', 
          type: 'legs', },
        { movement: 'walking goblet lunges',
          measure: '20 steps',
          type: 'legs', },
        { movement: 'box step-ups',
          measure: '20 steps',
          type: 'legs', },
        { movement: 'split squat',
          measure: '20 reps', }
    ],
    carry: [
        { movement: 'front-loaded carry', 
          measure: '200m',
          type: 'legs', },
        { movement: `farmer's carry`,
          measure: '200m',
          type: 'legs', },
    ],
}

const mobility = {
    overhead: [ 
      { movement: 'arms extended overhead',
        measure: '10 seconds', },
      { movement: 'side bend',
        measure: '10 seconds, each side', },
    ],
    chest: [ 
      { movement: 'straight arms, upper back contraction',
        measure: '10 seconds' },
      { movement: 'bent arms, upper back contraction',
        measure: '10 seconds' },
    ],
    frack: [ 
      { movement: 'front rack',
        measure: '10 seconds', },
    ],
    squat: [ 
      { movement: 'lizard stretch', 
        measure: '20 seconds, each side' },
      { movement: 'pigeon stretch',
        measure: '20 seconds, each side' },
      { movement: 'bodyweight squat',
        measure: '20 seconds', }
    ],
  lunge: [
      { movement: 'cobra stretch', 
        measure: '10 seconds' },
      { movement: 'samson stretch',
        measure: '20 seconds, each side' },
      { movement: 'quad stretch',
        measure: '10 seconds, each side' },
    ],
  hamstrings: [
      { movement: 'forward bend', 
        measure: '10 seconds' },
      { movement: 'cobra stretch', 
          measure: '10 seconds' },
    ]
}

const strengthFinal = [];
const activationFinal = [];
const mobilityFinal = [];

// ---------- event listeners ----------

document.addEventListener('DOMContentLoaded', function() {
    if (wodType[random(0, wodType.length)] === 'strength') {
        displayWorkout(strength, random(2,4));
    } else {
        const options = ['Go on a long walk.', 'Go on a short bike ride.']
        createHeader(options[random(0,2)]);
    }
});

const mobilityBtn = document.getElementById('mobility-btn');
const workoutBtn = document.getElementById('workout-btn');

mobilityBtn.addEventListener('click', function() {
    if (!mobilityBtn.classList.contains('active'))  {
        toggleFitnessButtons();
        displayWorkout(mobility, 3);
    }
});

workoutBtn.addEventListener('click', function() {
    if (!workoutBtn.classList.contains('active'))  {
        toggleFitnessButtons();
        displayWorkout(strength, random(2,4));
    }
});


// ---------- DOM methods ----------

function toggleFitnessButtons() {
    mobilityBtn.classList.toggle('active');
    workoutBtn.classList.toggle('active');
}

function displayWorkout(type, num) {    
    const wod = document.getElementById('wod');
    wod.innerHTML = '';

    if (type == mobility) {
        setMovements(type, num);
        createHeader('Roll for 3 minutes', 'warmup');
        createHeader('3 rounds:')
        createMovementList(type, num);
        return;
    }

    if (type == strength) {
        createHeader('800m run', 'warmup');

        setMovements(activation, 3);
        createHeader('3 rounds:')
        createMovementList(activation, 3);

        setMovements(type, num);
        strengthFinal.length == 2 ? createHeader('5 rounds:') : createHeader('4 rounds:');
        createMovementList(type, num);

        createHeader('10 minute walk', 'cooldown');
    }
}

function createHeader(text, classText = 'movement-list-header') {
    header = document.createElement('h3');
    header.textContent = text;
    header.className = classText;
    wod.appendChild(header);
}

function createMovementList(type, num) {
    let movements;

    const ul = document.createElement('ul');
    ul.className = 'movement-list'; 

    if (type == strength) movements = strengthFinal;
    if (type == mobility) movements = mobilityFinal;
    if (type == activation) movements = activationFinal;

    movements.forEach(function(movement) {
        const li = document.createElement('li');
        li.className = 'movement';
        li.textContent = `${movement.measure}, ${movement.movement}`;
        ul.appendChild(li);
    });

    wod.appendChild(ul);
}

// ---------- app methods ---------- 

function setMovements(type, num) {
    if (type == strength) strengthFinal.length = 0;
    if (type == mobility) mobilityFinal.length = 0;
    if (type == activation) activationFinal.length = 0;

    const categories = getMultipleCategories(type, num);

    for (let category of categories) {
        const selectedCategory = type[category];
        const randomIndex = random(0,selectedCategory.length);
        const randomMovement = selectedCategory[randomIndex];

        if (type == strength) strengthFinal.push(randomMovement);
        if (type == mobility) mobilityFinal.push(randomMovement);
        if (type == activation) activationFinal.push(randomMovement);
    }
}


function getMultipleCategories(type, num) {
    const categories = [];

    for (let i = 0; i < num; i++) {
        const category = getRandomCategory(type);

        if (categories.includes(category)) {
            i--;
            continue;
        }

        categories.push(category);
    }

    return categories;
}


function getRandomCategory(type) {
    const categories = Object.keys(type);
    const random = Math.floor(Math.random() * categories.length);

    return categories[random]
}