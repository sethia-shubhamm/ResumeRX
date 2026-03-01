import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CONFIRMATION_TEXT = 'delete';

export default function DangerZone() {
  const navigate = useNavigate();
  const [confirmationText, setConfirmationText] = useState('');
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  const isConfirmationValid = confirmationText === CONFIRMATION_TEXT;

  const handleDeleteAccount = () => {
    if (!isConfirmationValid) return;

    const keysToRemove = [
      'rr-resumes',
      'rr-user-profile',
      'rr-preferences',
      'rr-ai-settings',
      'rr-api-keys'
    ];
    
    keysToRemove.forEach(key => localStorage.removeItem(key));
    
    const toast = document.createElement('div');
    toast.className = 'settings-toast';
    toast.textContent = 'Account deleted. All data has been cleared.';
    document.body.appendChild(toast);
    setTimeout(() => {
      toast.remove();
      navigate('/');
    }, 2000);
  };

  const handleClearAllData = () => {
    if (!confirm('Are you sure you want to clear all application data? This will remove all your resumes and settings.')) {
      return;
    }

    localStorage.clear();
    
    const toast = document.createElement('div');
    toast.className = 'settings-toast';
    toast.textContent = 'All data cleared successfully!';
    document.body.appendChild(toast);
    setTimeout(() => {
      toast.remove();
      window.location.reload();
    }, 2000);
  };

  const handleExportData = () => {
    const data = {};
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key.startsWith('rr-')) {
        data[key] = localStorage.getItem(key);
      }
    }

    const dataStr = JSON.stringify(data, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = `reactive-resume-backup-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    
    const toast = document.createElement('div');
    toast.className = 'settings-toast';
    toast.textContent = 'Data exported successfully!';
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 3000);
  };

  return (
    <div className="settings-page">
      <div className="settings-header">
        <div className="settings-header-icon text-danger">
          <i className="bi bi-exclamation-triangle-fill"></i>
        </div>
        <h1 className="settings-title">Danger Zone</h1>
      </div>

      <div className="settings-separator"></div>

      <div className="settings-form">
        <div className="danger-section">
          <div className="danger-section-content">
            <h3>Export Your Data</h3>
            <p className="text-muted">
              Download all your resumes and settings as a JSON file. You can use this backup
              to restore your data later or migrate to another instance.
            </p>
          </div>
          <button className="btn btn-outline-primary" onClick={handleExportData}>
            <i className="bi bi-download"></i>
            Export Data
          </button>
        </div>

        <div className="settings-separator"></div>

        <div className="danger-section">
          <div className="danger-section-content">
            <h3>Clear All Data</h3>
            <p className="text-muted">
              This will permanently delete all your resumes, settings, and preferences from
              your browser's local storage. This action cannot be undone.
            </p>
          </div>
          <button className="btn btn-outline-danger" onClick={handleClearAllData}>
            <i className="bi bi-trash"></i>
            Clear All Data
          </button>
        </div>

        <div className="settings-separator"></div>

        <div className="danger-section">
          <div className="danger-section-content">
            <h3>Delete Account</h3>
            <p className="text-muted">
              To delete your account, you need to enter the confirmation text and click the
              button below. This will permanently delete all your data and cannot be undone.
            </p>
            
            <div className="mt-3">
              <input
                type="text"
                className="form-control"
                value={confirmationText}
                onChange={(e) => setConfirmationText(e.target.value)}
                placeholder={`Type "${CONFIRMATION_TEXT}" to confirm`}
              />
            </div>
          </div>
          <button
            className="btn btn-danger"
            disabled={!isConfirmationValid}
            onClick={() => setShowDeleteDialog(true)}
          >
            <i className="bi bi-trash"></i>
            Delete Account
          </button>
        </div>
      </div>

      {showDeleteDialog && (
        <>
          <div className="modal-backdrop show" onClick={() => setShowDeleteDialog(false)}></div>
          <div className="modal show d-block" tabIndex="-1">
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">
                    <i className="bi bi-exclamation-triangle-fill text-danger me-2"></i>
                    Delete Account
                  </h5>
                  <button
                    type="button"
                    className="btn-close"
                    onClick={() => setShowDeleteDialog(false)}
                  ></button>
                </div>
                <div className="modal-body">
                  <p>
                    <strong>Are you absolutely sure?</strong>
                  </p>
                  <p className="text-muted">
                    This action cannot be undone. All your data will be permanently deleted
                    from your browser's local storage. Make sure you have exported your data
                    before proceeding.
                  </p>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => setShowDeleteDialog(false)}
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    className="btn btn-danger"
                    onClick={handleDeleteAccount}
                  >
                    <i className="bi bi-trash"></i>
                    Delete Everything
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
