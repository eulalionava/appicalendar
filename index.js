const express = require('express');
const { dbConecction } = require('./database/config');
require('dotenv').config();

const app = express();

// Conecion a base de datos
dbConecction();

app.use(express.static('public'));

//Lectura y parceo json
app.use(express.json());

//Rutas
app.use('/api/auth',require('./routes/auth'));

app.listen(process.env.PORT,()=>{
    console.log("Servidor corriendo",process.env.PORT);
})