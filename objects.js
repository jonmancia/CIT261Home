/**
 * Name: Vehicle
 * Type: Class
 * Description: Vehicle object will encapsulate vin or year, make, and model
 * for the vehicle information entered by user
 */
class Vehicle {
  constructor() {
    let _vin;
    let _year;
    let _make;
    let _model;
  }

  get vin() {
    return this._vin;
  }

  set vin(vin) {
    this._vin = vin;
  }

  get year() {
    return this._year;
  }

  set year(year) {
    this._year = year;
  }

  get make() {
    return this._make;
  }

  set make(make) {
    this._make = make;
  }
}

/**
 * Name: FormElements
 * Type: Class
 * Description: FormElement Object will contain all the DOM form elements needed when object is created
 */
class FormElements {
  constructor() {
    this._vin = document.getElementById('vinEl').value;
    this._year = document.getElementById('yearEl').value;
    this._make = document.getElementById('makeEl').value;
    this._model = document.getElementById('modelEl').value;
  }

  get vin() {
    return this._vin;
  }

  get year() {
    return this._year;
  }

  get make() {
    return this._make;
  }

  get model() {
    return this._model;
  }
}

class Request {
  constructor() {
    this.vehicle;
  }

  make() {
    const request = new XMLHttpRequest();
    request.onreadystatechange = function() {
      if (this.status == 200 && this.readyState == 4) {
        console.log(this.responseText);
      } else {
        console.log(this.status);
      }
    };
    request.open(
      'GET',
      'http://api.carmd.com/v3.0/recall?year=2012&make=toyota&model=camry',
      true
    );
    request.setRequestHeader('content-type', 'application/json');
    request.setRequestHeader(
      'authorization',
      'Basic ZDU3MjdkMzQtYThkZS00ZTdhLTg1OGMtNDYyMmNmOGI2MWUz'
    );
    request.setRequestHeader(
      'partner-token',
      '1dd194b079464e86a667583419f6697e'
    );
    request.send();
  }
}
