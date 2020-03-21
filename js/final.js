/* Object definitions Start */
// Location class definition
class Location {
    constructor(country = null, state = null) {
        this.country = country
        this.state = state
    }
}

// Virus data
class VirusData {
    constructor(confirmed = 0, deaths = 0, recovered = 0) {
        this.confirmed = confirmed
        this.deaths = deaths
        this.recovered = recovered
    }
}

// DOM Elements
class DOMElements {
    constructor() {
        this.confirmedEl = document.querySelector('#confirmed')
        this.deathsEl = document.querySelector('#deaths')
        this.recoveredEl = document.querySelector('#recovered')
        this.locationEl = document.querySelector('#location')
    }
}

class Request {
    constructor(location = null, virusData = null) {
        this.location = location
        this.virusData = virusData
    }

    getData() {
        if (!this.location) {
            return fetch(
                `https://cors-anywhere.herokuapp.com/https://coronavirus-tracker-api.herokuapp.com/v2/latest`
            )
                .then(response => {
                    return response.json()
                })
                .then(data => data)
        } else {
            fetch(
                `https://coronavirus-tracker-api.herokuapp.com/v2/${this.location}`
            )
                .then(data => data.json())
                .then(response => console.log(response))
        }
    }
}
/* Object definitions End */

/* Listeners Start */

// Window onload and get DOM elements
document.querySelector('body').onload = function() {
    // get elements
    const elements = new DOMElements()
    // fetch data
    const req = new Request().getData()
    req.then(data => renderOnDom(data, elements))
    // renderOnDom
}

/* Listeners End */

/* Helper functions */
function renderOnDom({ latest }, elements) {
    elements.confirmedEl.textContent = latest.confirmed.toLocaleString()
    elements.deathsEl.textContent = latest.deaths.toLocaleString()
    elements.recoveredEl.textContent = latest.recovered.toLocaleString()
}
