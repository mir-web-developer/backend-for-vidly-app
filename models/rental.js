const mongoose = require("mongoose");
const Joi = require("joi");
const { string } = require("joi");

const rentalSchema = new mongoose.Schema({
  customer: {
    type: new mongoose.Schema({
      name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50,
      },
      isGold: {
        type: Boolean,
      },
      phone: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50,
      },
    }),
    required: true,
  },
  movie: {
    type: new mongoose.Schema({
      title: {
        type: String,
        required: true,
        trim: true,
      },
      dailyRentalRate: {
        type: Number,
        required: true,
      },
    }),
    required: true,
  },
  dateOut: {
    type: Date,
    required: true,
  },
  dateReturned: {
    type: Date,
  },
  rentalFree: {
    type: Number,
  },
});

const Rental = mongoose.model("Rental", rentalSchema);

function validateRental(courseObject) {
  const schema = Joi.object({
    customerId: Joi.string().required(),
    movieId: Joi.string().required(),
  });
  return schema.validate(courseObject);
}

exports.Rental = Rental;
exports.validate = validateRental;
