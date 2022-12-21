var express = require('express');
var ReservaController = require("../controllers/reservaControllers");

var router = express.Router();

router.get("/reservas", ReservaController.listarReservas);
router.get("/reserva/:id", ReservaController.listarReserva);

router.post("/guardarReserva", ReservaController.save);

router.put("/actualizarReserva/:id", ReservaController.update);

router.delete("/eliminarReserva/:id", ReservaController.eliminar);

router.post("/login", ReservaController.login);

module.exports = router;