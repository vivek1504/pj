const express = require("express");
const app = express();
const userRouter = require("./user");
const { accountRouter } = require("./account");
const router = express.Router();

app.use("/user", userRouter)
app.use("/account",accountRouter)

module.exports = router;