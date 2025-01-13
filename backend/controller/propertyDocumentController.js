const PropertyDocument = require('../models/propertyDocumentModel');


// CREATE a new document
exports.createDocument = async (req, res) => {
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

// GET ALL documents (for admin)
exports.getAllDocuments = async (req, res) => {
  try {
    const docs = await PropertyDocument.find({}).sort({ createdAt: -1 });
    return res.status(200).json({
      success: true,
      data: docs,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// GET documents by user email (for users to see their own docs)
exports.getDocumentsByEmail = async (req, res) => {
  try {
    const { email } = req.params;
    const docs = await PropertyDocument.find({ email }).sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      data: docs,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
