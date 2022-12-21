var express = require("express");
var CarroController = require("../controllers/carroControllers");

var router = express.Router();

router.get("/carros",CarroController.listarCarros);
router.get("/carro/:id",CarroController.listarCarro);

router.post("/guardarCarro",CarroController.save);

router.put("/actualizarCarro/:id",CarroController.update);

router.delete("/eliminarCarro/:id",CarroController.eliminar);

router.post("/login",CarroController.login);

module.exports = router;
