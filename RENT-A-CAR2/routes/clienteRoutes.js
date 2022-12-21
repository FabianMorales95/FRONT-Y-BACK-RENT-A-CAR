var express = require ("express");
var ClienteController = require("../controllers/clienteControllers");

var router = express.Router();

router.get("/clientes", ClienteController.listarClientes);
router.get("/cliente/:id", ClienteController.listarCliente);

router.post("/guardarCliente", ClienteController.save);

router.put("/actualizarCliente/:id", ClienteController.update);

router.delete("/eliminarCliente/:id", ClienteController.eliminar);

module.exports = router;
