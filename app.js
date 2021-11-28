const express = require("express");
require('dotenv').config();

const app = express();
const port = process.env.PORT;

console.log(port)

//Servir contenido estatico
app.use(express.static('public')); //le mandamos el path

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});
app.get('/Aproximaciones', (req, res) => {
    res.sendFile(__dirname + '/public/Aproximaciones.html');
});
app.get('/Biseccion', (req, res) => {
    res.sendFile(__dirname + '/public/Biseccion.html');
});
app.get('/NewtonRaphson', (req, res) => {
    res.sendFile(__dirname + '/public/NewtonRaphson.html');
});
app.get('*', (req, res) => {
    res.sendFile(__dirname + '/public/404.html');
});

app.listen(port, () => {
    console.log(`Escuchando en http://localhost:${port}`);
})
