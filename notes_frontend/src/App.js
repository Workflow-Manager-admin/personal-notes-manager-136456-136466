import React, { useState, useEffect, useMemo } from 'react';
import './App.css';

import { useAuth } from './hooks/useAuth';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Modal from './components/Modal';
import NoteForm from './components/NoteForm';
import NotesList from './components/NotesList';
import SearchBar from './components/SearchBar';
import AuthPage from './components/Auth';

import {
  fetchNotes,
  createNote,
  updateNote,
  deleteNote,
  searchNotes,
} from './services/api';

import './components/Sidebar.css';
import './components/Header.css';
import './components/Modal.css';
import './components/NoteCard.css';
import './components/NotesList.css';
import './components/Auth.css';
import './components/NoteForm.css';
import './components/SearchBar.css';

function App() {
  // Theme management (light/dark)
  const [theme, setTheme] = useState('light');
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);
  const toggleTheme = () => setTheme(t => (t === 'light' ? 'dark' : 'light'));

  // Authentication
  const { token, user, loginUser, registerUser, logout, authLoading } = useAuth();

  // Notes list and actions
  const [notes, setNotes] = useState([]);
  const [notesLoading, setNotesLoading] = useState(false);
  const [search, setSearch] = useState('');
  const [searching, setSearching] = useState(false);
  const [layout, setLayout] = useState('grid'); // 'grid' or 'list'
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [error, setError] = useState('');

  // Fetch notes from API
  const loadNotes = async () => {
    if (!token) return;
    setNotesLoading(true);
    try {
      setNotes(await fetchNotes(token));
    } catch (e) {
      setError(e.message || 'Error loading notes.');
    }
    setNotesLoading(false);
  };

  // On login or search, reload notes
  useEffect(() => {
    if (!token) return;
    if (!search) loadNotes();
    else onSearch(search);
    // eslint-disable-next-line
  }, [token]);

  // Search notes
  const onSearch = async (q) => {
    setSearch(q);
    if (!token) return;
    if (!q) return loadNotes();
    setSearching(true);
    try {
      setNotes(await searchNotes(token, q));
      setError('');
    } catch (e) {
      setError('Search error');
    }
    setSearching(false);
  };

  // Create or update notes
  const openModal = (note) => { setEditing(note || null); setModalOpen(true);}
  const closeModal = () => { setModalOpen(false); setEditing(null);}
  const handleSaveNote = async (data) => {
    try {
      if (editing) {
        await updateNote(token, editing.id, data);
      } else {
        await createNote(token, data);
      }
      closeModal();
      await loadNotes();
    } catch (e) {
      setError(e.message || 'Save error.');
    }
  };
  const handleDelete = async (note) => {
    if (!window.confirm("Delete this note?")) return;
    try {
      await deleteNote(token, note.id);
      await loadNotes();
    } catch (e) {
      setError('Delete failed.');
    }
  };

  // Auth handling for login/register
  const handleAuth = async (payload, type) => {
    setError('');
    try {
      if (type === "login") await loginUser(payload);
      else if (type === "register") await registerUser(payload);
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  // Show loading or auth screen if not authenticated
  if (authLoading) return (
    <div style={{textAlign:'center',marginTop:'30vh',fontSize:'1.4em',color:'var(--primary,#1976d2)'}}>Loading...</div>
  );
  if (!token) return <AuthPage onLogin={handleAuth} loading={authLoading} />;

  const mainContent = (
    <main className="notes-app-main">
      <div className="main-header-row">
        <SearchBar value={search} onChange={onSearch} placeholder="Search notes..." />
        <div className="layout-switch">
          <button
            aria-label="Grid layout"
            title="Grid layout"
            className={layout === 'grid' ? 'layout-btn layout-btn-active' : 'layout-btn'}
            onClick={() => setLayout('grid')}
          >
            🟦
          </button>
          <button
            aria-label="List layout"
            title="List layout"
            className={layout === 'list' ? 'layout-btn layout-btn-active' : 'layout-btn'}
            onClick={() => setLayout('list')}
          >
            ☰
          </button>
          <button
            className="add-note-btn"
            aria-label="New Note"
            title="New Note"
            onClick={() => openModal(null)}
            style={{
              background: 'var(--accent,#ff9800)',
              color: '#fff',
              border: 'none',
              marginLeft: '1.6em',
              borderRadius: 8,
              fontSize: '1.2em',
              fontWeight: 700,
              padding: '0.3em 1.2em',
              cursor: 'pointer'
            }}
          >+ Note</button>
        </div>
      </div>
      {notesLoading || searching ? (
        <div style={{margin:'2em auto',color:'var(--primary,#1976d2)',fontSize:'1.2em'}}>Loading...</div>
      ) : (
        <NotesList notes={notes} onEdit={openModal} onDelete={handleDelete} layout={layout} />
      )}
      {error && <div style={{marginTop:'1.2em', color:'#b2171c', background:'#fff0ea', borderRadius:8, padding:'0.9em'}}>{error}</div>}
    </main>
  );

  return (
    <div className="App notes-root" style={{display:'flex',flexDirection:'column',minHeight:'100vh'}}>
      <Header onLogout={logout} user={user} />
      <div className="notes-main-container" style={{display:'flex',minHeight:'94vh'}}>
        <Sidebar />
        <div className="notes-center-content">
          <button
            className="theme-toggle"
            onClick={toggleTheme}
            aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
          >
            {theme === 'light' ? '🌙' : '☀️'}
          </button>
          {mainContent}
        </div>
      </div>
      <Modal open={modalOpen} onClose={closeModal} title={editing ? 'Edit Note' : 'New Note'}>
        <NoteForm
          initial={editing}
          onSave={handleSaveNote}
          onCancel={closeModal}
          loading={false}
        />
      </Modal>
    </div>
  );
}

export default App;
