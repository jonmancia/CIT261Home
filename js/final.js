/* Object definitions Start */
// Location class definition
class Location {
    constructor(country = null, country_code = 0, state = null) {
        this.country = country
        this.country_code = country_code
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
        this.locationTextEl = document.querySelector('#location-text')
    }
}

class Request {
    constructor(location = null, virusData = null) {
        this.location = location
        this.virusData = virusData
    }

    getData() {
        if (this.location == null || this.location.country == -1) {
            return fetch(
                `https://cors-anywhere.herokuapp.com/https://coronavirus-tracker-api.herokuapp.com/v2/latest`
            )
                .then(response => {
                    return response.json()
                })
                .then(data => data)
        } else if (this.location.country) {
            return fetch(
                `https://coronavirus-tracker-api.herokuapp.com/v2/locations?country_code=${this.location.country_code}`
            ).then(data => {
                return data.json()
            })
        }
    }

    getCountryData() {
        return fetch(
            'https://coronavirus-tracker-api.herokuapp.com/v2/locations'
        )
            .then(res => res.json())
            .then(data => {
                // Map of all locations by country
                const locationMap = {}
                const locations = data.locations
                // Loop through each obj and create a map
                // of all locations include states/provinces
                // the keys of map are country names
                for (let i = 0; i < locations.length; i++) {
                    if (!locationMap[locations[i]['country']]) {
                        locationMap[locations[i]['country']] = []
                        locationMap[locations[i]['country']].push(locations[i])
                    } else {
                        locationMap[locations[i]['country']].push(locations[i])
                    }
                }
                return locationMap
            })
    }
}
/* Object definitions End */

/* Listeners Start */

// Window onload and get DOM elements
document.querySelector('body').onload = function() {
    // get elements
    const elements = new DOMElements()

    // fetch data
    const req = new Request()

    // renderOnDom
    req.getData().then(data => renderOnDom(data, elements))

    // get Country, country id, and country_code
    req.getCountryData().then(data => {
        console.log(data)
        bindToDropdown(data, elements.locationEl)
    })
}

document.querySelector('#location').addEventListener('change', function(e) {
    // get elements
    const elements = new DOMElements()

    // change location-text
    elements.locationTextEl.textContent =
        e.target.options[e.target.options.selectedIndex].textContent

    // Create a location
    const location = new Location(
        e.target.options[e.target.options.selectedIndex].textContent,
        e.target.options[e.target.options.selectedIndex].value
    )
    // pass location
    const req = new Request(location)
    // make request with location
    req.getData().then(data => renderOnDom(data, elements))
})

/* Listeners End */

/* Helper functions */
function renderOnDom({ latest }, elements) {
    elements.confirmedEl.textContent = latest.confirmed.toLocaleString()
    elements.deathsEl.textContent = latest.deaths.toLocaleString()
    elements.recoveredEl.textContent = latest.recovered.toLocaleString()
}
// Sort data from response by alphabetical order
function sortDataByKey(data) {
    const orderedData = {}
    Object.keys(data)
        .sort()
        .forEach(key => (orderedData[key] = data[key]))
    return orderedData
}
// Bind countries to dropdown
function bindToDropdown(data, element) {
    const sortedData = sortDataByKey(data)
    for (let country in sortedData) {
        const el = document.createElement('option')
        el.setAttribute('value', sortedData[country][0]['country_code'])
        const text = document.createTextNode(country)
        el.appendChild(text)
        element.appendChild(el)
    }
}
