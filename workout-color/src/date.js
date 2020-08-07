export { checkForSameDay }

const getDate = () => {
    const date = new Date;
    const today = date.toLocaleDateString();

    return today;
}

const checkForSameDay = () => {
    const today = getDate();
    const date = localStorage.getItem('date');

    if (today === date) {
        return true;
    } else {
        localStorage.setItem('date', today);
        return false;
    }

}