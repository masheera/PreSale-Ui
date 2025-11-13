// src/pages/Login.jsx
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "./Login.css";

export default function Login() {
  const { login } = useAuth();
  const nav = useNavigate();
  const loc = useLocation();
  const from = loc.state?.from || "/setup";

  const [form, setForm] = useState({ username: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    setErr("");
    setLoading(true);
    try {
      await login(form);
      nav(from, { replace: true });
    } catch (e) {
      setErr("Invalid username or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <div className="brand">VibeConnect</div>
        <h2 className="title">Sign in</h2>
        <p className="subtitle">Use your account credentials</p>

        <form onSubmit={onSubmit} className="login-form">
          <label className="label">Username</label>
          <input
            className="input"
            type="text"
            value={form.username}
            onChange={(e) =>
              setForm((f) => ({ ...f, username: e.target.value }))
            }
            placeholder="Enter username"
            autoFocus
            required
          />

          <label className="label">Password</label>
          <input
            className="input"
            type="password"
            value={form.password}
            onChange={(e) =>
              setForm((f) => ({ ...f, password: e.target.value }))
            }
            placeholder="Enter password"
            required
          />

          {err ? <div className="error">{err}</div> : null}

          <button className="btn" type="submit" disabled={loading}>
            {loading ? "Signing in..." : "Sign in"}
          </button>
        </form>

        <div className="footer-help">Forgot password? Contact your admin.</div>
      </div>
    </div>
  );
}
