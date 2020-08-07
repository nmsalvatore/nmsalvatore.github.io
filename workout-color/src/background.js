export { renderBackground }

const getRandomColor = () => {
    const chars = ['c','d','e'];
    const result = ['#'];

    for (let i = 0; i < 3; i++) {
        const index = Math.floor(Math.random() * chars.length);
        result.push(chars[index]);
    }

    return result.join('');
}

const randomColor = getRandomColor();

const renderBackground = (color = randomColor) => {
    localStorage.setItem('bg-color', color);

    document.documentElement.style
        .setProperty('--bg-color', color);
}