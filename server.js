const express  = require('express');
const config = require('dotenv').config();
const app = express();
const connectDB = require('./config/db');
connectDB();

const PORT = process.env.NODE_DOCKER_PORT || 5000;
app.use(require('./routes/routes'));
app.listen(PORT, ()=> {
    console.log(`Server is listenting at http://localhost:${PORT}`);
})
