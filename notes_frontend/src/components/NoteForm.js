import React, { useState } from 'react';

// PUBLIC_INTERFACE
export default function NoteForm({ initial, onSave, onCancel, loading }) {
  /**
   * Form to create or edit notes (in a modal).
   */
  const [title, setTitle] = useState(initial?.title || "");
  const [content, setContent] = useState(initial?.content || "");
  const [error, setError] = useState(null);

  async function handleSubmit(e) {
    e.preventDefault();
    setError(null);
    if (!title || title.trim().length < 1) {
      setError("Title is required.");
      return;
    }
    await onSave({ title, content });
  }

  return (
    <form className="note-form" onSubmit={handleSubmit}>
      <label>
        Title
        <input autoFocus required value={title} onChange={e => setTitle(e.target.value)} maxLength={255} />
      </label>
      <label>
        Content
        <textarea value={content} onChange={e => setContent(e.target.value)} rows={5} />
      </label>
      {error && <div className="form-error">{error}</div>}
      <div style={{display:'flex',gap:'.8em', marginTop:'0.7em', justifyContent:'flex-end'}}>
        <button type="button" onClick={onCancel} className="btn-form-cancel">Cancel</button>
        <button type="submit" disabled={loading} className="btn-accent">
          {initial ? 'Update' : 'Create'}
        </button>
      </div>
    </form>
  );
}
