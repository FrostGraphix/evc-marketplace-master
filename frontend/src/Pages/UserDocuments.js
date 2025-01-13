import React, { useEffect, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { fetchUserDocuments } from 'path-to-your-redux-actions';

const UserDocuments = () => {
  // const dispatch = useDispatch();
  // const documents = useSelector((state) => state.documents.userDocuments);

  // We'll keep local state to store documents so it compiles
  const [documents, setDocuments] = useState([]);

  // If the user’s email is stored in localStorage (as you had before)
  const userEmail = localStorage.getItem('userEmail');

  useEffect(() => {
    // ====== Commented Out Redux Dispatch ======
    // if (userEmail) {
    //   dispatch(fetchUserDocuments(userEmail));
    // }

    // Temporarily set documents to an empty array (or mock data)
    setDocuments([]);
  }, [userEmail]);

  const handleCopy = (link) => {
    navigator.clipboard.writeText(link);
    alert('Document link copied to clipboard!');
  };

  return (
    <div className="user-documents-container">
      <h2 className="text-center">My Documents</h2>
      {documents.length === 0 ? (
        <p className="text-center">No documents found.</p>
      ) : (
        <div className="table-responsive">
          <table className="table table-striped table-hover">
            <thead>
              <tr>
                <th>Buyer Name</th>
                <th>Email</th>
                <th>Price</th>
                <th>Location</th>
                <th>Title</th>
                <th>Purchased Date</th>
                <th>Document Link</th>
                <th>Copy</th>
              </tr>
            </thead>
            <tbody>
              {documents.map((doc, index) => (
                <tr key={index}>
                  <td>{doc.buyerName || 'N/A'}</td>
                  <td>{doc.email || 'N/A'}</td>
                  <td>{doc.propertyPrice || 'N/A'}</td>
                  <td>{doc.propertyLocation || 'N/A'}</td>
                  <td>{doc.propertyTitle || 'N/A'}</td>
                  <td>
                    {doc.purchasedDate
                      ? new Date(doc.purchasedDate).toLocaleDateString()
                      : 'N/A'}
                  </td>
                  <td>
                    {doc.documentLink ? (
                      <a
                        href={doc.documentLink}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {doc.documentLink}
                      </a>
                    ) : (
                      'No Link'
                    )}
                  </td>
                  <td>
                    <button
                      className="btn btn-sm btn-secondary"
                      onClick={() => handleCopy(doc.documentLink)}
                    >
                      Copy Link
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default UserDocuments;
