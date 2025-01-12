const PropertyDocument = require('../../models/propertyDocumentModel');

// GET documents by user email (for users to see their own docs)
const getDocumentsByEmail = async (req, res) => {
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

module.exports = getDocumentsByEmail