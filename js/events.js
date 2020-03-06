const circles = document.querySelectorAll('.circle')

// Random color function
const color = () => {
    const randomNum = Math.floor(Math.random() * 3)
    console.log(randomNum)
    const colors = ['red', 'yellow', 'green']
    return colors[randomNum]
}

for (let circle of circles) {
    // Touch Start event listener
    circle.addEventListener('touchstart', function(event) {
        const col = `active-${color()}`
        event.target.classList.toggle(col)
        // Needed as both touch and mouse events will be fired
        event.preventDefault()
    })

    // Touch End event listener
    circle.addEventListener('touchend', function(event) {
        event.target.classList.remove(event.target.classList[2])
        // Cancels the click listener
        event.preventDefault()
    })

    circle.addEventListener('click', function() {
        let notification = document.querySelector('.notification')
        notification.classList.add('display')
        setTimeout(function() {
            notification.classList.remove('display')
        }, 2000)
    })
}
