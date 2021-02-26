const mongoose = require("mongoose");
const Joi = require("joi");

const genreSchema = new mongoose.Schema({
  genre: { type: String, required: true, minlength: 5, maxlength: 50 },
});

const Genre = mongoose.model("Genre", genreSchema);

function validateGenre(courseObject) {
  const schema = Joi.object({ genre: Joi.string().min(3).required() });
  return schema.validate(courseObject);
}

exports.Genre = Genre;
exports.validate = validateGenre;
exports.genreSchema = genreSchema