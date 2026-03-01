import React, { useState, useEffect } from 'react';

function generateAPIKey() {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let key = 'rr_';
  for (let i = 0; i < 32; i++) {
    key += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return key;
}

export default function ApiKeys() {
  const [apiKeys, setApiKeys] = useState([]);
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [newKeyName, setNewKeyName] = useState('');
  const [newKeyExpiry, setNewKeyExpiry] = useState('30');
  const [showNewKey, setShowNewKey] = useState(null);

  useEffect(() => {
    const stored = localStorage.getItem('rr-api-keys');
    if (stored) {
      const keys = JSON.parse(stored);
      const validKeys = keys.filter(key => new Date(key.expiresAt) > new Date());
      setApiKeys(validKeys);
      if (validKeys.length !== keys.length) {
        localStorage.setItem('rr-api-keys', JSON.stringify(validKeys));
      }
    }
  }, []);

  const createAPIKey = (e) => {
    e.preventDefault();
    
    const newKey = {
      id: Date.now().toString(),
      key: generateAPIKey(),
      name: newKeyName,
      start: generateAPIKey().substring(0, 8),
      createdAt: new Date().toISOString(),
      expiresAt: new Date(Date.now() + parseInt(newKeyExpiry) * 24 * 60 * 60 * 1000).toISOString()
    };

    const updatedKeys = [...apiKeys, newKey];
    setApiKeys(updatedKeys);
    localStorage.setItem('rr-api-keys', JSON.stringify(updatedKeys));
    
    setShowNewKey(newKey.key);
    setShowCreateDialog(false);
    setNewKeyName('');
    setNewKeyExpiry('30');
  };

  const deleteAPIKey = (id) => {
    if (!confirm('Are you sure you want to delete this API key? This action cannot be undone.')) {
      return;
    }

    const updatedKeys = apiKeys.filter(key => key.id !== id);
    setApiKeys(updatedKeys);
    localStorage.setItem('rr-api-keys', JSON.stringify(updatedKeys));
    
    const toast = document.createElement('div');
    toast.className = 'settings-toast';
    toast.textContent = 'API key deleted successfully!';
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 3000);
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    const toast = document.createElement('div');
    toast.className = 'settings-toast';
    toast.textContent = 'Copied to clipboard!';
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 2000);
  };

  return (
    <div className="settings-page">
      <div className="settings-header">
        <div className="settings-header-icon">
          <i className="bi bi-key-fill"></i>
        </div>
        <h1 className="settings-title">API Keys</h1>
      </div>

      <div className="settings-separator"></div>

      <div className="settings-form">
        <div className="info-card">
          <div className="info-card-icon">
            <i className="bi bi-book"></i>
          </div>
          <div className="info-card-content">
            <h3>How do I use the API?</h3>
            <p>
              Explore the API documentation to learn how to integrate ResumeRX with
              your applications. Find detailed endpoints, request examples, and authentication
              methods.
            </p>
            <a
              href=""
              target="_blank"
              rel="noopener noreferrer"
              className="info-card-link"
            >
              <i className="bi bi-link-45deg"></i>
              API Reference
            </a>
          </div>
        </div>

        <div className="settings-separator"></div>

        <button
          className="btn btn-outline-primary w-100 py-3"
          onClick={() => setShowCreateDialog(true)}
        >
          <i className="bi bi-plus-lg"></i>
          Create a new API key
        </button>

        {apiKeys.length > 0 && (
          <div className="api-keys-list">
            {apiKeys.map((key, index) => (
              <div
                key={key.id}
                className="api-key-item"
                style={{ animationDelay: `${index * 0.08}s` }}
              >
                <i className="bi bi-key-fill text-primary"></i>
                <div className="api-key-info">
                  <p className="api-key-code">{key.start}...</p>
                  <small className="text-muted">
                    Expires on {new Date(key.expiresAt).toLocaleDateString()}
                  </small>
                </div>
                <button
                  className="btn btn-sm btn-ghost"
                  onClick={() => deleteAPIKey(key.id)}
                  title="Delete API Key"
                >
                  <i className="bi bi-trash"></i>
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {showCreateDialog && (
        <>
          <div className="modal-backdrop show" onClick={() => setShowCreateDialog(false)}></div>
          <div className="modal show d-block" tabIndex="-1">
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Create API Key</h5>
                  <button
                    type="button"
                    className="btn-close"
                    onClick={() => setShowCreateDialog(false)}
                  ></button>
                </div>
                <form onSubmit={createAPIKey}>
                  <div className="modal-body">
                    <div className="mb-3">
                      <label htmlFor="keyName" className="form-label">
                        Key Name (Optional)
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="keyName"
                        value={newKeyName}
                        onChange={(e) => setNewKeyName(e.target.value)}
                        placeholder="My API Key"
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="keyExpiry" className="form-label">
                        Expires In
                      </label>
                      <select
                        className="form-select"
                        id="keyExpiry"
                        value={newKeyExpiry}
                        onChange={(e) => setNewKeyExpiry(e.target.value)}
                      >
                        <option value="7">7 days</option>
                        <option value="30">30 days</option>
                        <option value="60">60 days</option>
                        <option value="90">90 days</option>
                        <option value="365">1 year</option>
                      </select>
                    </div>
                  </div>
                  <div className="modal-footer">
                    <button
                      type="button"
                      className="btn btn-secondary"
                      onClick={() => setShowCreateDialog(false)}
                    >
                      Cancel
                    </button>
                    <button type="submit" className="btn btn-primary">
                      Create Key
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </>
      )}

      {showNewKey && (
        <>
          <div className="modal-backdrop show" onClick={() => setShowNewKey(null)}></div>
          <div className="modal show d-block" tabIndex="-1">
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">API Key Created</h5>
                  <button
                    type="button"
                    className="btn-close"
                    onClick={() => setShowNewKey(null)}
                  ></button>
                </div>
                <div className="modal-body">
                  <div className="alert alert-warning" role="alert">
                    <i className="bi bi-exclamation-triangle-fill"></i>
                    <strong>Important!</strong> Copy this key now. You won't be able to see it again.
                  </div>
                  <div className="api-key-display">
                    <code>{showNewKey}</code>
                    <button
                      className="btn btn-sm btn-primary"
                      onClick={() => copyToClipboard(showNewKey)}
                    >
                      <i className="bi bi-clipboard"></i>
                    </button>
                  </div>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={() => setShowNewKey(null)}
                  >
                    I've copied the key
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
