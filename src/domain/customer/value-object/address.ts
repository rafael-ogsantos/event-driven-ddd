export default class Address {

    _street: string;
    _number: number;    
    _zip: string
    _city: string;

    constructor(street: string, number: number, city: string, zip: string) {
        this._street = street;
        this._city = city;
        this._zip = zip;
        this._number = number;

        this.validate();    
    }

    get street() {
        return this._street;
    }

    get number() {
        return this._number;
    }

    get zip() {
        return this._zip;
    }

    get city() {
        return this._city;
    }

    validate() {
        if (this._street === '') {
            throw new Error('Street is required');
        }
        if (this._city === '') {
            throw new Error('City is required');
        }
        if (this._zip === '') {
            throw new Error('Zip is required');
        }
    }

    toString() {
        return `${this._street}, ${this._number}, ${this._zip} ${this._city}`;
    }
}