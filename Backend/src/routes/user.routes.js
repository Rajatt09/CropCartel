import { Router } from "express";
import {
  getDetails,
  loginUser,
  logoutUser,
  redirectingUser,
  registerUser,
  updateAccount,
  updateYourAvatar,
} from "../controllers/user.controller.js";
import {
  addItem,
  getSaved,
  getPosted,
  updateItem,
  deleteItem,
  getItem,
  saveItem,
  gettingSold,
  gettingBought,
  gettingDelete,
} from "../controllers/items.controller.js";
import validateItems from "../utils/validateItems.js";
// import catchAsync from "../utils/catchAsync.js";
import { upload } from "../middlewares/multer.middleware.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

// router.route("/register").post(upload.single("avatar"), registerUser);
router.route("/register").post(registerUser);
router.route("/login").post(loginUser);

//secured routes
router.route("/redirecting").post(verifyJWT, redirectingUser);
router.route("/getDetails").get(verifyJWT, getDetails);
router.route("/logout").post(verifyJWT, logoutUser);
router.route("/updateAccountDetails").post(verifyJWT, updateAccount);
// Define a route for saving an item
router.route("/saveItem/:id", saveItem);

router
  .route("/updateavatar")
  .post(verifyJWT, upload.single("avatar"), updateYourAvatar);

//item routes

router
  .route("/addItem")
  .post(verifyJWT, upload.single("cropImage"), validateItems, addItem);

router.route("/getSaved").get(verifyJWT, getSaved);

router.route("/getPosted").get(verifyJWT, getPosted);

router.route("/getItems/:id").get(verifyJWT, getItem);

router
  .route("/getItems/:id")
  .put(verifyJWT, upload.single("cropImage"), validateItems, updateItem);

router.route("/saveItem/:id").post(verifyJWT, saveItem);

router.route("/getItems/:id").delete(verifyJWT, deleteItem);

router.route("/getdelete").post(verifyJWT, gettingDelete);

router.route("/getSold").get(verifyJWT, gettingSold);

router.route("/getBought").get(verifyJWT, gettingBought);

export default router;
