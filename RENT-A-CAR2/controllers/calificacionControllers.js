var validator = require ("validator");
var Calificacion = require("../models/calificacionModels");

var controller = {
 
    save: function(req,res){

        var params = req.body;
        var validate_calificacion = !validator.isEmpty(params.calificacion);
        console.log(validate_calificacion);

        /*var validate_ReservaModels = !validator.isEmpty(params.ReservaModels);
        console.log(validate_ReservaModels);
        */

        console.log(params.calificacion,params.ReservaModels);

        if (validate_calificacion ){
            
            var calificacion = new Calificacion();

            calificacion.calificacion = params.calificacion;
            calificacion.ReservaModels = params.ReservaModels;

            console.log(calificacion);

            calificacion.save((error,calificacionStored) => {
                if (error || !calificacionStored){
                    return res.status(404).send({
                        message:"La Calificación no se guardo",
                        status: "error"
                    });
                }
                return res.status(200).send({
                    message:"Calificación guardada"
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
        var calificacionId = req.params.id;

        console.log(calificacionId);

        var validate_calificacion = !validator.isEmpty(params.calificacion);
        //var validate_ReservaModels = !validator.isEmpty(params.ReservaModels);
       
        if(validate_calificacion){
            
            var update = {

                calificacion:params.calificacion,
                ReservaModels:params.ReservaModels,
               
            }

            Calificacion.findOneAndUpdate({_id:calificacionId},update,{new:true},(error,calificacionUpdate)=>{
                if(error){
                    return res.status(500).send({
                        message:"Error en la peticiòn",
                        status:"Error"
                    });
                }

                if(!calificacionUpdate){
                    return res.status(404).send({
                        message:"Calificación no actualizada",
                        status:"Error"
                    });
                }

                return res.status(200).send({
                    message:"Calificación actualizada correctamente",
                    status:"Success",
                    calificacionUpdate
                });
            })

        }else{
            return res.status(200).send({
                message:"Validación de datos invalido"
            });
        }
        
    },

    eliminar: function (req,res){

        var calificacionId = req.params.id;
        Calificacion.findOneAndDelete({_id:calificacionId},(error,calificacionRemoved) =>{
            if(error){
                return res.status(500).send({
                    message:"Error en la peticiòn",
                    status:"Error"
                });
            }

            if(!calificacionRemoved){
                return res.status(404).send({
                    message:"Calificación no eliminada",
                    status:"Error"
                });
            }

            return res.status(200).send({
                message:"Calificación Eliminada existosamente",
                calificacion: calificacionRemoved
            });
        })
  
    },

    listarCalificaciones: function (req,res){

        Calificacion.find(function(error,doc){
            console.log(doc);
            return res.status(200).send({
                message:"Todas las Calificaciones",
                doc
            });
        }).populate ("ReservaModels");
    },

    listarCalificacion: function (req,res){

        var calificacionId = req.params.id;
        Calificacion.findById(calificacionId).populate ("ReservaModels")
            .exec((error,calificacion)=>{
                if(error){
                    return res.status(500).send({
                        message:"Error en la peticiòn",
                        status:"Error"
                    });
                }
    
                if(!calificacion){
                    return res.status(404).send({
                        message:"Calificación no eliminada",
                        status:"Error"
                    });
                }
                return res.status(200).send({
                    message:"Esta es una calificación",
                    calificacion
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