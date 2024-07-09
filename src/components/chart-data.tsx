
const countries = ['IN', 'USA', 'UK'];
const genders = ['male', 'female'];

const getRandomElement = (array: string[]) => array[Math.floor(Math.random() * array.length)];
const getRandomNumber = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;


export const ChartData = [
    { name: 'Alice Smith', email: 'alice.smith@example.com', phone: '123-456-7890',       country: getRandomElement(countries), gender: getRandomElement(genders), age: getRandomNumber(18, 60) },
    { name: 'Bob Johnson', email: 'bob.johnson@example.com', phone: '234-567-8901',       country: getRandomElement(countries), gender: getRandomElement(genders), age: getRandomNumber(18, 60) },
    { name: 'Carol Davis', email: 'carol.davis@example.com', phone: '345-678-9012',       country: getRandomElement(countries), gender: getRandomElement(genders), age: getRandomNumber(18, 60) },
    { name: 'David Wilson', email: 'david.wilson@example.com', phone: '456-789-0123',     country: getRandomElement(countries), gender: getRandomElement(genders), age: getRandomNumber(18, 60) },
    { name: 'Emma Garcia', email: 'emma.garcia@example.com', phone: '567-890-1234',       country: getRandomElement(countries), gender: getRandomElement(genders), age: getRandomNumber(18, 60) },
    { name: 'Frank Martinez', email: 'frank.martinez@example.com', phone: '678-901-2345', country: getRandomElement(countries), gender: getRandomElement(genders), age: getRandomNumber(18, 60) },
    { name: 'Grace Rodriguez', email: 'grace.rodriguez@example.com', phone: '789-012-3456', country: getRandomElement(countries), gender: getRandomElement(genders), age: getRandomNumber(18, 60) },
    { name: 'Hank Lewis', email: 'hank.lewis@example.com', phone: '890-123-4567', country: getRandomElement(countries), gender: getRandomElement(genders), age: getRandomNumber(18, 60) },
    { name: 'Ivy Walker', email: 'ivy.walker@example.com', phone: '901-234-5678', country: getRandomElement(countries), gender: getRandomElement(genders), age: getRandomNumber(18, 60) },
    { name: 'Jack Hall', email: 'jack.hall@example.com', phone: '012-345-6789', country: getRandomElement(countries), gender: getRandomElement(genders), age: getRandomNumber(18, 60) },
    { name: 'Karen Young', email: 'karen.young@example.com', phone: '123-456-7890', country: getRandomElement(countries), gender: getRandomElement(genders), age: getRandomNumber(18, 60) },
    { name: 'Liam Allen', email: 'liam.allen@example.com', phone: '234-567-8901', country: getRandomElement(countries), gender: getRandomElement(genders), age: getRandomNumber(18, 60) },
    { name: 'Mia Scott', email: 'mia.scott@example.com', phone: '345-678-9012', country: getRandomElement(countries), gender: getRandomElement(genders), age: getRandomNumber(18, 60) },
    { name: 'Nathan King', email: 'nathan.king@example.com', phone: '456-789-0123', country: getRandomElement(countries), gender: getRandomElement(genders), age: getRandomNumber(18, 60) },
    { name: 'Olivia Wright', email: 'olivia.wright@example.com', phone: '567-890-1234', country: getRandomElement(countries), gender: getRandomElement(genders), age: getRandomNumber(18, 60) },
    { name: 'Paul Lopez', email: 'paul.lopez@example.com', phone: '678-901-2345', country: getRandomElement(countries), gender: getRandomElement(genders), age: getRandomNumber(18, 60) },
    { name: 'Quinn Hill', email: 'quinn.hill@example.com', phone: '789-012-3456', country: getRandomElement(countries), gender: getRandomElement(genders), age: getRandomNumber(18, 60) },
    { name: 'Rachel Green', email: 'rachel.green@example.com', phone: '890-123-4567', country: getRandomElement(countries), gender: getRandomElement(genders), age: getRandomNumber(18, 60) },
    { name: 'Steve Baker', email: 'steve.baker@example.com', phone: '901-234-5678', country: getRandomElement(countries), gender: getRandomElement(genders), age: getRandomNumber(18, 60) },
    { name: 'Tina Adams', email: 'tina.adams@example.com', phone: '012-345-6789', country: getRandomElement(countries), gender: getRandomElement(genders), age: getRandomNumber(18, 60) }
  ];
  