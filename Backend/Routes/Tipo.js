const {router} = require("express");
const {getTipos,createTipo} = require("../controllers/TipoController");

const router = router();

router.get("/",getTipos);
router.post("/",createTipo);

module.exports = router;