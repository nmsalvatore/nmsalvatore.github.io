'use strict';

// WORKOUT STRUCTURE
// #1   warm-up and/or cardio
// #2   activation
// #3   strength and/or cardio
// #4   cool-down

// APP STEPS
// #1   Determine cardio or strength workout √
// #2a  If cardio, set cardio workout, then skip warm-up √
// #2b  If strength, set strength workout, then set warm-up, then set activation √
// #3   Set cool-down

// Global variables

const randomize = (max) => Math.floor(Math.random() * max);

let strengthCategories;
let strengthMovements;

let typeOneScheme;
let typeOneMovements;

let typeTwoScheme;
let typeTwoMovements;

// Movements

const warmup = ['elliptical'];

const activation = {
	upper: [
		{
			movement: 'external rotations', 
			measureText: '20 reps, ',
		},
		{
			movement: 'banded pull-aparts', 
			measureText: '20 reps, ',
		},
	],
	lower: [
		{
			movement: 'good mornings', 
			measureText: '20 reps, ',
		},
		{
			movement: 'banded box squats', 
			measureText: '20 reps, ',
		},
		{
			movement: 'banded lateral walk', 
			measureText: '20 reps, ',
		},
		{
			movement: 'monster walk', 
			measureText: '20 reps, ',
		},
		{
			movement: 'single-leg glute bridges', 
			measureText: '15 reps each, ',
		},
	],
}

const cardio = {
	primary: ['elliptical', 'bike'],
	accessory: [
		{
			movement: 'pushups', 
			measureText: '8 reps, ',
		},
		{
			movement: 'pallof presses', 
			measureText: '15 reps, ',
		},
		{
			movement: 'pallof rotations', 
			measureText: '15 reps, ',
		},
		{
			movement: 'single-leg deadlifts', 
			measureText: '8 reps each, ',
		},
		{
			movement: 'goblet squats', 
			measureText: '15 reps, ',
		},
		{
			movement: 'good mornings', 
			measureText: '15 reps, ',
		},
	]
}

const strength = {
	push: [
		{
			movement: 'pushups',
			quantity: 8,
			measure: 'reps',
			type: 1,
			displayText: ['8 reps'],
		},
		{
			movement: 'bench press',
			quantity: 12,
			measure: 'reps', 
			type: 2,
			displayText: ['12 reps'],
		},
	],
	pull: [
		{
			movement: 'inverted rows', 
			quantity: 10,
			measure: 'reps', 
			type: 1,
			displayText: ['10 reps'],
		},
		{
			movement: 'seated cable rows', 
			quantity: 12,
			measure: 'reps', 
			type: 2,
			displayText: ['12 reps'],
		},
	],
	squat: [
		{
			movement: 'goblet squats',
			quantity: 15,
			measure: 'reps', 
			type: 1,
			displayText: ['15 reps'],
		},
		{
			movement: 'back squats',
			quantity: 12,
			measure: 'reps', 
			type: 2,
			displayText: ['12 reps'],
		},
	],
	hinge: [
		{
			movement: 'kettlebell RDLs',
			quantity: 15,
			measure: 'reps', 
			type: 1,
			displayText: ['15 reps'],
		},
	],
	lunge: [
		{
			movement: 'goblet lunges',
			quantity: 20,
			measure: 'steps', 
			type: 1,
			displayText: ['20 reps'],
		},
		{
			movement: 'dumbbell lunges', 
			quantity: 20,
			measure: 'steps', 
			type: 1,
			displayText: ['20 steps'],
		},
		{
			movement: 'split squats',
			quantity: 15,
			measure: 'reps each side', 
			type: 1,
			displayText: ['15 reps'],
		},
	],
	carry: [
		{
			movement: `farmer's walk`,
			quantity: 20,
			measure: 'steps', 
			type: 1,
			displayText: ['20 steps'],
		},
		{
			movement: 'front-loaded carry',
			quantity: 30,
			measure: 'steps', 
			type: 1,
			displayText: ['30 steps'],
		},
	],
}

