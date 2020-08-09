export { renderWorkout }

const warmup = [
    '10 banded rows w/ neck rotation',
    '20 external rotations, each side',
    '30 banded pull-apart',
    '40 glute bridges',
]

const movements = {
    tens: [
        'pushups',
        'diamond pushups',
        'wide pushups',
    ],
    twenties: [
        'air squats', 
        'good mornings', 
        'box squats', 
        'deadlifts', 
        'split squats', 
        'lunges', 
        'box step-ups',
    ],
    thirties: [
        'air squats',
        'box step-ups',
        'box squats',
        'lunges',
    ],
}

const createWod = () => {
    const movements = getMovements();
    const wod = [];

    let reps = 10;

    if (movements.length === 3) {
        for (let movement of movements) {
            wod.push(reps + ' ' + movement);
            reps += 10;
        }
    } else if (movements.length === 2) {
        for (let movement of movements) {
            wod.push(reps + ' ' + movement);
            reps = 50;
        }
    }

    localStorage.setItem('workout', JSON.stringify(wod));

    return wod;
}

const getMovements = () => {
    const sets = Object.keys(movements);
    const arr = [];

    for (let set of sets) {
        const movement = getMovement(movements[set]);

        if (arr.includes(movement)) continue;

        arr.push(movement);
    }
    
    return arr;
}

const getMovement = (set) => {
    const index = Math.floor(Math.random() * set.length);
    const movement = set[index];

    return movement;
}

const renderWorkout = (workout = createWod()) => {
    renderWarmup();

    const ul = document.createElement('ul');
    const li = document.createElement('li');
    
    li.textContent = '4 rounds:';
    ul.appendChild(li);

    for (let movement of workout) {
        const li = document.createElement('li');
        li.textContent = movement;
        ul.appendChild(li);
    }

    workoutDisplay.appendChild(ul);

    function renderWarmup() {
        const ul = document.createElement('ul');
        ul.classList.add('warmup-ul');
        
        const li = document.createElement('li');
        li.textContent = 'Warm up:';
        ul.appendChild(li);
        
        for (let movement of warmup) {
            const li = document.createElement('li');
            li.textContent = movement;
            ul.appendChild(li);
        }

        workoutDisplay.appendChild(ul);
    }
}