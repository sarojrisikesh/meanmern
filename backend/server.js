const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
require("dotenv").config();

// **********Middleware**************
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors({
    origin: "http://localhost:3000", // React app
    credentials: true
}));

// ******Routes*************
const userRoutes = require('./routes/userRoutes');
app.use('/api/user', userRoutes);

// Port
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on ${PORT}`));
