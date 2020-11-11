const authController = require("../controllers/authControllers");
const router = require("express")();


router.get("/", authController.home_page_get);
router.get("/signup", authController.signup_get);
router.get("/login", authController.login_get);


module.exports = router;