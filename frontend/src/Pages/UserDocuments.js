import React, { useEffect } from 'react';

const UserDocuments = () => {
  // We assume `dispatch` and `fetchUserDocuments` are accessible
  // from your existing Redux setup (no imports shown here).
  const dispatch = useDispatch();

  // Get userEmail from localStorage (or from Redux/Context if available)
  const userEmail = localStorage.getItem('userEmail');

  // Get the documents from your Redux store
  // Make sure this selector matches your Redux structure
  const documents = useSelector((state) => state.documents.userDocuments);

  useEffect(() => {
    if (userEmail) {
      dispatch(fetchUserDocuments(userEmail));
    }
  }, [dispatch, userEmail]);

  const handleCopy = (link) => {
    navigator.clipboard.writeText(link);
    alert('Document link copied to clipboard!');
  };

  return (
    <div className="user-documents-container">
      <h2 className="text-center">My Documents</h2>
      {(!documents || documents.length === 0) ? (
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
              {documents.map((doc) => (
                <tr key={doc._id}>
                  <td>{doc.buyerName}</td>
                  <td>{doc.email}</td>
                  <td>{doc.propertyPrice}</td>
                  <td>{doc.propertyLocation}</td>
                  <td>{doc.propertyTitle}</td>
                  <td>{new Date(doc.purchasedDate).toLocaleDateString()}</td>
                  <td>
                    <a
                      href={doc.documentLink}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {doc.documentLink}
                    </a>
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
