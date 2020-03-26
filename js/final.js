/* Object definitions Start */
// Location class definition
class Location {
    constructor(country = null, country_code = 0, state = null) {
        this.country = country
        this.country_code = country_code
        this.state = state
        this.id = null
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
        this.countryLocationEl = document.querySelector('#country-location')
        this.stateLocationEl = document.querySelector('#state-location')
        this.stateTextEl = document.querySelector('.state-text')
        this.countryTextEl = document.querySelector('.country-text')
    }
}

class Request {
    constructor(location = null, virusData = null) {
        this.location = location
        this.virusData = virusData
    }

    getData() {
        const elements = new DOMElements()
        elements.confirmedEl.textContent = 'Loading...'
        elements.deathsEl.textContent = 'Loading...'
        elements.recoveredEl.textContent = 'Loading...'

        if (this.location == null || this.location.country == -1) {
            return fetch(
                `https://cors-anywhere.herokuapp.com/https://coronavirus-tracker-api.herokuapp.com/v2/latest`
            )
                .then(response => {
                    return response.json()
                })
                .then(data => data)
        } else if (this.location.id) {
            return fetch(
                `https://cors-anywhere.herokuapp.com/https://coronavirus-tracker-api.herokuapp.com/v2/locations/${this.location.id}`
            )
                .then(response => {
                    return response.json()
                })
                .then(data => data)
        } else if (this.location.country) {
            return fetch(
                `https://cors-anywhere.herokuapp.com/https://coronavirus-tracker-api.herokuapp.com/v2/locations?country_code=${this.location.country_code}`
            )
                .then(data => {
                    return data.json()
                })
                .then(data => data)
        }
    }

    getCountryData() {
        if (this.location && this.location.country == 'US') {
            return fetch(
                'https://cors-anywhere.herokuapp.com/https://coronavirus-tracker-api.herokuapp.com/v2/locations?source=csbs'
            )
                .then(res => res.json())
                .then(data => {
                    const stateMap = {}
                    console.log(data['locations'])
                    data['locations'].reduce((acc, current) => {
                        if (!stateMap[current['province']]) {
                            return (stateMap[current['province']] = {
                                confirmed: current['latest']['confirmed'],
                                deaths: current['latest']['deaths'],
                                recovered: current['latest']['recovered'],
                            })
                        }
                        stateMap[current['province']]['confirmed'] +=
                            current['latest']['confirmed']
                        stateMap[current['province']]['deaths'] +=
                            current['latest']['deaths']
                        stateMap[current['province']]['recovered'] +=
                            current['latest']['recovered']
                    }, stateMap)
                    return stateMap
                })
                .catch(err =>
                    alert(
                        'I apologize for the inconvenience, the server is down'
                    )
                )
        } else {
            return fetch(
                'https://cors-anywhere.herokuapp.com/https://coronavirus-tracker-api.herokuapp.com/v2/locations'
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
                            locationMap[locations[i]['country']].push(
                                locations[i]
                            )
                        } else {
                            locationMap[locations[i]['country']].push(
                                locations[i]
                            )
                        }
                    }
                    return locationMap
                })
                .catch(err =>
                    alert(
                        'I apologize for the inconvenience, the server is down'
                    )
                )
        }
    }
}
/* Object definitions End */

/* Listeners Start */

// Window onload and get DOM elements
document.querySelector('body').onload = function() {
    getUserData().then(data => console.log(data))
    // get elements
    const elements = new DOMElements()

    // fetch data
    const req = new Request()

    // renderOnDom
    req.getData().then(data => renderOnDom(data, elements))

    // get Country, country id, and country_code
    req.getCountryData().then(data => {
        bindCountriesToDropdown(data, elements.countryLocationEl)
    })
}

