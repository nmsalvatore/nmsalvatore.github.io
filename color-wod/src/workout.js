export { renderWorkout }

const warmup = [
    '10 banded rows w/ neck rotation',
    '20 external rotations, each side',
    '30 banded pull-apart',
    '40 glute bridges',
]

const workouts = [
    [
        '10 pushups',
        '20 good mornings',
        '30 air squats',
    ],
    [
        '10 diamond pushups',
        '20 deadlifts',
        '30 box squats',
    ],
    [
        '10 wide pushups',
        '20 air squats',
        '30 box step-ups',
    ],
]

const getRandomWorkout = () => {
    const index = Math.floor(Math.random() * workouts.length);
    const workout = workouts[index];

    localStorage.setItem('workout', JSON.stringify(workout));

    return workout;
}

const renderWorkout = (workout = getRandomWorkout()) => {
    renderWarmup();

    const ul = document.createElement('ul');
    const li = document.createElement('li');
    
    li.textContent = '3 rounds:';
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