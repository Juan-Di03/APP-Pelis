const{Router} = require("express");

const {getDirector,createDirector} = require ("../controllers/DirectorController");

const router = Router();

router.get("/",getDirector);
router.post("/",createDirector);

module.exports = router;