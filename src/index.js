const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

require("dotenv").config();
const empresaRoutes = require("./routes/empresa");
const nivelRoutes = require("./routes/nivel");
const parkingRoutes = require("./routes/parking");
const usuarioRoutes = require("./routes/users");
const adminRoutes = require("./routes/admin");

const app = express();
const port = process.env.PORT || 9000;

app.use(cors())
//middleware
app.use('/public', express.static('public'));

app.use(express.json())
app.use('/api',empresaRoutes);
app.use('/api',nivelRoutes);
app.use('/api',parkingRoutes);
app.use('/api',usuarioRoutes);
app.use('/api',adminRoutes);
app.get('/', (req,res) =>{
    res.send('Hola mundo Api')
});

mongoose
.connect(process.env.MONGODB_URI)
.then(()=> console.log('Conectado a la base de datos'))
.catch((error) => console.log(error))


app.listen(port, () => console.log('Servidor escuchando en ',port))