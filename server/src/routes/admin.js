import express from "express";
const router = express.Router();
import adminController from "../controllers/AdminController";
import uploadCloud from "../middlewares/uploader";
import middlewareAuth from "../middlewares/auth";

// router.post("/register", middlewareAuth.verifyTokenAdmin, uploadCloud.single("image"), adminController.register);
router.post("/createCustomer", middlewareAuth.verifyTokenAdmin, uploadCloud.single("image"), adminController.register);
router.post("/createAdmin", middlewareAuth.verifyTokenAdmin, uploadCloud.single("image"), adminController.register);
router.post("/createPost", middlewareAuth.verifyTokenAdmin, uploadCloud.single("image"), adminController.createPost);
router.post("/login", adminController.login); //middlewareAuth.verifyTokenAdmin
router.delete("/deleteCustomer?:id", middlewareAuth.verifyTokenAdmin, adminController.deleteCustomer);
router.delete("/deleteAdmin?:id", middlewareAuth.verifyTokenAdmin, adminController.deleteAdmin);
router.delete("/deleteAdmin?:id", middlewareAuth.verifyTokenAdmin, adminController.deleteAdmin);
router.delete("/deletePost?:id", middlewareAuth.verifyTokenAdmin, adminController.deletePost);
router.delete("/deleteCategory?:id", middlewareAuth.verifyTokenAdmin, adminController.deleteCategory);
router.delete("/deleteComment?:id", middlewareAuth.verifyTokenAdmin, adminController.deleteComment);
router.put("/updateStatus", middlewareAuth.verifyTokenAdmin, adminController.updateStatus);
router.put("/updateCustomer", middlewareAuth.verifyTokenAdmin, uploadCloud.single("image"), adminController.updateCustomer);
router.put("/updateAdmin", middlewareAuth.verifyTokenAdmin, uploadCloud.single("image"), adminController.updateAdmin);
router.put("/updatePost", middlewareAuth.verifyTokenAdmin, uploadCloud.single("image"), adminController.updatePost);
router.get("/getListAdmin", middlewareAuth.verifyTokenAdmin, adminController.getListAdmin);
router.get("/getAllPostByAdmin", middlewareAuth.verifyTokenAdmin, adminController.getAllPostByAdmin);
router.get("/getDetailAdmin", middlewareAuth.verifyTokenAdmin, adminController.detail);
// router.get('/getDataCustomer', middlewareAuth.verifyToken, AdminAuthController.getDataCustomer)

module.exports = router;
