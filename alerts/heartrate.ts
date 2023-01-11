
let upperBound = 150;
let lowerBound = 25;

export const condition = (value) => (value < lowerBound) || ( value > upperBound);

export const message = (value) => {
    const relativeString = value < lowerBound ? 'too low' : 'too high';
    return `<h2>Heart Rate Alert</h2><p>Average heart rate${(value !== undefined) ? ` (${value})` : ''} is ${relativeString} | <span>${new Date().toISOString()}</span></p>`
}

export const bufferLength = 5