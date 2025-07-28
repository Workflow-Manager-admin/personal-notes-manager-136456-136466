import React from 'react';
import './SearchBar.css';

// PUBLIC_INTERFACE
export default function SearchBar({ value, onChange, placeholder }) {
  /**
   * Search bar for filtering/looking up notes.
   */
  return (
    <div className="notes-search-bar">
      <input
        className="notes-search-input"
        type="search"
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder || "Search notes..."}
        spellCheck={false}
        aria-label="Search notes"
      />
      <span className="search-icon" role="img" aria-label="search">🔍</span>
    </div>
  );
}
