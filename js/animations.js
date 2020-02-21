const state = new State()
// mousemove listener
document.body.addEventListener('mousemove', mouseHandler)
// get ball element
const ballEl = document.querySelector('.ball')
function mouseHandler(e) {
    const ballPos = ballEl.getBoundingClientRect()

    const cursorPos = {
        name: 'cursor',
        x: e.clientX,
        y: e.clientY,
    }
    const ball = {
        name: 'ball',
        x: ballPos.x,
        y: ballPos.y,
    }

    const distanceFromCenter = calcDistance(getCenter(ballPos), cursorPos)
    moveBall(ballPos, cursorPos)
}

function moveBall(ballPos, cursorPos) {
    const windowWidth = window.innerWidth
    const windowHeight = window.innerHeight
    // if the distance of x and y is equla or less than 120,
    // then get the coordinates of the center of the circle and add 25px for both x and y
    if (calcDistance(getCenter(ballPos), cursorPos).total <= 120) {
        if (calcDistance(getCenter(ballPos), cursorPos).x <= 150) {
            state.setState('x', 45)
            ballEl.style.transform = `
            translate(${state.getState('x')}px,
            ${0}px)
            `
            if (getCenter(ballPos).x >= windowWidth) {
                state.setState('x', state.getState('x') * -1)
                ballEl.style.transform = `
                translate(${state.getState('x')}px,
                ${state.getState('x')}px)
                `
            }
        }

        if (calcDistance(getCenter(ballPos), cursorPos).y <= 150) {
            state.setState('y', 45)
            ballEl.style.transform = `
            translate(${0}px,
            ${state.getState('y')}px)
            `
            if (getCenter(ballPos).y >= windowHeight) {
                state.setState('y', state.getState('y') * -1)
                ballEl.style.transform = `
                translate(${0}px,
                ${state.getState('y')}px)
                `
            }
        }
    }
}

function getCenter(ballPos) {
    let centerX = ballPos.width / 2 + ballPos.x
    let centerY = ballPos.height / 2 + ballPos.y
    const centerCoords = { x: centerX, y: centerY }
    return centerCoords
}

function calcDistance(centerCoords, cursorCoords) {
    let xDistance = Math.abs(centerCoords.x - cursorCoords.x)
    let yDistance = Math.abs(centerCoords.y - cursorCoords.y)
    const totalDistance = xDistance + yDistance
    return { total: totalDistance, x: xDistance, y: yDistance }
}

function Randomize(num) {
    return Math.floor(Math.random() * num) + 1
}

function State() {
    this.x = 0
    this.y = 0

    this.setState = function(key, value) {
        this[key] += value
    }

    this.getState = function(key) {
        return this[key]
    }
}
