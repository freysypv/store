import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../Features/AuthForm';

export default function ForgotPassword() {
  const { resetPassword } = useAuth();
  const navigate = useNavigate();
  const [step, setStep] = useState(1); // 1: enter email, 2: set new password
  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const handleEmailSubmit = (e) => {
    e.preventDefault();
    const existingUsers = JSON.parse(localStorage.getItem('registered_users')) || [];
    const found = existingUsers.some(u => u.email === email);

    if (!found) {
      setError('No account found with that email.');
      return;
    }
    setError('');
    setStep(2);
  };

  const handleResetSubmit = (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setError("Passwords don't match.");
      return;
    }
    if (newPassword.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }

    const result = resetPassword(email, newPassword);
    if (result.success) {
      alert('Password reset successfully. Please log in.');
      navigate('/login');
    } else {
      setError(result.message);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Reset Password</h2>
        {step === 1 ? (
          <form onSubmit={handleEmailSubmit}>
            <div className="auth-input">
              <label htmlFor="email">Enter your account email</label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            {error && <p className="auth-error">{error}</p>}
            <button type="submit" className="auth-submit-btn">Continue</button>
          </form>
        ) : (
          <form onSubmit={handleResetSubmit}>
            <div className="auth-input">
              <label htmlFor="newPassword">New Password</label>
              <input
                id="newPassword"
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
              />
            </div>
            <div className="auth-input">
              <label htmlFor="confirmPassword">Confirm New Password</label>
              <input
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>
            {error && <p className="auth-error">{error}</p>}
            <button type="submit" className="auth-submit-btn">Reset Password</button>
          </form>
        )}
      </div>
    </div>
  );
}