import { renderWorkout } from './workout.js';
import { renderBackground, renderFont } from './colors.js';
import { checkForSameDay } from './date.js';

const isSameDay = checkForSameDay();

if (isSameDay) {
    const workout = JSON.parse(localStorage.getItem('workout'));
    const bgColor = localStorage.getItem('bg-color');
    const fontColor = localStorage.getItem('font-color');

    renderBackground(bgColor);
    renderFont(fontColor);
    renderWorkout(workout);
} else {
    renderBackground();
    renderFont();
    renderWorkout();
}