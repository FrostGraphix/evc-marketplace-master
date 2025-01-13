const mongoose = require('mongoose');

const propertyDocumentSchema = new mongoose.Schema(
  {
    buyerName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    propertyPrice: {
      type: Number,
      required: true,
    },
    propertyLocation: {
      type: String,
      required: true,
    },
    propertyTitle: {
      type: String,
      required: true,
    },
    purchasedDate: {
      type: Date,
      required: true,
    },
    documentLink: {
      type: String,
      required: true,
    },
    // You can add more fields here if needed, e.g. userId, etc.
  },
  { timestamps: true }
);


const propertyDocumentModel = mongoose.model('PropertyDocument',propertyDocumentSchema)

module.exports = propertyDocumentModel

