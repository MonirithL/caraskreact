import { useState } from "react";

import "./App.css";
import { useNavigate } from "react-router";
import { createClient } from "@supabase/supabase-js";

function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const API_BASE = "http://localhost:3000/auth"; // your express server
  const SUPABASE_URL = import.meta.env.SUPABASE_URL;
  const SUPABASE_ANON_KEY = import.meta.env.SUPABASE_ANON_KEY;
  const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
  // Login with email + password
  async function loginWithPassword() {
    const res = await fetch(`${API_BASE}/login/password`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
      credentials: "include",
    });

    if (!res.ok) {
      throw new Error("Login failed");
    }
    navigate("/home", { replace: true });
  }

  // Start Google OAuth login
  async function loginWithGoogle() {
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: "http://localhost:5173/auth/callback",
      },
    });
  }

  // Register new account
  async function register() {
    const res = await fetch(`${API_BASE}/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
      credentials: "include",
    });

    if (!res.ok) {
      throw new Error("Register failed");
    }
    return res.json();
  }
  return (
    <>
      <div>Email:&nbsp;</div>
      <input
        type="text"
        value={email}
        onChange={(e) => setEmail(e.target.value.trim())}
      />
      <div>Password:&nbsp;</div>
      <input
        type="text"
        value={password}
        onChange={(e) => setPassword(e.target.value.trim())}
      />
      <div>
        <button onClick={register}>Register</button>
        <button onClick={loginWithPassword}>Login</button>
        <button onClick={loginWithGoogle}>Login with google</button>
      </div>
    </>
  );
}

export default App;
