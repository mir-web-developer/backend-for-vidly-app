const Joi = require("joi");
const mongoose = require("mongoose");


const Customer = mongoose.model(
    "Customer",
    new mongoose.Schema({
      isGold: { type: Boolean },
      name: { type: String },
      phone: { type: Number },
    })
  );

  function validateCustomer(customerObject) {
    const schema = Joi.object({
      isGold: Joi.boolean().required(),
      name: Joi.required(),
      phone: Joi.required(),
    });
  
    return schema.validate(customerObject);
  }

  exports.Customer = Customer
  exports.validate = validateCustomer