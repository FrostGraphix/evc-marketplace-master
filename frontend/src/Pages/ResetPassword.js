import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

const ResetPassword = () => {
  // We assume `dispatch` and `resetPasswordAction` are accessible 
  // from your existing Redux setup (no imports shown here).
  const dispatch = useDispatch();

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const { token } = useParams();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage('Passwords do not match');
      return;
    }
    
    try {
      // Dispatch the Redux action (e.g., created via createAsyncThunk)
      const resultAction = await dispatch(
        resetPasswordAction({ token, password })
      );

      // Check your action’s response payload
      if (resultAction.payload && resultAction.payload.message) {
        setMessage(resultAction.payload.message);
      } else {
        setMessage('Error resetting password. Please try again.');
      }
    } catch (error) {
      console.error(error);
      setMessage('Error resetting password. Please try again.');
    }
  };

  return (
    <div>
      <h2>Reset Password</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="password"
          placeholder="Enter new password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Confirm new password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
        <button type="submit">Submit</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default ResetPassword;
