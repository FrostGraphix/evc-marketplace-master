import React, { useEffect, useState } from 'react';


const UserDocuments = () => {
  const [documents, setDocuments] = useState([]);
  // If you have user info from Redux or Context, you can fetch the user’s email.
  // For example:
  // const user = useSelector((state) => state.auth.user);
  // const userEmail = user.email;
  // For now, let's assume we already have the user’s email from localStorage or context:
  const userEmail = localStorage.getItem('userEmail'); // adjust as needed

  useEffect(() => {
    const fetchUserDocuments = async () => {
      try {
        if (!userEmail) return;
        const res = await axios.get(`/api/documents/${userEmail}`);
        if (res.data.success) {
          setDocuments(res.data.data);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchUserDocuments();
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
