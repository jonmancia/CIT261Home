function getCanvas() {
    return document.getElementById('canvas')
}

function init() {
    const canvas = getCanvas()
    if (canvas.getContext) {
        const ctx = canvas.getContext('2d')
        ctx.lineWidth = 8
        ctx.strokeStyle = '#61DBFB'

        ctx.beginPath()
        ctx.ellipse(75, 72, 60, 20, Math.PI * 0.33, 0, Math.PI * 2)
        ctx.stroke()

        ctx.beginPath()
        ctx.ellipse(75, 72, 60, 20, Math.PI * 0.67, 0, Math.PI * 2)
        ctx.stroke()

        ctx.beginPath()
        ctx.ellipse(73, 72, 60, 20, Math.PI * 1, 0, Math.PI * 2)
        ctx.stroke()

        ctx.beginPath()
        ctx.fillStyle = '#61DBFB'
        // Circle in middle
        ctx.arc(75, 72, 8, 0, Math.PI * 2)
        ctx.fill()
    } else {
        canvas.innerHTML = 'Unsupported'
    }
}

window.onload = function() {
    this.init()
}
