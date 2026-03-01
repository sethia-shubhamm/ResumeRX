import React, { useState, useEffect } from 'react';

export default function Profile() {
  const [formData, setFormData] = useState({
    name: '',
    username: '',
    email: ''
  });
  const [originalData, setOriginalData] = useState({});
  const [isDirty, setIsDirty] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem('rr-user-profile');
    if (stored) {
      const data = JSON.parse(stored);
      setFormData(data);
      setOriginalData(data);
    } else {
      const defaultData = {
        name: 'Shubham Sethia',
        username: 'shubham.sethia',
        email: 'shubham.sethia@example.com'
      };
      setFormData(defaultData);
      setOriginalData(defaultData);
      localStorage.setItem('rr-user-profile', JSON.stringify(defaultData));
    }
  }, []);

  useEffect(() => {
    const dirty = JSON.stringify(formData) !== JSON.stringify(originalData);
    setIsDirty(dirty);
  }, [formData, originalData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCancel = () => {
    setFormData(originalData);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem('rr-user-profile', JSON.stringify(formData));
    setOriginalData(formData);
    
    const toast = document.createElement('div');
    toast.className = 'settings-toast';
    toast.textContent = 'Profile updated successfully!';
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 3000);
  };

  return (
    <div className="settings-page">
      <div className="settings-header">
        <div className="settings-header-icon">
          <i className="bi bi-person-circle"></i>
        </div>
        <h1 className="settings-title">Profile</h1>
      </div>

      <div className="settings-separator"></div>

      <form className="settings-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            className="form-control"
            placeholder="Your full name"
            value={formData.name}
            onChange={handleChange}
            minLength={1}
            maxLength={64}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            name="username"
            className="form-control lowercase"
            placeholder="your.username"
            value={formData.username}
            onChange={handleChange}
            pattern="[a-z0-9._-]+"
            title="Username can only contain lowercase letters, numbers, dots, hyphens and underscores"
            minLength={3}
            maxLength={64}
            required
          />
          <small className="form-text text-muted">
            Can only contain lowercase letters, numbers, dots, hyphens and underscores
          </small>
        </div>

        <div className="form-group">
          <label htmlFor="email">Email Address</label>
          <input
            type="email"
            id="email"
            name="email"
            className="form-control lowercase"
            placeholder="your.email@example.com"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <div className="email-status verified">
            <i className="bi bi-check-circle-fill"></i>
            <span>Verified</span>
          </div>
        </div>

        {isDirty && (
          <div className="form-actions">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={handleCancel}
            >
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              Save Changes
            </button>
          </div>
        )}
      </form>
    </div>
  );
}
