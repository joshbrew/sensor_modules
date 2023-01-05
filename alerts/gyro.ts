
let upperBound = 2000;
let lowerBound = -upperBound;


export const condition = (value) => (value < lowerBound) || ( value > upperBound)

export const message = (value) => `<h2>Gyroscope Alert</h2><p>Latest gyro value ${(value !== undefined) ? ` (${value})` : ''} is too high | <span>${new Date().toISOString()}</span></p>`
    
const gyroAlert = {
    condition,
    message,
    bufferLength: 0
}


export default gyroAlert