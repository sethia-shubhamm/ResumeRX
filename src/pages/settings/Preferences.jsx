import React, { useState, useEffect } from 'react';

export function applyTheme(theme) {
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const resolved = theme === 'system' ? (prefersDark ? 'dark' : 'light') : theme;
  if (resolved === 'light') {
    document.documentElement.setAttribute('data-theme', 'light');
    document.documentElement.setAttribute('data-bs-theme', 'light');
  } else {
    document.documentElement.removeAttribute('data-theme');
    document.documentElement.setAttribute('data-bs-theme', 'dark');
  }
}

export default function Preferences() {
  const [theme, setTheme] = useState('system');
  const [language, setLanguage] = useState('en-US');

  useEffect(() => {
    const stored = localStorage.getItem('rr-preferences');
    if (stored) {
      const data = JSON.parse(stored);
      const savedTheme = data.theme || 'system';
      setTheme(savedTheme);
      setLanguage(data.language || 'en-US');
      applyTheme(savedTheme);
    }
  }, []);

  const handleThemeChange = (e) => {
    const newTheme = e.target.value;
    setTheme(newTheme);
    const prefs = { theme: newTheme, language };
    localStorage.setItem('rr-preferences', JSON.stringify(prefs));
    applyTheme(newTheme);
  };

  const handleLanguageChange = (e) => {
    const newLang = e.target.value;
    setLanguage(newLang);
    
    const prefs = { theme, language: newLang };
    localStorage.setItem('rr-preferences', JSON.stringify(prefs));
  };

  return (
    <div className="settings-page">
      <div className="settings-header">
        <div className="settings-header-icon">
          <i className="bi bi-gear-fill"></i>
        </div>
        <h1 className="settings-title">Preferences</h1>
      </div>

      <div className="settings-separator"></div>

      <div className="settings-form">
        <div className="form-group">
          <label htmlFor="theme">Theme</label>
          <select
            id="theme"
            className="form-select"
            value={theme}
            onChange={handleThemeChange}
          >
            <option value="system">System</option>
            <option value="light">Light</option>
            <option value="dark">Dark</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="language">Language</label>
          <select
            id="language"
            className="form-select"
            value={language}
            onChange={handleLanguageChange}
          >
            <option value="en-US">English (US)</option>
            <option value="es-ES">Español</option>
            <option value="fr-FR">Français</option>
            <option value="de-DE">Deutsch</option>
            <option value="it-IT">Italiano</option>
            <option value="pt-BR">Português (Brasil)</option>
            <option value="pt-PT">Português (Portugal)</option>
            <option value="zh-CN">简体中文</option>
            <option value="zh-TW">繁體中文</option>
            <option value="ja-JP">日本語</option>
            <option value="ko-KR">한국어</option>
            <option value="ru-RU">Русский</option>
            <option value="ar-SA">العربية</option>
            <option value="hi-IN">हिन्दी</option>
            <option value="tr-TR">Türkçe</option>
            <option value="pl-PL">Polski</option>
            <option value="nl-NL">Nederlands</option>
            <option value="sv-SE">Svenska</option>
            <option value="no-NO">Norsk</option>
            <option value="da-DK">Dansk</option>
            <option value="fi-FI">Suomi</option>
          </select>
          <a
            href=""
            target="_blank"
            rel="noopener noreferrer"
            className="form-help-link"
          >
            <small>Help translate the app to your language</small>
            <i className="bi bi-arrow-right"></i>
          </a>
        </div>
      </div>
    </div>
  );
}
