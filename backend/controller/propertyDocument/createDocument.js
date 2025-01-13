const PropertyDocument = require('../../models/propertyDocumentModel');

// CREATE a new document
const createDocument = async (req, res) => {
  try {
    const {
      buyerName,
      email,
      propertyPrice,
      propertyLocation,
      propertyTitle,
      purchasedDate,
      documentLink,
    } = req.body;

    // Create new document record
    const newDoc = new PropertyDocument({
      buyerName,
      email,
      propertyPrice,
      propertyLocation,
      propertyTitle,
      purchasedDate,
      documentLink,
    });

    await newDoc.save();

    return res.status(201).json({
      success: true,
      data: newDoc,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
module.exports = createDocument