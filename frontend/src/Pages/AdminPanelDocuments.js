import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AdminPanelDocuments = () => {
  const [documents, setDocuments] = useState([]);

  useEffect(() => {
    // Fetch all documents
    const fetchDocs = async () => {
      try {
        const res = await axios.get('/api/documents');
        if (res.data.success) {
          setDocuments(res.data.data);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchDocs();
  }, []);

  return (
    <div className="admin-documents-container min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <h2 className="text-center text-2xl font-bold text-gray-800 mb-6">
        All Uploaded Documents
      </h2>
      <div className="table-responsive overflow-x-auto bg-white shadow-lg rounded-lg">
        <table className="table table-striped table-hover min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="py-3 px-4 text-left text-sm font-semibold uppercase tracking-wider">
                Buyer Name
              </th>
              <th className="py-3 px-4 text-left text-sm font-semibold uppercase tracking-wider">
                Email
              </th>
              <th className="py-3 px-4 text-left text-sm font-semibold uppercase tracking-wider">
                Price
              </th>
              <th className="py-3 px-4 text-left text-sm font-semibold uppercase tracking-wider">
                Location
              </th>
              <th className="py-3 px-4 text-left text-sm font-semibold uppercase tracking-wider">
                Title
              </th>
              <th className="py-3 px-4 text-left text-sm font-semibold uppercase tracking-wider">
                Purchased Date
              </th>
              <th className="py-3 px-4 text-left text-sm font-semibold uppercase tracking-wider">
                Document Link
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {documents.map((doc) => (
              <tr key={doc._id} className="hover:bg-gray-50">
                <td className="py-3 px-4 text-sm text-gray-700">
                  {doc.buyerName}
                </td>
                <td className="py-3 px-4 text-sm text-gray-700">
                  {doc.email}
                </td>
                <td className="py-3 px-4 text-sm text-gray-700">
                  {doc.propertyPrice}
                </td>
                <td className="py-3 px-4 text-sm text-gray-700">
                  {doc.propertyLocation}
                </td>
                <td className="py-3 px-4 text-sm text-gray-700">
                  {doc.propertyTitle}
                </td>
                <td className="py-3 px-4 text-sm text-gray-700">
                  {new Date(doc.purchasedDate).toLocaleDateString()}
                </td>
                <td className="py-3 px-4 text-sm text-blue-600 underline">
                  <a
                    href={doc.documentLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-blue-800"
                  >
                    {doc.documentLink}
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminPanelDocuments;
