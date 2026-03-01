import React, { useState, useEffect } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';

const APP_NAV = [
  { icon: 'bi-file-earmark-text', label: 'Resumes', path: '/dashboard' },
];

const SETTINGS_NAV = [
  { icon: 'bi-person-circle',        label: 'Profile',        path: '/dashboard/settings/profile' },
  { icon: 'bi-gear-fill',            label: 'Preferences',    path: '/dashboard/settings/preferences' },
  { icon: 'bi-shield-check',         label: 'Authentication', path: '/dashboard/settings/authentication' },
  { icon: 'bi-key-fill',             label: 'API Keys',       path: '/dashboard/settings/api-keys' },
  { icon: 'bi-robot',                label: 'AI',             path: '/dashboard/settings/ai' },
  { icon: 'bi-exclamation-triangle-fill', label: 'Danger Zone', path: '/dashboard/settings/danger-zone' },
];

const DEMO_USER = { name: 'Demo User', email: 'demo@rxresu.me', initials: 'D' };

function Sidebar({ collapsed, setCollapsed, mobileOpen, onClose }) {
  const { pathname } = useLocation();

  return (
    <>
      {mobileOpen && <div className="dbl-overlay" onClick={onClose} />}
      <aside className={`dbl-sidebar${collapsed ? ' dbl-sidebar--collapsed' : ''}${mobileOpen ? ' dbl-sidebar--open' : ''}`}>

        <div className="dbl-sidebar__head">
          <Link to="/" className="dbl-brand" onClick={onClose} title="ResumeRX">
            <img src="/logo/dark.svg" alt="" className="dbl-brand__logo" />
            {!collapsed && <span className="dbl-brand__name">ResumeRX</span>}
          </Link>
          <button
            className="dbl-toggle"
            onClick={() => setCollapsed(c => !c)}
            title={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            <i className={`bi ${collapsed ? 'bi-chevron-right' : 'bi-chevron-left'}`} />
          </button>
        </div>

        <div className="dbl-divider" />

        <nav className="dbl-nav">
          {!collapsed && <span className="dbl-nav__label">App</span>}
          {APP_NAV.map(item => (
            <Link
              key={item.path}
              to={item.path}
              onClick={onClose}
              title={item.label}
              className={`dbl-nav__item${pathname === item.path ? ' dbl-nav__item--active' : ''}`}
            >
              <i className={`bi ${item.icon}`} />
              {!collapsed && <span>{item.label}</span>}
            </Link>
          ))}

          <div className="dbl-nav__gap" />

          {!collapsed && <span className="dbl-nav__label">Settings</span>}
          {SETTINGS_NAV.map(item => (
            <Link
              key={item.path}
              to={item.path}
              onClick={onClose}
              title={item.label}
              className={`dbl-nav__item${pathname.startsWith(item.path) ? ' dbl-nav__item--active' : ''}`}
            >
              <i className={`bi ${item.icon}`} />
              {!collapsed && <span>{item.label}</span>}
            </Link>
          ))}
        </nav>

        <div className="dbl-spacer" />
        <div className="dbl-divider" />

        <div className="dbl-sidebar__foot">
          <div className={`dbl-user${collapsed ? ' dbl-user--collapsed' : ''}`} title={DEMO_USER.name}>
            <div className="dbl-user__avatar">{DEMO_USER.initials}</div>
            {!collapsed && (
              <div className="dbl-user__info">
                <span className="dbl-user__name">{DEMO_USER.name}</span>
                <span className="dbl-user__email">{DEMO_USER.email}</span>
              </div>
            )}
          </div>
          {!collapsed && (
            <p className="dbl-copyright">© {new Date().getFullYear()} ResumeRX</p>
          )}
        </div>
      </aside>
    </>
  );
}

export default function DashboardLayout() {
  const [collapsed, setCollapsed] = useState(() =>
    localStorage.getItem('dbl-collapsed') === 'true'
  );
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem('dbl-collapsed', collapsed);
  }, [collapsed]);

  return (
    <div className={`dbl-root${collapsed ? ' dbl-root--collapsed' : ''}`}>
      <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} mobileOpen={mobileOpen} onClose={() => setMobileOpen(false)} />

      <button className="dbl-mobile-btn d-md-none" onClick={() => setMobileOpen(true)}>
        <i className="bi bi-list" />
      </button>

      <main className="dbl-main">
        <Outlet />
      </main>
    </div>
  );
}
