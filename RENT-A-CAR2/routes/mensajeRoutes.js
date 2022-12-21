var express = require('express');
var MensajeController = require("../controllers/mensajeControllers");

var router = express.Router();

router.get("/mensajes", MensajeController.listarMensajes);
router.get("/mensaje/:id", MensajeController.listarMensaje);

router.post("/guardarMensaje", MensajeController.save);

router.put("/actualizarMensaje/:id", MensajeController.update);

router.delete("/eliminarMensaje/:id", MensajeController.eliminar);

router.post("/login", MensajeController.login);

module.exports = router;