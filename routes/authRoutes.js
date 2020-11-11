const authController = require("../controllers/authControllers");
const router = require("express")();


router.get("/", authController.home_page_get);


module.exports = router;