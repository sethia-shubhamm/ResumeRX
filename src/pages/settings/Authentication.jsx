import React, { useState } from 'react';

export default function Authentication() {
  const [showPasswordDialog, setShowPasswordDialog] = useState(false);
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  const [googleLinked, setGoogleLinked] = useState(false);
  const [githubLinked, setGithubLinked] = useState(false);
  
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordForm(prev => ({ ...prev, [name]: value }));
  };

  const handlePasswordUpdate = (e) => {
    e.preventDefault();
    
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    
    if (passwordForm.newPassword.length < 8) {
      alert('Password must be at least 8 characters');
      return;
    }
    
    const toast = document.createElement('div');
    toast.className = 'settings-toast';
    toast.textContent = 'Password updated successfully!';
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 3000);
    
    setShowPasswordDialog(false);
    setPasswordForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
  };

  const toggle2FA = () => {
    setTwoFactorEnabled(!twoFactorEnabled);
    
    const toast = document.createElement('div');
    toast.className = 'settings-toast';
    toast.textContent = `Two-factor authentication ${!twoFactorEnabled ? 'enabled' : 'disabled'}!`;
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 3000);
  };

  const toggleProvider = (provider) => {
    if (provider === 'google') {
      setGoogleLinked(!googleLinked);
    } else if (provider === 'github') {
      setGithubLinked(!githubLinked);
    }
    
    const action = (provider === 'google' ? !googleLinked : !githubLinked) ? 'connected' : 'disconnected';
    const toast = document.createElement('div');
    toast.className = 'settings-toast';
    toast.textContent = `${provider === 'google' ? 'Google' : 'GitHub'} account ${action}!`;
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 3000);
  };

  return (
    <div className="settings-page">
      <div className="settings-header">
        <div className="settings-header-icon">
          <i className="bi bi-shield-check"></i>
        </div>
        <h1 className="settings-title">Authentication</h1>
      </div>

      <div className="settings-separator"></div>

      <div className="settings-form">
        <div className="auth-section">
          <div className="auth-section-header">
            <div className="auth-section-title">
              <i className="bi bi-key-fill"></i>
              <h3>Password</h3>
            </div>
            <button
              className="btn btn-outline-primary btn-sm"
              onClick={() => setShowPasswordDialog(true)}
            >
              <i className="bi bi-pencil"></i>
              Update Password
            </button>
          </div>
        </div>

        <div className="settings-separator"></div>

        <div className="auth-section">
          <div className="auth-section-header">
            <div className="auth-section-title">
              <i className={twoFactorEnabled ? "bi bi-unlock-fill" : "bi bi-key-fill"}></i>
              <h3>Two-Factor Authentication</h3>
            </div>
            <button
              className="btn btn-outline-primary btn-sm"
              onClick={toggle2FA}
            >
              <i className={twoFactorEnabled ? "bi bi-toggle-on" : "bi bi-toggle-off"}></i>
              {twoFactorEnabled ? 'Disable 2FA' : 'Enable 2FA'}
            </button>
          </div>
        </div>

        <div className="settings-separator"></div>

        <div className="auth-section">
          <div className="auth-section-header">
            <div className="auth-section-title">
              <i className="bi bi-google"></i>
              <h3>Google</h3>
            </div>
            <button
              className="btn btn-outline-primary btn-sm"
              onClick={() => toggleProvider('google')}
            >
              <i className={googleLinked ? "bi bi-link-45deg" : "bi bi-link"}></i>
              {googleLinked ? 'Disconnect' : 'Connect'}
            </button>
          </div>
        </div>

        <div className="settings-separator"></div>

        <div className="auth-section">
          <div className="auth-section-header">
            <div className="auth-section-title">
              <i className="bi bi-github"></i>
              <h3>GitHub</h3>
            </div>
            <button
              className="btn btn-outline-primary btn-sm"
              onClick={() => toggleProvider('github')}
            >
              <i className={githubLinked ? "bi bi-link-45deg" : "bi bi-link"}></i>
              {githubLinked ? 'Disconnect' : 'Connect'}
            </button>
          </div>
        </div>
      </div>

      {showPasswordDialog && (
        <>
          <div className="modal-backdrop show" onClick={() => setShowPasswordDialog(false)}></div>
          <div className="modal show d-block" tabIndex="-1">
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Update Password</h5>
                  <button
                    type="button"
                    className="btn-close"
                    onClick={() => setShowPasswordDialog(false)}
                  ></button>
                </div>
                <form onSubmit={handlePasswordUpdate}>
                  <div className="modal-body">
                    <div className="mb-3">
                      <label htmlFor="currentPassword" className="form-label">
                        Current Password
                      </label>
                      <input
                        type="password"
                        className="form-control"
                        id="currentPassword"
                        name="currentPassword"
                        value={passwordForm.currentPassword}
                        onChange={handlePasswordChange}
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="newPassword" className="form-label">
                        New Password
                      </label>
                      <input
                        type="password"
                        className="form-control"
                        id="newPassword"
                        name="newPassword"
                        value={passwordForm.newPassword}
                        onChange={handlePasswordChange}
                        minLength={8}
                        required
                      />
                      <small className="form-text text-muted">
                        Minimum 8 characters
                      </small>
                    </div>
                    <div className="mb-3">
                      <label htmlFor="confirmPassword" className="form-label">
                        Confirm New Password
                      </label>
                      <input
                        type="password"
                        className="form-control"
                        id="confirmPassword"
                        name="confirmPassword"
                        value={passwordForm.confirmPassword}
                        onChange={handlePasswordChange}
                        minLength={8}
                        required
                      />
                    </div>
                  </div>
                  <div className="modal-footer">
                    <button
                      type="button"
                      className="btn btn-secondary"
                      onClick={() => setShowPasswordDialog(false)}
                    >
                      Cancel
                    </button>
                    <button type="submit" className="btn btn-primary">
                      Update Password
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
