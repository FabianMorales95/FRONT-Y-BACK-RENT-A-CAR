var express = require('express');
var CalificacionController = require("../controllers/calificacionControllers");

var router = express.Router();

router.get("/calificaciones", CalificacionController.listarCalificaciones);
router.get("/calificacion/:id", CalificacionController.listarCalificacion);

router.post("/guardarCalificacion", CalificacionController.save);

router.put("/actualizarCalificacion/:id", CalificacionController.update);

router.delete("/eliminarCalificacion/:id", CalificacionController.eliminar);

module.exports = router;