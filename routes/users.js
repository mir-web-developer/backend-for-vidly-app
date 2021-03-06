const { User, validate } = require("../models/user");
const _ = require("lodash");
const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const config = require("config")

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ email: req.body.email });
  if (user) return res.status(400).send("User already registered.");

  user = new User(_.pick(req.body, ["name, email, password"]));
const salt = await bcrytpt.genSalt(10)
user.password = await bcrypt.hash(user.password,salt)
  await user.save();

  const token = jwt.sign({_id:user._id}, config.get("jwtPrivateKey"))
  
  res.header("x-auth-token",token).send(_.pick(user, ["_id", "name", "email"]));
});
module.exports = router;
