import React from 'react';
import './Sidebar.css';

// PUBLIC_INTERFACE
export default function Sidebar({ children }) {
  /**
   * Sidebar for future folders/tags navigation.
   */
  return (
    <aside className="notes-sidebar">
      <div className="sidebar-header">
        <span role="img" aria-label="folders">📁</span> <strong>My Folders</strong>
      </div>
      <nav>
        <div className="sidebar-item sidebar-item-active">All Notes</div>
        {/* Future: loop for folders/tags */}
      </nav>
      {children}
    </aside>
  );
}
