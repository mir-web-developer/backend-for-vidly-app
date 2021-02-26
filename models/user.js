const mongoose = require("mongoose");
const Joi = require("joi");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true, minlength: 5, maxlength: 50 },
  email: {
    type: String,
    unique: true,
    required: true,
    minlength: 5,
    maxlength: 50,
  },
  password: {
    type: String,
    unique: true,
    required: true,
    minlength: 5,
    maxlength: 1024,
  },
}) 
const User = mongoose.model(
  "User",
  userSchema
);



userSchema.methods.generateAuthToken = function ()  {
  const token = jwt.sign({_id:this._id}, config.get("jwtPrivateKey"))
}


function validateUser(user) {
  const schema = Joi.object({
    name: Joi.string().min(3).required(),
    email: Joi.string().required().email(),
    password: Joi.string().min(5).max(255).required(),
  });
  return schema.validate(user);
}

exports.User = User;
exports.validate = validateUser;
