const express = require("express");
const zod = require("zod");
const {Users,Accounts} = require("../db");
const JWT_SECRET = require("../config");
const jwt = require("jsonwebtoken");
const authMiddleware = require("./middleware");

const router = express.Router();

router.post("/signup", async (req, res) => {
  // Zod validation
  const signUpBody = zod.object({
    username: zod.string().email(),
    password: zod.string(),
    firstname: zod.string(),
    lastname: zod.string(),
  });

  const validationResult = signUpBody.safeParse(req.body);

  if (!validationResult.success) {
    return res.json({
      error: "Invalid inputs",
      details: validationResult.error.errors,
    });
  }

  // Mongoose validation
  try {
    const user = await Users.create({
      username: req.body.username,
      password: req.body.password,
      firstname: req.body.firstname,
      lastname: req.body.lastname,
    });

    const userId = user._id;

    const account = await Accounts.create(
      {
        userId,
        balance : 1+Math.random()*10000,
      }
    )

    console.log(account);

    const jwtToken = jwt.sign({ userId: user._id }, JWT_SECRET);

    return res.json({
      message: "User created successfully",
      token: `Bearer ${jwtToken}`,
    });
  } catch (error) {
    console.error("Mongoose validation error:", error);
    return res.json({ error: "Invalid inputs" });
  }
});

router.post("/signin", async (req, res) => {
  //zod validation
  const signInBody = zod.object({
    username: zod.string().email(),
    password: zod.string(),
  });

  const { username, password } = req.body;

  const valid = signInBody.safeParse({ username, password });
  if (!valid.success) {
    return res.json({ message: "validation failed" });
  }

  try {
    //check for existence
    const user = await Users.findOne({
      username,
    });
    console.log(user);

    if (!user) {
      return res.json({ message: "user doesnt exist" });
    }
    //password matching
    if (password != user.password) {
      return res.json({ message: "invalid password" });
    }
    console.log(req.userId);
    //returning jwt
    const token = jwt.sign({ userId: user._id }, JWT_SECRET);
    return res.json({ message: `Bearer ${token}` });
  } catch (err) {
    console.log(err);
    return res.json("invalid credentials");
  }
});

router.use(authMiddleware);

router.put("/", async (req, res) => {

  const updateBody = zod.object({
    password: zod.string().min(8),
    firstname: zod.string(),
    lastname: zod.string(),
  });

  try {
    const valid = updateBody.safeParse(req.body);
    if (!valid.success) {
      return res.json({ message: "invalid details" });
    }
    const userId = req.userId;
    const user = await Users.updateOne({ _id: userId }, req.body);
    console.log(user);
    return res.json({
      message: "details updated succesfully",
    });
  } catch (err) {
    return res.json({
      message: err,
    });
  }
});

router.get("/bulk", async (req, res) => {
  const filter = req.query.filter;
  const friends = await Users.find({
    $or: [
      { firstname: { $regex: `^${filter}` } },
      { lastname: { $regex: `^${filter}` } },
    ],
  });
  for (let i = 0; i < friends.length; i++) {
    friends[i] = {
      username : friends[i].username,
      firstname: friends[i].firstname,
      lastname: friends[i].lastname,
      id: friends[i]._id,
    };
  }
  console.log(friends);
  return res.json({
    friends: friends,
  });
});

module.exports = router;
