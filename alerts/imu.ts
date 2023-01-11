
let upperBound = 50000;
let lowerBound = -upperBound;


export const condition = (value) => (value < lowerBound) || ( value > upperBound)

export const message = (value) => `<h2>IMU Alert</h2><p>Latest accelerometer magnitude ${(value !== undefined) ? ` (${value})` : ''} is too high | <span>${new Date().toISOString()}</span></p>`
    
export const bufferLength = 0
