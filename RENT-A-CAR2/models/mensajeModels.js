const mongoose = require("mongoose");
var Schema = mongoose.Schema;

var mensajeSchema = Schema({   

    mensaje:String,

    CarroModels: {
        type:Schema.ObjectId,
         ref:"carroModels"
    },
   
})

module.exports = mongoose.model("Mensaje", mensajeSchema);