import { Link, Route, Routes } from 'react-router-dom';
import { OAuthSignupCallback } from './OAuthSignupCallback';

function Home() {
  return (
    <main className="page-shell">
      <section className="card">
        <p className="eyebrow">Allyvate dev environment</p>
        <h1>OAuth signup callback playground</h1>
        <p>
          Use these routes to exercise the callback component without the full production
          application.
        </p>
        <div className="actions">
          <Link to="/oauth/google/signup/callback?success=true">Simulate success</Link>
          <Link to="/oauth/google/signup/callback?error=access_denied">Simulate denied access</Link>
          <Link to="/oauth/github/signup/callback?success=true">Simulate invalid platform</Link>
        </div>
      </section>
    </main>
  );
}

function Conversation() {
  return (
    <main className="page-shell">
      <section className="card success">
        <h1>Conversation route reached</h1>
        <p>The signup callback completed and redirected successfully.</p>
        <Link to="/">Back to playground</Link>
      </section>
    </main>
  );
}

function Signup() {
  return (
    <main className="page-shell">
      <section className="card error">
        <h1>Signup route reached</h1>
        <p>The callback returned to signup after an error state.</p>
        <Link to="/">Back to playground</Link>
      </section>
    </main>
  );
}

export function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/oauth/:platform/signup/callback" element={<OAuthSignupCallback />} />
      <Route path="/conversation" element={<Conversation />} />
      <Route path="/signup" element={<Signup />} />
    </Routes>
  );
}
