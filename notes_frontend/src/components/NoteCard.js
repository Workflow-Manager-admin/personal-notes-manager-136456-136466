import React from 'react';
import './NoteCard.css';

// PUBLIC_INTERFACE
export default function NoteCard({ note, onEdit, onDelete, layout }) {
  /**
   * Card or list item for displaying a note.
   */
  return (
    <div className={`note-card note-card-${layout}`}>
      <h3 className="note-title">{note.title}</h3>
      <div className="note-content">{note.content ? note.content.slice(0, 300) : <i>No content</i>}</div>
      <div className="note-meta">
        <span className="note-date">{new Date(note.updated_at || note.created_at).toLocaleString()}</span>
        <button className="note-btn" aria-label="Edit" onClick={() => onEdit(note)}>✎</button>
        <button className="note-btn note-btn-danger" aria-label="Delete" onClick={() => onDelete(note)}>🗑</button>
      </div>
    </div>
  );
}
