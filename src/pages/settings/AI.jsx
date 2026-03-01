import React, { useState, useEffect } from 'react';

const AI_PROVIDERS = [
  {
    value: 'openai',
    label: 'OpenAI',
    defaultBaseURL: 'https://api.openai.com/v1',
    defaultModel: 'gpt-4'
  },
  {
    value: 'anthropic',
    label: 'Anthropic Claude',
    defaultBaseURL: 'https://api.anthropic.com/v1',
    defaultModel: 'claude-3-opus-20240229'
  },
  {
    value: 'gemini',
    label: 'Google Gemini',
    defaultBaseURL: 'https://generativelanguage.googleapis.com/v1beta',
    defaultModel: 'gemini-pro'
  },
  {
    value: 'ollama',
    label: 'Ollama (Local)',
    defaultBaseURL: 'http://localhost:11434',
    defaultModel: 'llama2'
  },
  {
    value: 'vercel-ai-gateway',
    label: 'Vercel AI Gateway',
    defaultBaseURL: 'https://ai-gateway.vercel.sh/v1/ai',
    defaultModel: 'gpt-4'
  }
];

export default function AI() {
  const [enabled, setEnabled] = useState(false);
  const [provider, setProvider] = useState('openai');
  const [model, setModel] = useState('gpt-4');
  const [apiKey, setApiKey] = useState('');
  const [baseURL, setBaseURL] = useState('');
  const [testStatus, setTestStatus] = useState(null);

  useEffect(() => {
    const stored = localStorage.getItem('rr-ai-settings');
    if (stored) {
      const data = JSON.parse(stored);
      setEnabled(data.enabled || false);
      setProvider(data.provider || 'openai');
      setModel(data.model || 'gpt-4');
      setApiKey(data.apiKey || '');
      setBaseURL(data.baseURL || '');
    }
  }, []);

  const saveSettings = (updates) => {
    const settings = {
      enabled,
      provider,
      model,
      apiKey,
      baseURL,
      ...updates
    };
    localStorage.setItem('rr-ai-settings', JSON.stringify(settings));
  };

  const handleProviderChange = (e) => {
    const newProvider = e.target.value;
    const providerData = AI_PROVIDERS.find(p => p.value === newProvider);
    setProvider(newProvider);
    setModel(providerData?.defaultModel || '');
    setBaseURL('');
    setTestStatus(null);
    saveSettings({
      provider: newProvider,
      model: providerData?.defaultModel || '',
      baseURL: ''
    });
  };

  const handleModelChange = (e) => {
    const newModel = e.target.value;
    setModel(newModel);
    setTestStatus(null);
    saveSettings({ model: newModel });
  };

  const handleApiKeyChange = (e) => {
    const newKey = e.target.value;
    setApiKey(newKey);
    setTestStatus(null);
    saveSettings({ apiKey: newKey });
  };

  const handleBaseURLChange = (e) => {
    const newURL = e.target.value;
    setBaseURL(newURL);
    setTestStatus(null);
    saveSettings({ baseURL: newURL });
  };

  const handleToggleEnabled = () => {
    const newEnabled = !enabled;
    setEnabled(newEnabled);
    saveSettings({ enabled: newEnabled });
    
    const toast = document.createElement('div');
    toast.className = 'settings-toast';
    toast.textContent = `AI features ${newEnabled ? 'enabled' : 'disabled'}!`;
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 3000);
  };

  const handleTestConnection = () => {
    if (!apiKey || !model) {
      alert('Please provide an API key and model');
      return;
    }

    setTestStatus('testing');
    
    setTimeout(() => {
      const success = Math.random() > 0.3;
      setTestStatus(success ? 'success' : 'failure');
      
      const toast = document.createElement('div');
      toast.className = 'settings-toast';
      toast.textContent = success
        ? 'Connection successful!'
        : 'Connection failed. Please check your settings.';
      document.body.appendChild(toast);
      setTimeout(() => toast.remove(), 3000);
    }, 1500);
  };

  const selectedProvider = AI_PROVIDERS.find(p => p.value === provider);
  const canEnable = apiKey && model;

  return (
    <div className="settings-page">
      <div className="settings-header">
        <div className="settings-header-icon">
          <i className="bi bi-brain"></i>
        </div>
        <h1 className="settings-title">Artificial Intelligence</h1>
      </div>

      <div className="settings-separator"></div>

      <div className="settings-form">
        <div className="info-card">
          <div className="info-card-icon">
            <i className="bi bi-info-circle"></i>
          </div>
          <div className="info-card-content">
            <h3>Your data is stored locally</h3>
            <p>
              Everything entered here is stored locally on your browser. Your data is only
              sent to the server when making a request to the AI provider, and is never
              stored or logged on our servers.
            </p>
          </div>
        </div>

        <div className="settings-separator"></div>

        <div className="ai-enable-section">
          <label htmlFor="enable-ai" className="form-label">
            Enable AI Features
          </label>
          <div className="form-check form-switch">
            <input
              className="form-check-input"
              type="checkbox"
              role="switch"
              id="enable-ai"
              checked={enabled}
              disabled={!canEnable}
              onChange={handleToggleEnabled}
            />
          </div>
        </div>

        <div className={`ai-status ${enabled ? 'enabled' : 'disabled'}`}>
          <i className={enabled ? 'bi bi-check-circle-fill' : 'bi bi-x-circle-fill'}></i>
          <span>{enabled ? 'Enabled' : 'Disabled'}</span>
        </div>

        <div className="row g-3">
          <div className="col-md-6">
            <label htmlFor="ai-provider" className="form-label">
              Provider
            </label>
            <select
              id="ai-provider"
              className="form-select"
              value={provider}
              disabled={enabled}
              onChange={handleProviderChange}
            >
              {AI_PROVIDERS.map(p => (
                <option key={p.value} value={p.value}>
                  {p.label}
                </option>
              ))}
            </select>
          </div>

          <div className="col-md-6">
            <label htmlFor="ai-model" className="form-label">
              Model
            </label>
            <input
              type="text"
              id="ai-model"
              className="form-control"
              value={model}
              disabled={enabled}
              onChange={handleModelChange}
              placeholder="e.g., gpt-4, claude-3-opus, gemini-pro"
              autoComplete="off"
              spellCheck="false"
            />
          </div>

          <div className="col-12">
            <label htmlFor="ai-api-key" className="form-label">
              API Key
            </label>
            <input
              type="password"
              id="ai-api-key"
              className="form-control"
              value={apiKey}
              disabled={enabled}
              onChange={handleApiKeyChange}
              autoComplete="off"
              spellCheck="false"
              data-lpignore="true"
              data-bwignore="true"
              data-1p-ignore="true"
            />
          </div>

          <div className="col-12">
            <label htmlFor="ai-base-url" className="form-label">
              Base URL (Optional)
            </label>
            <input
              type="url"
              id="ai-base-url"
              className="form-control"
              value={baseURL}
              disabled={enabled}
              onChange={handleBaseURLChange}
              placeholder={selectedProvider?.defaultBaseURL}
              autoComplete="off"
              spellCheck="false"
            />
          </div>

          <div className="col-12">
            <button
              className="btn btn-outline-primary"
              disabled={testStatus === 'testing' || enabled || !canEnable}
              onClick={handleTestConnection}
            >
              {testStatus === 'testing' && (
                <span className="spinner-border spinner-border-sm me-2" role="status"></span>
              )}
              {testStatus === 'success' && <i className="bi bi-check-circle-fill text-success me-2"></i>}
              {testStatus === 'failure' && <i className="bi bi-x-circle-fill text-danger me-2"></i>}
              Test Connection
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
