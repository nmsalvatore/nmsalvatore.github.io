import { renderWorkout } from './workout.js';
import { renderBackground } from './background.js';
import { checkForSameDay } from './date.js';

const isSameDay = checkForSameDay();

if (isSameDay) {
    const workout = JSON.parse(localStorage.getItem('workout'));
    const bgColor = localStorage.getItem('bg-color');

    renderBackground(bgColor);
    renderWorkout(workout);
} else {
    renderBackground();
    renderWorkout();
}
