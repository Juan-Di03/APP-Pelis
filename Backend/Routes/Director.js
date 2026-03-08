const{router} = require("express");
const {getDirectores,createDirector} = require ("../controllers/DirectorController");

const router = router();

router.get("/",getDirectores);
router.post("/",createDirector);

module.exports = router;