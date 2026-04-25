import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import { OAuthSignupCallback } from './OAuthSignupCallback';
import './styles.css';

function Home() {
  return (
    <main className="page">
      <section className="card">
        <p className="eyebrow">Allyvate development environment</p>
        <h1>OAuth signup callback demo</h1>
        <p>
          The local Vite app is running and can exercise the callback component
          with success and error routes.
        </p>
        <div className="actions">
          <Link to="/oauth/google/signup/callback?success=true">Try success flow</Link>
          <Link to="/oauth/google/signup/callback?error=access_denied">Try error flow</Link>
        </div>
      </section>
    </main>
  );
}

function Signup() {
  return (
    <main className="page">
      <section className="card">
        <h1>Signup</h1>
        <p>The callback redirected here after an error.</p>
        <Link to="/">Return home</Link>
      </section>
    </main>
  );
}

function Conversation() {
  return (
    <main className="page">
      <section className="card success-card">
        <h1>Conversation</h1>
        <p>The callback completed signup and redirected here.</p>
        <Link to="/">Return home</Link>
      </section>
    </main>
  );
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/conversation" element={<Conversation />} />
        <Route path="/oauth/:platform/signup/callback" element={<OAuthSignupCallback />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);
