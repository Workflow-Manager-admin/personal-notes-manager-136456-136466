import React from 'react';
import NoteCard from './NoteCard';
import './NotesList.css';

// PUBLIC_INTERFACE
export default function NotesList({ notes, onEdit, onDelete, layout }) {
  /**
   * Displays notes either as a grid or list.
   */
  return (
    <div className={`notes-main-list notes-main-list-${layout}`}>
      {notes.length === 0 && (
        <div className="empty-hint">No notes found.</div>
      )}
      {notes.map(note => (
        <NoteCard key={note.id} note={note} layout={layout} onEdit={onEdit} onDelete={onDelete} />
      ))}
    </div>
  );
}
