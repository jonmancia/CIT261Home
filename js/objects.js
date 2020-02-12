/**
 * Name: User
 * Description: User object will encapsulate gender, first and last name, email,
 * age, and other values for application
 */
class User {
    constructor(userInfo) {
        this.name = `${userInfo.name.first} ${userInfo.name.last}`
        this.email = userInfo.email
        this.username = userInfo.login.username
        this.age = new Date(userInfo.dob.date).toLocaleDateString()
        this.image = userInfo.picture.large
        this.address = `${userInfo.location.street.number} ${userInfo.location.street.name}, ${userInfo.location.city}, ${userInfo.location.state}, ${userInfo.location.country} ${userInfo.location.postcode}`
        this.phoneNumber = userInfo.cell
    }
}

/**
 * Name: FormElements
 * Type: Class
 * Description: FormElement Object will contain all the DOM form elements needed when object is created
 */
class SelectedFormElements {
    constructor() {
        this._genderEl
        this._nationalityEl
        document
            .getElementById('user-form__submit')
            .addEventListener('click', e => {
                this.getElements()
                onFormSubmit(e, {
                    gender: this._genderEl,
                    nationality: this._nationalityEl,
                })
            })
    }

    getElements() {
        this._genderEl = [...document.getElementsByName('gender')].filter(
            option => option.checked
        )[0]
        this._nationalityEl = [
            ...document.getElementById('user-form__nationality').options,
        ].filter(option => option.selected)[0]
    }
}

class Request {
    constructor(userValues) {
        this.values = userValues
    }

    make() {
        fetch(
            `https://randomuser.me/api/?gender=${this.values.gender}&nat=${this.values.nationality}`
        )
            .then(response => {
                return response.json()
            })
            .then(response => {
                const userData = response.results[0]
                const user = new User(userData)
                renderOnDOM(user)
            })
            .catch(err => {
                //alert('There was an error with your request. ' + err)
                document.querySelector(
                    '.user-container'
                ).innerHTML = `Please try again later. ${err}`
            })
    }
}

/**
 * Name: onFormSubmit
 * Description: Function prevents default form submit behavior and calls getFormValues
 * Parameters: Event object, and elements containing the values from the DOM
 * Returns: None
 */
function onFormSubmit(event, elements) {
    event.preventDefault()
    //Pass DOM elements containing gender and nationality values entered by user
    const userInputValues = getFormValues(elements)
    // Create request object with input values
    const request = new Request(userInputValues)
    // make request
    request.make()
}

/**
 * Name: getFormValues
 * Description: Creates object with key value pairs based on form elements passed
 * Parameters: Object
 * Returns: Object Ex. {gender: 'female', 'br'}
 */
function getFormValues(elements) {
    let formValues = {}
    for (let element in elements) {
        formValues[element] = elements[element].value
    }
    return formValues
}

// Construct Form Elements
const form = new SelectedFormElements()

function renderOnDOM(user) {
    for (let key in user) {
        if (key != 'image') {
            try {
                document.querySelector('.user-container__' + key).innerHTML =
                    user[key]
            } catch (error) {
                //in case, document.queryselector result is null
                let element = document.createElement('p')
                element.setAttribute('class', 'user-container__' + key)
                document
                    .querySelector('.user-container')
                    .appendChild(element).innerHTML = user[key]
            }
        } else {
            document.querySelector('.user-container__' + key).src = user[key]
        }
    }
    document.querySelector('.user-container').classList.remove('hidden')
    document.querySelector('.user-container').classList.add('show')
}
