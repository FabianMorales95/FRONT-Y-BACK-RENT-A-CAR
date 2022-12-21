const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require ("cors");

const reserva_routes = require("./routes/reservaRoutes");
const carro_routes = require("./routes/carroRoutes");
const user_routes = require("./routes/clienteRoutes");
const mensaje_routes = require("./routes/mensajeRoutes");
const calificacion_routes = require("./routes/calificacionRoutes");

mongoose.Promise = global.Promise;
const port = 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());


mongoose.connect("mongodb://localhost:27017/RentACarNew",{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    family: 4
})        
.then(() =>{

    app.use(express.json());

    app.use("/api", reserva_routes);
    app.use("/api", carro_routes);
    app.use("/api", user_routes);
    app.use("/api", mensaje_routes);
    app.use("/api", calificacion_routes);

    app.listen(port, () =>{
        console.log("Servidor corriendo en el puerto", port);
    })
})

.catch(err =>console.log(err)); 

