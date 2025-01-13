const PropertyDocument = require('../../models/propertyDocumentModel');

// GET ALL documents (for admin)
const getAllDocuments = async (req, res) => {
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
module.exports = getAllDocuments