const mongoose = require('mongoose');
var Schema = mongoose.Schema;

    var reservaSchema = Schema({  

        fechaInicio: Date,
        fechaFin: Date,

        CarroModels: {
            type:Schema.ObjectId, 
            ref:"carroModels"
        },

        ClienteModels: {
            type:Schema.ObjectId,
             ref:"clienteModels"
        },

        /*Date: {
            type:Date, 
            default: Date.now
        },*/

    })

    module.exports = mongoose.model("Reserva", reservaSchema); 