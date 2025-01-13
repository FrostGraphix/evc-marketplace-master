import React, { useEffect, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { fetchDocuments } from 'path-to-your-redux-actions';

const AdminPanelDocuments = () => {
  // ====== Redux Hooks & Actions (commented out) ======
  // const dispatch = useDispatch();
  // const documents = useSelector((state) => state.documents.data);

  // ====== Temporary Local State ======
  const [documents, setDocuments] = useState([]);

  useEffect(() => {
    // ====== Commented Out Redux Dispatch ======
    // dispatch(fetchDocuments());

    // If you want to keep some placeholder data, you could set it here:
    setDocuments([]); // or any mock data
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
            {documents.map((doc, index) => (
              <tr key={index} className="hover:bg-gray-50">
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
                  {doc.purchasedDate
                    ? new Date(doc.purchasedDate).toLocaleDateString()
                    : 'N/A'}
                </td>
                <td className="py-3 px-4 text-sm text-blue-600 underline">
                  <a
                    href={doc.documentLink || '#'}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-blue-800"
                  >
                    {doc.documentLink || 'No Link'}
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