const bikeWod = [
	'8 x 30/30 @ 350+ watts:',
	'8 x 20/20 @ 350+ watts:',
	'6 x 10 cal @ 350+ watts:',
	'5 x 14 cal @ 350+ watts:',
	'4 x 18 cal @ 350+ watts:',
];

// Allow user to set movement probabilities

function setMovementProb() {

}


// Determine cardio or strength workout

function getWodType() {
	const types = ['cardio', 'cardio', 'strength', 'strength', 'strength'];
	return types[randomize(types.length)];
}

// activation generator

function getActivationMovements() {
	const selected = [];

	for (let movement of activation.upper) {
		selected.push(movement);
	}

	for (let i = 0; i < 3; i++) {
		const random = randomize(activation.lower.length);
		const randomMovement = activation.lower[random];

		if (selected.includes(randomMovement)) {
			i = i - 1;
			continue;
		}

		selected.push(activation.lower[random]);
	}

	return selected;
}

// If cardio, set cardio workout, then skip warm-up

function setCardioWorkout() {
	return cardio.primary[randomize(cardio.primary.length)]
}

function setCardioAccessories() {
	const movements = [];

	for (let i = 0; i < 3; i++) {
		const random = randomize(cardio.accessory.length);
		const movement = cardio.accessory[random];

		if (movements.includes(movement)) {
			i = i - 1;
			continue;
		}

		movements.push(movement);
	}

	return movements;
}


// If strength, set strength workout, then set warm-up, then set activation

function setStrengthCategories(num) {
	strengthCategories = [];

	const categories = Object.keys(strength);

	for (let i = 0; i < num; i++) {
		const random = randomize(categories.length);
		const currentCategory = categories[random];

		if (strengthCategories.includes(currentCategory)) {
			i = i - 1;
			continue;
		}

		strengthCategories.push(currentCategory);
	};
}

function setStrengthMovements() {
	typeOneMovements = [];
	typeTwoMovements = [];

	for (let category of strengthCategories) {
		const random = randomize(strength[category].length);
		const movement = strength[category][random];

		if (movement.type === 1) typeOneMovements.push(movement);
		if (movement.type === 2) typeTwoMovements.push(movement);
	}
}

function setStrengthWorkout() {
	setStrengthCategories(3);
	setStrengthMovements();

	if (typeTwoMovements.length === 0) {
		typeOneScheme = '4 rounds:';
	}

	if ((typeOneMovements.length > 0) && (typeTwoMovements.length > 0)) {
		typeOneScheme = '3 rounds:';
	}

	if (typeOneMovements.length === 1) {
		typeTwoMovements.push(typeOneMovements[0]);
		typeOneMovements = [];
	}

	if (typeTwoMovements.length > 0) {
		for (let movement of typeTwoMovements) {
			movement.displayText.unshift('4 x ');
		}
	}
}


// display

