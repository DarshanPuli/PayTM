const express = require("express");

const userRouter = require("./users");
const accountRouter = require("../routes/account")

const router = express.Router();

router.use("/users", userRouter);
router.use("/account",accountRouter);

module.exports = router;
