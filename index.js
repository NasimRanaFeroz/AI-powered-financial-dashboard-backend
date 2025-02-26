const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const connectDB = require('./config/db'); // Adjust the path as necessary

const app = express();
const port = process.env.PORT || 3000;

// Connect to the database
connectDB();

app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, res) => {
    res.send('Welcome to the Finance Dashboard Backend!');
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});