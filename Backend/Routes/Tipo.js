const {Router} = require("express");
const {getTipo,createTipo} = require("../controllers/TipoController");

const router = Router();

router.get("/",getTipo);
router.post("/",createTipo);

module.exports = router;