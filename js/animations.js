// mousemove listener
document.body.addEventListener('mousemove', mouseHandler)
// get ball element
const ballEl = document.querySelector('.ball')
function mouseHandler(e) {
    // get the position of the ball (x and y coordinates)
    const ballPos = ballEl.getBoundingClientRect()

    // get the position of the cursor
    const cursorPos = {
        name: 'cursor',
        x: e.clientX,
        y: e.clientY,
    }
    // Move the ball
    moveBall(ballPos, cursorPos)
}

function moveBall(ballPos, cursorPos) {
    // get the height and width of container where ball is found
    const windowWidth = document.querySelector('.ball-container').offsetWidth
    const windowHeight = document.querySelector('.ball-container').offsetHeight

    // if the total distance of x and y is equal or less than 120,
    // then get the coordinates of the center of the circle and randomize the position in x and y
    if (calcDistance(getCenter(ballPos), cursorPos).total <= 120) {
        // if the distance from the cursor's x and the ball's x is less than or equal to 150,
        // change the position of the ball
        if (calcDistance(getCenter(ballPos), cursorPos).x <= 150) {
            const randomWidth = Randomize(windowWidth)
            const randomHeight = Randomize(windowHeight)
            // assign random width and height
            ballEl.style.left = randomWidth + 'px'
            ballEl.style.top = randomHeight + 'px'
        }
    }
}
// get center of ball
function getCenter(ballPos) {
    let centerX = ballPos.width / 2 + ballPos.x
    let centerY = ballPos.height / 2 + ballPos.y
    const centerCoords = { x: centerX, y: centerY }
    return centerCoords
}

// calculate the combine distance between the cursor's coordinates and the ball's coordinates
function calcDistance(centerCoords, cursorCoords) {
    let xDistance = Math.abs(centerCoords.x - cursorCoords.x)
    let yDistance = Math.abs(centerCoords.y - cursorCoords.y)
    const totalDistance = xDistance + yDistance
    return { total: totalDistance, x: xDistance, y: yDistance }
}

// randomizes up to parameter specified inclusive
function Randomize(num) {
    return Math.floor(Math.random() * num) + 1
}
