require("dotenv").config();
const mongoose = require('mongoose');
const express = require('express');
const app = express();

const authRoutes = require('./routes/authRoutes');
const usersRoutes = require('./routes/user');

app.use(express.json()); 

app.use('/api/auth', authRoutes);
app.use('/users', usersRoutes);

mongoose.connect(process.env.MONGO_URI);
mongoose.connection.once('open', () => {
    console.log('Connected to MongoDB');
});

const PORT = process.env.PORT || 3000;

const errorHandler = (err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: "Something broke!" });
};
app.use(errorHandler);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

