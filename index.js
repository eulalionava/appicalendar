const express = require('express');
const { dbConecction } = require('./database/config');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Conecion a base de datos
dbConecction();

//CORS
app.use(cors());

app.use(express.static('public'));

//Lectura y parceo json
app.use(express.json());

//Rutas
app.use('/api/auth',require('./routes/auth'));
app.use('/api/events',require('./routes/events'));

app.listen(process.env.PORT,()=>{
    console.log("Servidor corriendo",process.env.PORT);
})