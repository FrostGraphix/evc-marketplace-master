const express = require('express');
const router = express.Router();
const {
  createDocument,
  getAllDocuments,
  getDocumentsByEmail,
} = require('../controller/propertyDocumentController');

// POST: Create a document
router.post('/create', createDocument);

// GET: All documents (admin route)
router.get('/', getAllDocuments);

// GET: Documents by user email
router.get('/:email', getDocumentsByEmail);


module.exports = router;
