export { renderBackground, renderFont }

const getRandomHue = () => {
    return Math.floor(Math.random() * 361);
}

const hue = getRandomHue();

const getComplimentaryHue = (hue) => {
    if (hue - 180 < 0) {
        return hue + 180;
    }

    return hue - 180;
}

const hsl = `hsl(${hue}, 100%, 85%)`;

const renderBackground = (color = hsl) => {
    localStorage.setItem('bg-color', color);
    document.documentElement.style
        .setProperty('--bg-color', color);
}

const compHue = getComplimentaryHue(hue);
const compHsl = `hsl(${compHue}, 100%, 15%)`;

const renderFont = (color = compHsl) => {
    localStorage.setItem('font-color', color);
    document.documentElement.style
        .setProperty('--font-color', color);
}