function displayWorkout() {
	const workout = document.getElementById('workout');
	const wodType = getWodType();

	if (wodType === 'cardio') {
		const primaryCardioMovement = setCardioWorkout();
		const cardioUl = document.createElement('ul');
		const cardioLi = document.createElement('li');
		cardioLi.textContent = `35 minutes, ${primaryCardioMovement}`;
		cardioUl.appendChild(cardioLi);
		workout.appendChild(cardioUl);

		const accessoryRoundsUl = document.createElement('ul');
		const accessoryRoundsLi = document.createElement('li');
		accessoryRoundsLi.textContent = '2 rounds:';
		accessoryRoundsUl.appendChild(accessoryRoundsLi);
		workout.appendChild(accessoryRoundsUl);

		const accessoryCardioMovements = setCardioAccessories();
		const accessoryUl = document.createElement('ul');
		accessoryUl.className = 'accessory indent';

		for (let movement of accessoryCardioMovements) {
			const accessoryLi = document.createElement('li');
			accessoryLi.textContent = `${movement.measureText}${movement.movement}`;
			accessoryUl.appendChild(accessoryLi);
		}
		
		workout.appendChild(accessoryUl);

		const cooldownUl = document.createElement('ul');
		const cooldownLi = document.createElement('li');
		cooldownLi.textContent = `10 minute walk`;
		cooldownUl.classList.add('cooldown');
		cooldownUl.appendChild(cooldownLi);
		workout.appendChild(cooldownUl);
	} else {
		const random = randomize(3) + 2;

		setStrengthCategories(random);
		setStrengthMovements();
		setStrengthWorkout();

		const warmupUl = document.createElement('ul');
		const warmupLi = document.createElement('li');
		warmupLi.textContent = `10 minutes on elliptical`;
		warmupUl.classList.add('warmup');
		warmupUl.appendChild(warmupLi);
		workout.appendChild(warmupUl);

		const activationUl = document.createElement('ul');
		const activationMovements = getActivationMovements();
		activationUl.classList.add('activation');
		workout.appendChild(activationUl);

		activationMovements.forEach(function(movement) {
			const li = document.createElement('li');

			li.textContent = `${movement.measureText}${movement.movement}`;
			activationUl.appendChild(li);
		});

		if (typeTwoMovements.length > 0) {
			const typeTwoSchemeUl = document.createElement('ul');
			const typeTwoSchemeLi = document.createElement('li');
			typeTwoSchemeLi.textContent = typeTwoScheme;
			typeTwoSchemeUl.classList.add('scheme');
			typeTwoSchemeUl.appendChild(typeTwoSchemeLi);
			workout.appendChild(typeTwoSchemeUl);

			const typeTwoMovementsUl = document.createElement('ul');
			typeTwoMovementsUl.className = 'typetwo';
			workout.appendChild(typeTwoMovementsUl);

			typeTwoMovements.forEach(function(movement) {
				const li = document.createElement('li');

				li.textContent = `${movement.displayText.join('')}, ${movement.movement}`;
				typeTwoMovementsUl.appendChild(li);
			});
		}

		if (typeOneMovements.length > 0) {
			const typeOneSchemeUl = document.createElement('ul');
			const typeOneSchemeLi = document.createElement('li');
			typeOneSchemeLi.textContent = typeOneScheme;
			typeOneSchemeUl.classList.add('scheme');
			typeOneSchemeUl.appendChild(typeOneSchemeLi);
			workout.appendChild(typeOneSchemeUl);

			const typeOneMovementsUl = document.createElement('ul');
			typeOneMovementsUl.className = 'typeone indent';
			workout.appendChild(typeOneMovementsUl);

			typeOneMovements.forEach(function(movement) {
				const li = document.createElement('li');

				li.textContent = `${movement.displayText}, ${movement.movement}`;
				typeOneMovementsUl.appendChild(li);
			});
		}

		const bikeWodUl = document.createElement('ul');
		const bikeWodLi = document.createElement('li');
		bikeWodLi.textContent = bikeWod[randomize(bikeWod.length)];
		bikeWodUl.classList.add('bikeWod');
		bikeWodUl.appendChild(bikeWodLi);
		workout.appendChild(bikeWodUl);

		const bikeUl = document.createElement('ul');
		const bikeLi = document.createElement('li');
		bikeLi.textContent = 'echo bike';
		bikeUl.className = 'bike indent';
		bikeUl.appendChild(bikeLi);
		workout.appendChild(bikeUl);

		const cooldownUl = document.createElement('ul');
		const cooldownLi = document.createElement('li');
		cooldownLi.textContent = `10 minute walk`;
		cooldownUl.classList.add('cooldown');
		cooldownUl.appendChild(cooldownLi);
		workout.appendChild(cooldownUl);
	}
}

displayWorkout();


// testing tools

function checkWodFrequencies(val) {
	let cardio = 0;
	let strength = 0;

	for (let i = 0; i < val; i++) {
		const wod = getWodType();

		if (wod === 'cardio') cardio++;
		if (wod === 'strength') strength++;
	}

	console.log(`cardio: ${(cardio/val * 100).toFixed(0)}%, strength: ${(strength/val * 100).toFixed(0)}%`);
}


















