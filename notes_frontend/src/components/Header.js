import React from 'react';
import './Header.css';

// PUBLIC_INTERFACE
export default function Header({ onLogout, user }) {
  /**
   * Top application header with navigation and user info.
   */
  return (
    <header className="notes-header-bar">
      <span className="app-title">
        <span className="primary">📝 Notes</span>
        <span className="accent">Manager</span>
      </span>

      <div className="user-block">
        {user ? (
          <>
            <span className="username">{user.email}</span>
            <button className="logout-btn" onClick={onLogout}>Logout</button>
          </>
        ) : (
          <span className="username">Welcome</span>
        )}
      </div>
    </header>
  );
}
