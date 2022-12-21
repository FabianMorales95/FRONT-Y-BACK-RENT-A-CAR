var validator = require ("validator");
var Mensaje = require("../models/mensajeModels");

var controller = {
 
    save: function(req,res){

        var params = req.body;

        var validate_mensaje = !validator.isEmpty(params.mensaje);
        console.log(validate_mensaje);

        /*var validate_CarroModels = !validator.isEmpty(params.CarroModels);
        console.log(validate_CarroModels);
        */
        console.log(params.mensaje,params.CarroModels);

        if (validate_mensaje && validate_CarroModels){
            
            var mensaje = new Mensaje();

            mensaje.mensaje = params.mensaje;
            mensaje.CarroModels = params.CarroModels;

            console.log(mensaje);

            mensaje.save((error,mensajeStored) => {
                if (error || !mensajeStored){
                    return res.status(404).send({
                        message:"El mensaje no se guardo",
                        status: "error"
                    });
                }
                return res.status(200).send({
                    message:"Mensaje guardado"
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
        var mensajeId = req.params.id;

        console.log(mensajeId);

        var validate_mensaje = !validator.isEmpty(params.mensaje);
        var validate_CarroModels = !validator.isEmpty(params.CarroModels);
      
        if(validate_mensaje && validate_CarroModels){
            
            var update = {

                mensaje:params.mensaje,
                CarroModels:params.CarroModels,
            }

            Mensaje.findOneAndUpdate({_id:mensajeId},update,{new:true},(error,mensajeUpdate)=>{
                if(error){
                    return res.status(500).send({
                        message:"Error en la peticiòn",
                        status:"Error"
                    });
                }

                if(!mensajeUpdate){
                    return res.status(404).send({
                        message:"Mensaje no actualizado",
                        status:"Error"
                    });
                }

                return res.status(200).send({
                    message:"Mensaje actualizado correctamente",
                    status:"Success",
                    mensajeUpdate
                });
            })

        }else{
            return res.status(200).send({
                message:"Validación de datos invalido"
            });
        }
        
    },

    eliminar: function (req,res){

        var mensajeId = req.params.id;
        Mensaje.findOneAndDelete({_id:mensajeId},(error,mensajeRemoved) =>{
            if(error){
                return res.status(500).send({
                    message:"Error en la peticiòn",
                    status:"Error"
                });
            }

            if(!mensajeRemoved){
                return res.status(404).send({
                    message:"Mensaje no eliminado",
                    status:"Error"
                });
            }

            return res.status(200).send({
                message:"Mensaje Eliminado existosamente",
                mensaje: mensajeRemoved
            });
        })
  
    },

    listarMensajes: function (req,res){

        Mensaje.find(function(error,doc){
            console.log(doc);
            return res.status(200).send({
                message:"Todos los Mensajes",
                doc
            });
        }).populate ("CarroModels"); 
    },

    listarMensaje: function (req,res){

        var mensajeId = req.params.id;
        Mensaje.findById(mensajeId).populate ("CarroModels")
            .exec((error,mensaje)=>{
                if(error){
                    return res.status(500).send({
                        message:"Error en la peticiòn",
                        status:"Error"
                    });
                }
    
                if(!mensaje){
                    return res.status(404).send({
                        message:"Mensaje no eliminado",
                        status:"Error"
                    });
                }
                return res.status(200).send({
                    message:"Este es un mensaje",
                    mensaje
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