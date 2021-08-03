const mongoose = require('mongoose');


const dbConecction = async()=>{
    try {
        await mongoose.connect(process.env.DB_CNN, 
            {
                useNewUrlParser: true, 
                useUnifiedTopology: true,
                useCreateIndex:true
            });

            console.log("genial conexion exitosa");

    } catch (error) {
        throw new Error('Error al iniciar la base de datos')
    }
}

module.exports = {
    dbConecction
}