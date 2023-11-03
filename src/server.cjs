const mongoLogic = require('./mongoLogic.cjs');
const { validateLogin } = mongoLogic;

const express = require('express');
const cors = require('cors');
const app = express();

app.use(express.json());


const corsOptions = {
    origin: 'http://localhost:5173',
};

app.use(cors(corsOptions));

app.post('/api/login', (req, res) => {
    // Handle login logic here
    const { username, password } = req.body;
    console.log(username);
    console.log(password);

    // Check username and password against your database
    // If login is successful, respond with a success message or token
    // If login fails, respond with an error message

    const isValid = validateLogin(username, password);

    if (isValid) {
        res.json({message: 'Login successful' + isValid}); // Example response
    }
    else {
        res.json({message: 'Login failed' + isValid});
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});