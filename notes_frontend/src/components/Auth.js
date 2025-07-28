import React, { useState } from 'react';

const FORM_TYPE = { LOGIN: "login", REGISTER: "register" };

// PUBLIC_INTERFACE
export default function AuthPage({ onLogin, loading }) {
  /**
   * Functional component for login/registration forms.
   */
  const [form, setForm] = useState(FORM_TYPE.LOGIN);
  const [email, setEmail] = useState('');
  const [pw, setPw] = useState('');
  const [message, setMessage] = useState('');
  const [busy, setBusy] = useState(false);

  // PUBLIC_INTERFACE
  async function handleSubmit(e) {
    e.preventDefault();
    setBusy(true);
    setMessage('');
    try {
      await onLogin({ email, password: pw }, form);
    } catch (err) {
      setMessage(
        err?.message?.toLowerCase().includes("register") ? "Registration failed" : "Login failed"
      );
    }
    setBusy(false);
  }

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2 className="auth-title">{form === FORM_TYPE.LOGIN ? "Sign In" : "Register"}</h2>
        <form className="auth-form" autoComplete="off" onSubmit={handleSubmit}>
          <label>Email</label>
          <input
            required type="email" autoFocus autoComplete="username"
            value={email} onChange={e => setEmail(e.target.value)}
            disabled={busy}
          />
          <label>Password</label>
          <input
            required type="password" autoComplete="current-password"
            value={pw} onChange={e => setPw(e.target.value)}
            minLength={6}
            disabled={busy}
          />
          <button className="btn-accent" disabled={busy || loading} type="submit">
            {form === FORM_TYPE.LOGIN ? "Login" : "Register"}
          </button>
        </form>
        <div className="toggle-form">
          {form === FORM_TYPE.LOGIN ? (
            <>
              Don't have an account?
              {' '}
              <button type="button" onClick={() => setForm(FORM_TYPE.REGISTER)} disabled={busy}>Register</button>
            </>
          ) : (
            <>
              Already have an account?
              {' '}
              <button type="button" onClick={() => setForm(FORM_TYPE.LOGIN)} disabled={busy}>Sign In</button>
            </>
          )}
        </div>
        {message && <div className="auth-error">{message}</div>}
      </div>
    </div>
  );
}
