export class Flight {
    constructor(
        public id: number,
        public departureAirport: string,
        public departureLocation: string,
        public departureTime: Date,
        public arrivalAirport: string,
        public arrivalLocation: string,
        public arrivalTime: Date,
        private _price: number,
        private _credits: number,
        private _departureCoordinates: { lat: number; lng: number },
        private _arrivalCoordinates: { lat: number; lng: number }
    ) {}

    public get price(): number {
        return this._price;
    }
    
    public set price(value: number) {
        this._price = value;
    }

    public get credits(): number {
        return this._credits;
    }

    public set credits(value: number) {
        this._credits = value;
    }

    public get departureCoordinates(): { lat: number; lng: number } {
        return this._departureCoordinates;
    }

    public get arrivalCoordinates(): { lat: number; lng: number } {
        return this._arrivalCoordinates;
    }
}

