const flights = [
    {
        id: 1,
        departureAirport: 'FCO',
        departureLocation: 'Rome, Italy',
        departureTime: new Date('2024-11-05T14:30:00'),
        arrivalAirport: 'NRT',
        arrivalLocation: 'Tokyo, Japan',
        arrivalTime: new Date('2024-11-06T02:30:00'), // 12 ore di volo
        price: 1100, // Prezzo rivisto in euro
        credits: 18 // 12 ore * 1.5
    },
    {
        id: 2,
        departureAirport: 'FCO',
        departureLocation: 'Rome, Italy',
        departureTime: new Date('2024-11-10T14:30:00'),
        arrivalAirport: 'MXP',
        arrivalLocation: 'Milan, Italy',
        arrivalTime: new Date('2024-11-10T15:30:00'), // 1 ora di volo
        price: 100, // Prezzo rivisto in euro
        credits: 1.5 // 1 ora * 1.5
    },
    {
        id: 3,
        departureAirport: 'FCO',
        departureLocation: 'Rome, Italy',
        departureTime: new Date('2024-11-15T14:30:00'),
        arrivalAirport: 'JFK',
        arrivalLocation: 'New York, USA',
        arrivalTime: new Date('2024-11-15T22:30:00'), // 8 ore di volo
        price: 750, // Prezzo rivisto in euro
        credits: 12 // 8 ore * 1.5
    },
    {
        id: 4,
        departureAirport: 'MXP',
        departureLocation: 'Milan, Italy',
        departureTime: new Date('2024-12-01T14:30:00'),
        arrivalAirport: 'NRT',
        arrivalLocation: 'Tokyo, Japan',
        arrivalTime: new Date('2024-12-02T02:30:00'), // 12 ore di volo
        price: 1150, // Prezzo rivisto in euro
        credits: 18 // 12 ore * 1.5
    },
    {
        id: 5,
        departureAirport: 'MXP',
        departureLocation: 'Milan, Italy',
        departureTime: new Date('2025-01-10T14:30:00'),
        arrivalAirport: 'JFK',
        arrivalLocation: 'New York, USA',
        arrivalTime: new Date('2025-01-10T23:30:00'), // 9 ore di volo
        price: 800, // Prezzo rivisto in euro
        credits: 13.5 // 9 ore * 1.5
    },
    {
        id: 6,
        departureAirport: 'JFK',
        departureLocation: 'New York, USA',
        departureTime: new Date('2025-02-01T14:30:00'),
        arrivalAirport: 'FCO',
        arrivalLocation: 'Rome, Italy',
        arrivalTime: new Date('2025-02-01T22:30:00'), // 8 ore di volo
        price: 700, // Prezzo rivisto in euro
        credits: 12 // 8 ore * 1.5
    },
    {
        id: 7,
        departureAirport: 'JFK',
        departureLocation: 'New York, USA',
        departureTime: new Date('2025-03-15T14:30:00'),
        arrivalAirport: 'MXP',
        arrivalLocation: 'Milan, Italy',
        arrivalTime: new Date('2025-03-15T23:30:00'), // 9 ore di volo
        price: 800, // Prezzo rivisto in euro
        credits: 13.5 // 9 ore * 1.5
    },
    {
        id: 8,
        departureAirport: 'NRT',
        departureLocation: 'Tokyo, Japan',
        departureTime: new Date('2025-04-01T14:30:00'),
        arrivalAirport: 'FCO',
        arrivalLocation: 'Rome, Italy',
        arrivalTime: new Date('2025-04-02T02:30:00'), // 12 ore di volo
        price: 1150, // Prezzo rivisto in euro
        credits: 18 // 12 ore * 1.5
    },
    {
        id: 9,
        departureAirport: 'NRT',
        departureLocation: 'Tokyo, Japan',
        departureTime: new Date('2025-05-01T14:30:00'),
        arrivalAirport: 'MXP',
        arrivalLocation: 'Milan, Italy',
        arrivalTime: new Date('2025-05-02T02:30:00'), // 12 ore di volo
        price: 1150, // Prezzo rivisto in euro
        credits: 18 // 12 ore * 1.5
    },
    {
        id: 10,
        departureAirport: 'NRT',
        departureLocation: 'Tokyo, Japan',
        departureTime: new Date('2025-06-15T14:30:00'),
        arrivalAirport: 'JFK',
        arrivalLocation: 'New York, USA',
        arrivalTime: new Date('2025-06-16T04:30:00'), // 14 ore di volo
        price: 1400, // Prezzo rivisto in euro
        credits: 21 // 14 ore * 1.5
    }
];

module.exports = flights;