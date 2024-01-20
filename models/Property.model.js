const { Schema, model } = require("mongoose");

// const Property = require('../models/property.model');
 
// ********* require fileUploader in order to use it *********
const fileUploader = require('../config/cloudinary.config');
 

// TODO: Please make sure you edit the User model to whatever makes sense in this case
const propertySchema = new Schema(
  {
   
    title: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      required: true,
    },

    location: {
      address: String,
      city: String,
      country: String,
      postalCode: Number,
    },

    available: {
      type: Boolean,
      default: true
    },

    picture: [{}],

    owner: { type: Schema.Types.ObjectId, ref: "User" },
    
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
);

const Property = model("Property", propertySchema);

module.exports = Property;