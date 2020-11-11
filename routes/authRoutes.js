const authController = require("../controllers/authControllers");
const userController = require("../controllers/userControllers");
const router = require("express")();


router.get("/", authController.home_page_get);
router.get("/signup", authController.signup_get);
router.post("/signup", authController.signup_post);
router.get("/login", authController.login_get);
router.post("/login", authController.login_post);
router.get("/profile", userController.profile_get);
router.post("/profile", userController.profile_post);
router.get("/dashboard", userController.dashboard_get);


module.exports = router;