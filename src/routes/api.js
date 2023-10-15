const express = require('express');
const StudentsController = require("../controllers/StudentsController");
const WorksController = require("../controllers/WorksController");
const AuthVerifyMiddleware = require("../middleware/AuthVerifyMiddleware");
const router = express.Router();

router.post("/registration",StudentsController.create);
router.post("/login",StudentsController.logIn);
router.post("/profileUpdate",AuthVerifyMiddleware,StudentsController.update);
router.get("/profileDetails",AuthVerifyMiddleware,StudentsController.read);
router.get("/deleteProfile",StudentsController.delete);
router.post("/resetPass",StudentsController.resetPass);

router.post("/createWorks",AuthVerifyMiddleware,WorksController.create);
router.get("/updateWorks/:id/:status",AuthVerifyMiddleware,WorksController.update);
router.get("/detailWorks/:status",AuthVerifyMiddleware,WorksController.read);
router.get("/deleteWorks/:id",AuthVerifyMiddleware,WorksController.delete);

module.exports = router;






































module.exports=router;