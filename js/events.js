const circles = document.querySelectorAll('.circle')

// Random color function
const color = () => {
    const randomNum = Math.floor(Math.random() * 3)
    console.log(randomNum)
    const colors = ['red', 'yellow', 'green']
    return colors[randomNum]
}

// Detects if the browser used by the user is mobile
function detectMob() {
    const toMatch = [
        /Android/i,
        /webOS/i,
        /iPhone/i,
        /iPad/i,
        /iPod/i,
        /BlackBerry/i,
        /Windows Phone/i,
    ]

    return toMatch.some(toMatchItem => {
        return navigator.userAgent.match(toMatchItem)
    })
}

for (let circle of circles) {
    // Touch Start event listener
    circle.addEventListener('touchstart', function(event) {
        const col = `active-${color()}`
        event.target.classList.toggle(col)
        // Needed as both touch and mouse events will be fired
        if (event.cancelable) {
            event.preventDefault()
        }
        event.stopPropagation()
        event.cancelBubble()
    })

    // Touch End event listener
    circle.addEventListener('touchend', function(event) {
        event.target.classList.remove(event.target.classList[2])
        // Cancels the click listener
        if (event.cancelable) {
            event.preventDefault()
        }
        event.stopPropagation()
        event.cancelBubble()
    })

    if (!detectMob()) {
        circle.addEventListener('click', function() {
            let notification = document.querySelector('.notification')
            notification.classList.add('display')
            setTimeout(function() {
                notification.classList.remove('display')
            }, 2000)
        })
    }
}
