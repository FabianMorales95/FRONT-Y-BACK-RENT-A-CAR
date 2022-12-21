const mongoose =require("mongoose");
var Schema = mongoose.Schema;

var CarroSchema = Schema({
    marca: String,
    name: String,
    anho: String,
    gama: String,
    description: String,
})
module.exports = mongoose.model("Carro",CarroSchema);