document
    .querySelector('#country-location')
    .addEventListener('change', function(e) {
        // get elements
        const elements = new DOMElements()

        // remove prevous state location text
        // change location-text
        elements.stateTextEl.textContent = ''
        // change location-text
        elements.countryTextEl.textContent =
            e.target.options[e.target.options.selectedIndex].textContent

        const countryName =
            e.target.options[e.target.options.selectedIndex].textContent
        const countryId = e.target.options[e.target.options.selectedIndex].value

        // Create a location
        const location = new Location(countryName, countryId)

        // pass location
        const req = new Request(location)
        // make request with location

        if (countryName == '---') {
            req.getData().then(data => renderOnDom(data, elements))
            return
        }

        if (countryName == 'US') {
            req.getCountryData().then(data => {
                const obj = {}
                obj['latest'] = data
                bindStatesToDropdown(obj, elements.stateLocationEl)
            })
            // render data on DOM
            req.getData().then(data => renderOnDom(data, elements))
        } else {
            req.getCountryData().then(data => {
                bindStatesToDropdown(
                    data[location.country],
                    elements.stateLocationEl
                )
            })
            req.getData().then(data => renderOnDom(data, elements))
        }
    })

// State dropdown listener
document
    .querySelector('#state-location')
    .addEventListener('change', function(e) {
        // get elements
        const elements = new DOMElements()

        // get state id
        let id = e.target.options[e.target.options.selectedIndex].value

        // set location
        const location = new Location()
        location.id = id

        // get request object
        const req = new Request(location)

        if (id < 0) {
            return
        }

        // change location-text
        elements.stateTextEl.textContent =
            e.target.options[e.target.options.selectedIndex].textContent + ', '

        if (
            elements.countryLocationEl.options[
                elements.countryLocationEl.options.selectedIndex
            ].textContent != 'US'
        ) {
            // get data and render
            req.getData().then(({ location }) => {
                renderOnDom(location, elements)
            })
        } else {
            const stateInfo = JSON.parse(localStorage.getItem('stateInfo'))
            const obj = {}
            obj['latest'] = stateInfo[id]
            renderOnDom(obj, elements)
        }
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
function bindCountriesToDropdown(data, element) {
    const sortedData = sortDataByKey(data)
    for (let country in sortedData) {
        const el = document.createElement('option')
        el.setAttribute('value', sortedData[country][0]['country_code'])
        const text = document.createTextNode(country)
        el.appendChild(text)
        element.appendChild(el)
    }
}

// Bind states/provinces to dropdown
function bindStatesToDropdown(data, element) {
    // unbind previous states/provincess
    const elements = new DOMElements()
    for (let i = elements.stateLocationEl.options.length - 1; i >= 0; i--) {
        if (elements.stateLocationEl.options[i].value != '-1')
            elements.stateLocationEl.remove(i)
    }
    let sortedData
    if (data['latest']) {
        sortedData = sortDataByKey(data.latest)
        // save sorted data to local storage to later pull from it
        localStorage.setItem('stateInfo', JSON.stringify(sortedData))
        for (let state in sortedData) {
            const el = document.createElement('option')
            el.setAttribute('value', state)
            const text = document.createTextNode(state)
            el.appendChild(text)
            element.appendChild(el)
        }
    } else {
        // alphabetize list
        sortedData = data.sort((a, b) =>
            a['province'] > b['province'] ? 1 : -1
        )
        // add states/provinces to dropdown
        for (let state in sortedData) {
            if (
                // this regex necessary as not only states but cities are returned from api call
                !sortedData[state]['province'].match(/,/) &&
                sortedData[state]['province'].length != 0
            ) {
                const el = document.createElement('option')
                el.setAttribute('value', sortedData[state]['id'])
                const text = document.createTextNode(
                    sortedData[state]['province']
                )
                el.appendChild(text)
                element.appendChild(el)
            }
        }
    }
}

async function getUserData() {
    let userData
    try {
        userData = await fetch('https://randomuser.me/api/?nat=gb').then(data =>
            data.json()
        )
    } catch (err) {
        console.log(err)
    }

    return userData
}
