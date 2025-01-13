import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
// import { useDispatch } from 'react-redux';
// import { resetPasswordAction } from 'path-to-your-redux-actions';

const ResetPassword = () => {
  // const dispatch = useDispatch();

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

    // ====== Commented Out Redux Dispatch ======
    // const resultAction = await dispatch(resetPasswordAction({ token, password }));
    // if (resultAction.payload && resultAction.payload.message) {
    //   setMessage(resultAction.payload.message);
    // } else {
    //   setMessage('Error resetting password. Please try again.');
    // }

    // ====== Temporary Implementation ======
    console.log('Reset password data:', { token, password });
    setMessage('Password reset action simulated.');
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
