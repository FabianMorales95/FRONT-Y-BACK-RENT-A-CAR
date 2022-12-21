var validator = require ("validator");
var Cliente = require("../models/clienteModels");

var controller = {
 
    save: function(req,res){

        var params = req.body;
        
        var validate_name = !validator.isEmpty(params.name);
        console.log(validate_name);

        var validate_email = !validator.isEmpty(params.email);
        console.log(validate_email);

        var validate_age = !validator.isEmpty(params.age);
        console.log(validate_age);

        var validate_password = !validator.isEmpty(params.password);
        console.log(validate_password);

        console.log(params.name,params.email, params.age,params.password);

        if (validate_name && validate_email && validate_age && validate_password){
            
            var cliente = new Cliente();

            cliente.name = params.name;
            cliente.email = params.email;
            cliente.age = params.age;
            cliente.password = params.password;          
         
            console.log(cliente);

            cliente.save((error,clienteStored) => {
                if (error || !clienteStored){
                    return res.status(404).send({
                        message:"El cliente no se guardo",
                        status: "error"
                    });
                }
                return res.status(200).send({
                    message:"Cliente guardado"
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
        var clienteId = req.params.id;

        console.log(clienteId);

        var validate_name = !validator.isEmpty(params.name);
        var validate_email = !validator.isEmpty(params.email);
        var validate_age = !validator.isEmpty(params.age);
        var validate_password = !validator.isEmpty(params.password);       
        
        if(validate_name && validate_email && validate_age && validate_password){
            
            var update = {

                name:params.name,
                email:params.email,
                age:params.age,
                password:params.password,

            }

            Cliente.findOneAndUpdate({_id:clienteId},update,{new:true},(error,clienteUpdate)=>{
                if(error){
                    return res.status(500).send({
                        message:"Error en la peticiòn",
                        status:"Error"
                    });
                }

                if(!clienteUpdate){
                    return res.status(404).send({
                        message:"El cliente no actualizado",
                        status:"Error"
                    });
                }

                return res.status(200).send({
                    message:"Cliente actualizado correctamente",
                    status:"Success",
                    clienteUpdate
                });
            })

        }else{
            return res.status(200).send({
                message:"Validación de datos invalido"
            });
        }
        
    },

    eliminar: function (req,res){

        var clienteId = req.params.id;

        Cliente.findOneAndDelete({_id:clienteId},(error,clienteRemoved) =>{
            if(error){
                return res.status(500).send({
                    message:"Error en la peticiòn",
                    status:"Error"
                });
            }

            if(!clienteRemoved){
                return res.status(404).send({
                    message:"Cliente no eliminado",
                    status:"Error"
                });
            }

            return res.status(200).send({
                message:"Cliente Eliminado existosamente",
                cliente: clienteRemoved
            });
        })
  
    },

    listarClientes: function (req,res){

        Cliente.find(function(error,doc){
            console.log(doc);
            return res.status(200).send({
                message:"Todos los Clientes",
                doc
            });
        });  
    },

    listarCliente: function (req,res){

        var clienteId = req.params.id;
        Cliente.findById(clienteId)
            .exec((error,cliente)=>{
                if(error){
                    return res.status(500).send({
                        message:"Error en la peticiòn",
                        status:"Error"
                    });
                }
    
                if(!cliente){
                    return res.status(404).send({
                        message:"Cliente no eliminado",
                        status:"Error"
                    });
                }
                return res.status(200).send({
                    message:"Este es un Cliente",
                    cliente
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