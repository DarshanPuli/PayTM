const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const JWT_SECRET = require("./config");
const rootRouter = require("./routes/index")


const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/v1", rootRouter);

app.listen(3000);