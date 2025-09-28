
function extractTime(rawTime) {
    const time = new Date(rawTime);

    let hours = time.getHours();
    let minutes = time.getMinutes();
    const meridian = hours >= 12 ? "PM" : "AM";

    hours = hours % 12 || 12;

    const formattedTime = `${padZero(hours)}:${padZero(minutes)} ${meridian}`;

    return formattedTime;
}

function padZero(num) {
    return (num < 10 ? "0" : "") + num;
}

export { extractTime }