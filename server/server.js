const express = require('express');
const { dbConection } = require('./database/config');
const cors = require('cors');
require('dotenv').config();

// crear servidor express
let app = express();
// configurar cors
app.use(cors());
// parseo del body
app.use(express.json());
// rutas
app.use('/api/usuarios', require('./routes/usuarios.routes'));
app.use('/api/login', require('./routes/auth.routes'));
app.use('/api/hospitales', require('./routes/hospitales.routes'));
app.use('/api/medicos', require('./routes/medicos.routes'));
app.use('/api/todo', require('./routes/busquedas.routes'));
app.use('/api/upload', require('./routes/upload.routes'));
// coneccion a base de datos
dbConection();


app.listen( process.env.PORT, () => {
    console.log('Servidor corriendo en puerto', process.env.PORT );
});