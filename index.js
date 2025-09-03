const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const connectDB = require('./config/db');

const app = express();
const port = process.env.PORT || 3000;

connectDB();

app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, res) => {
    res.send('Welcome to the Finance Dashboard Backend!');
});

const userSchema = new Schema({
    email: String,
    password: String,
    availableBalance: Number,
    incomeGoal: Number,
    assets: {
        land: Number,
        business: Number,
        stock: Number,
        others: Number
    }
});

const User = mongoose.model('User', userSchema);

const dynamicSchema = new Schema({
    email: String,
    year: Number,
    month: String,
    spending: {
        housing: Number,
        personal: Number,
        transportation: Number
    },
    income: {
        salary: Number,
        e_commerce: Number,
        others: Number
    }
});

const Dynamic = mongoose.model('Dynamic', dynamicSchema);

app.post('/create-user', async (req, res) => {
    try {
        const { email, password } = req.body;
        
        // Validate required fields
        if (!email || !password) {
            return res.status(400).json({ 
                error: 'Email and password are required fields' 
            });
        }

        // Check if user with this email already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(409).json({ error: 'Email already in use' });
        }

        // Create new User document
        const newUser = new User({
            email,
            password,
            availableBalance: 0,
            incomeGoal: 0,
            assets: {
                land: 0,
                business: 0,
                stock: 0,
                others: 0,
            },
        });

        // Create new Dynamic document
        const newDynamic = new Dynamic({
            email,
            year: new Date().getFullYear(),
            month: new Date().toLocaleString('default', { month: 'long' }),
            spending: {
                housing: 0,
                personal: 0,
                transportation: 0
            },
            income: {
                salary: 0,
                e_commerce: 0,
                others: 0
            }
        });

        // Save both documents using Promise.all for parallel execution
        const [savedUser, savedDynamic] = await Promise.all([
            newUser.save(),
            newDynamic.save()
        ]);

        // Return both saved documents
        res.status(201).json({
            message: 'User created successfully',
            user: savedUser,
            dynamic: savedDynamic
        });
    } catch (err) {
        console.error('Error creating user:', err);
        res.status(500).json({ 
            error: 'Failed to create user',
            details: err.message 
        });
    }
});


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
