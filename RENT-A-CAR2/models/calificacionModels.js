const mongoose =require("mongoose");
var Schema = mongoose.Schema;


var CalificacionSchema = Schema({

    calificacion: Number,

    ReservaModels: {
        type:Schema.ObjectId, 
        ref:"reservaModels"
    },
    
})
module.exports = mongoose.model("Calificacion",CalificacionSchema);

