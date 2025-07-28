import React from 'react';
import './Modal.css';

// PUBLIC_INTERFACE
export default function Modal({ open, title, onClose, children }) {
  /**
   * Modal dialog for note creation/editing.
   */
  if (!open) return null;
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-content"
        onClick={e => e.stopPropagation()}
      >
        <div className="modal-header">
          <span>{title}</span>
          <button className="modal-close-btn" onClick={onClose} aria-label="Close">×</button>
        </div>
        <div className="modal-body">{children}</div>
      </div>
    </div>
  );
}
