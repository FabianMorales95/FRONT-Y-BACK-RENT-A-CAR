var validator = require ("validator");
var Reserva = require("../models/reservaModels");

var controller = {
 
    save: function(req,res){

        var params = req.body;

        var validate_fechaInicio = !validator.isEmpty(params.fechaInicio);
        console.log(validate_fechaInicio);

        var validate_fechaFin = !validator.isEmpty(params.fechaFin);
        console.log(validate_fechaFin);

        /*var validate_idCarro= !validator.isEmpty(params.idCarro);
        console.log(validate_idCarro);

        var validate_idCliente = !validator.isEmpty(params.idCliente);
        console.log(validate_idCliente);*/

    
        console.log(params.fechaInicio,params.fechaFin, params.idCarro,params.idCliente);

        if (validate_fechaInicio && validate_fechaFin){
            
            var reserva = new Reserva ();

            reserva.fechaInicio = params.fechaInicio;
            reserva.fechaFin = params.fechaFin;
            reserva.ClienteModels = params.idCarro;
            reserva.CarroModels = params.idCliente;          
            
            console.log(reserva);

            reserva.save((error,reservaStored) => {
                if (error || !reservaStored){
                    return res.status(404).send({
                        message:"La reserva no se guardo",
                        status: "error"
                    });
                }
                return res.status(200).send({
                    message:"Reserva guardada"
                });
            });
         
        }else{
            return res.status(404).send({
                message:"Validaciòn de datos incorrecta"
            });
        }
    },


    update:function(req,res){

        var params = req.body;

        var reservaId = req.params.id;

        console.log(reservaId);

        var validate_fechaInicio = !validator.isEmpty(params.fechaInicio);
        var validate_fechaFin = !validator.isEmpty(params.fechaFin);
        //var validate_idCarro = !validator.isEmpty(params.idCarro);
        //var validate_idCliente = !validator.isEmpty(params.idCliente);       

        if(validate_fechaInicio && validate_fechaFin){
            
            var update = {

                fechaInicio:params.fechaInicio,
                fechaFin:params.fechaFin,
                idCarro:params.idCarro,
                idCliente:params.idCliente,
    
            }

            Reserva.findOneAndUpdate({_id:reservaId},update,{new:true},(error,reservaUpdate)=>{
                if(error){
                    return res.status(500).send({
                        message:"Error en la peticiòn",
                        status:"Error"
                    });
                }

                if(!reservaUpdate){
                    return res.status(404).send({
                        message:"Reserva no actualizada",
                        status:"Error"
                    });
                }

                return res.status(200).send({
                    message:"Reserva actualizada correctamente",
                    status:"Success",
                    reservaUpdate
                });
            })

        }else{
            return res.status(200).send({
                message:"Validación de datos invalido"
            });
        }
        
    },

    eliminar: function (req,res){

        var reservaId = req.params.id;

        Reserva.findOneAndDelete({_id:reservaId},(error,reservaRemoved) =>{
            if(error){
                return res.status(500).send({
                    message:"Error en la peticiòn",
                    status:"Error"
                });
            }

            if(!reservaRemoved){
                return res.status(404).send({
                    message:"Reserva no eliminada",
                    status:"Error"
                });
            }

            return res.status(200).send({
                message:"Reserva Eliminada existosamente",
                reserva: reservaRemoved
            });
        })
  
    },
    
    listarReservas: function (req,res){

        Reserva.find(function(error,doc){
            console.log(doc);
            return res.status(200).send({
                message:"Todas las reservas",
                doc
            });
        });//.populate ("CarroModels").populate ("ClienteModels");  
    },

    listarReserva: function (req,res){

        var reservaId = req.params.id;
        Reserva.findById(reservaId) //.populate ("CarroModels").populate ("ClienteModels")
            .exec((error,reserva)=>{
                if(error){
                    return res.status(500).send({
                        message:"Error en la peticiòn",
                        status:"Error"
                    });
                }
    
                if(!reserva){
                    return res.status(404).send({
                        message:"Reserva no eliminada",
                        status:"Error"
                    });
                }
                return res.status(200).send({
                    message:"Esta es una reserva",
                    reserva
                });
            })

    },

    login: function(req,res){
        return res.status(200).send({
            message:"Login"
        });
    },

}

module.exports = controller;