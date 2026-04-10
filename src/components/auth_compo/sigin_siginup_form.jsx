





import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser, registerUser } from "../../features/auth/authSlice.js";
import { useToast } from "../../context/ToastContext.jsx";
import { useNavigate } from "react-router-dom";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');

  @keyframes slideUp {
    from { opacity: 0; transform: translateY(24px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes fadeIn {
    from { opacity: 0; }
    to   { opacity: 1; }
  }
  @keyframes badgePop {
    0%   { opacity: 0; transform: scale(0.85) translateY(4px); }
    60%  { transform: scale(1.05) translateY(0); }
    100% { opacity: 1; transform: scale(1); }
  }
  @keyframes ripple {
    from { transform: scale(0); opacity: 0.35; }
    to   { transform: scale(2.8); opacity: 0; }
  }
  @keyframes labelFloat {
    from { top: 50%; transform: translateY(-50%); font-size: 14px; color: #94a3b8; }
    to   { top: -10px; transform: translateY(0); font-size: 11px; color: #3b82f6; }
  }
  @keyframes lineExpand {
    from { transform: scaleX(0); }
    to   { transform: scaleX(1); }
  }
  @keyframes spin {
    to { transform: rotate(360deg); }
  }

  .fs-wrap * { box-sizing: border-box; font-family: 'Inter', sans-serif; }

  .fs-card {
    width: 100%;
    max-width: 460px;
    margin: 0 auto;
    background: #ffffff;
    border-radius: 24px;
   padding: 3.25rem 5rem 3rem;
    box-shadow: 0 4px 6px -1px rgba(0,0,0,0.07), 0 2px 4px -1px rgba(0,0,0,0.04);
    animation: slideUp 0.4s cubic-bezier(0.16,1,0.3,1) both;
  }

  /* ── HEADING ── */
  .fs-title {
    font-size: 22px; font-weight: 700; color: #0f172a;
    letter-spacing: -0.03em; margin: 0 0 4px;
    animation: slideUp 0.4s 0.05s cubic-bezier(0.16,1,0.3,1) both;
  }
  .fs-subtitle {
    font-size: 13px; color: #94a3b8; margin: 0 0 1.5rem;
    animation: slideUp 0.4s 0.1s cubic-bezier(0.16,1,0.3,1) both;
  }

  /* ── TABS ── */
  .fs-tab-bar {
    display: flex; background: #f1f5f9;
    border-radius: 14px; padding: 5px; gap: 4px;
    margin-bottom: 1.75rem;
    animation: slideUp 0.4s 0.12s cubic-bezier(0.16,1,0.3,1) both;
  }
  .fs-tab-btn {
    flex: 1; padding: 10px 0;
    font-size: 13px; font-weight: 600;
    border: none; border-radius: 10px;
    cursor: pointer; background: transparent;
    color: #94a3b8; transition: color 0.2s;
    position: relative; overflow: hidden;
  }
  .fs-tab-btn.active {
    background: #2563eb; color: #fff;
    box-shadow: 0 2px 12px rgba(37,99,235,0.28);
    transition: background 0.25s, box-shadow 0.25s;
  }
  .fs-tab-btn:not(.active):hover { color: #475569; }

  /* ── FORM BODY ── */
  .fs-body { animation: slideUp 0.35s 0.15s cubic-bezier(0.16,1,0.3,1) both; }

  /* ── MATERIAL FLOAT FIELD ── */
  .fs-field {
    position: relative;
    margin-bottom: 1.35rem;
  }
  .fs-field-label {
    position: absolute;
    left: 14px; top: 50%;
    transform: translateY(-50%);
    font-size: 13px; font-weight: 500;
    color: #94a3b8; pointer-events: none;
    transition: top 0.2s cubic-bezier(0.4,0,0.2,1),
                transform 0.2s cubic-bezier(0.4,0,0.2,1),
                font-size 0.2s cubic-bezier(0.4,0,0.2,1),
                color 0.2s cubic-bezier(0.4,0,0.2,1);
    background: #fff; padding: 0 3px;
  }
  .fs-input {
    width: 100%; padding: 14px 14px 10px;
    border: 1.5px solid #e2e8f0;
    border-radius: 12px; background: #f8fafc;
    font-size: 14px; color: #0f172a;
    outline: none; transition: border-color 0.2s, background 0.2s, box-shadow 0.2s;
    font-family: 'Inter', sans-serif;
  }
  .fs-input:focus {
    border-color: #2563eb;
    background: #fff;
    box-shadow: 0 0 0 4px rgba(37,99,235,0.09);
  }
  .fs-input:focus + .fs-field-label,
  .fs-input:not(:placeholder-shown) + .fs-field-label {
    top: 0; transform: translateY(-50%);
    font-size: 11px; color: #2563eb;
    font-weight: 600; letter-spacing: 0.03em;
  }
  .fs-input:not(:focus):not(:placeholder-shown) + .fs-field-label {
    color: #64748b;
  }

  /* Password eye */
  .fs-pass-wrap { position: relative; }
  .fs-eye-btn {
    position: absolute; right: 12px; top: 50%;
    transform: translateY(-50%);
    background: none; border: none; cursor: pointer;
    color: #94a3b8; display: flex; align-items: center;
    padding: 4px; border-radius: 6px;
    transition: color 0.15s, background 0.15s;
  }
  .fs-eye-btn:hover { color: #2563eb; background: #eff6ff; }

  /* ── ROLE TOGGLE ── */
  .fs-role-label {
    font-size: 11px; font-weight: 600; letter-spacing: 0.08em;
    text-transform: uppercase; color: #94a3b8;
    display: block; margin-bottom: 8px;
  }
  .fs-role-toggle {
    display: flex; background: #f1f5f9;
    border-radius: 12px; padding: 4px; gap: 3px;
    margin-bottom: 10px;
    border: 1px solid #e2e8f0;
  }
  .fs-role-btn {
    flex: 1; padding: 8px 4px;
    font-size: 12px; font-weight: 600;
    border: none; border-radius: 9px;
    cursor: pointer; background: transparent;
    color: #94a3b8; transition: all 0.2s;
    font-family: 'Inter', sans-serif;
    position: relative; overflow: hidden;
  }
  .fs-role-btn:not([class*="active"]):hover { color: #475569; background: #e8edf5; }
  .fs-role-btn.active-user       { background: #2563eb; color: #fff; box-shadow: 0 2px 8px rgba(37,99,235,0.25); }
  .fs-role-btn.active-admin      { background: #7c3aed; color: #fff; box-shadow: 0 2px 8px rgba(124,58,237,0.25); }
  .fs-role-btn.active-superadmin { background: #0f766e; color: #fff; box-shadow: 0 2px 8px rgba(15,118,110,0.25); }

  /* ── ROLE BADGE ── */
  .fs-role-badge {
    display: inline-flex; align-items: center; gap: 6px;
    font-size: 12px; font-weight: 500;
    padding: 5px 12px; border-radius: 99px;
    margin-bottom: 1.25rem;
    animation: badgePop 0.3s cubic-bezier(0.34,1.56,0.64,1) both;
  }
  .fs-badge-user       { background: #eff6ff; color: #1d4ed8; border: 1px solid #bfdbfe; }
  .fs-badge-admin      { background: #f5f3ff; color: #6d28d9; border: 1px solid #ddd6fe; }
  .fs-badge-superadmin { background: #f0fdfa; color: #0f766e; border: 1px solid #99f6e4; }
  .fs-role-dot { width: 7px; height: 7px; border-radius: 50%; flex-shrink: 0; }
  .fs-dot-user       { background: #2563eb; }
  .fs-dot-admin      { background: #7c3aed; }
  .fs-dot-superadmin { background: #0f766e; }

  /* ── SUBMIT BUTTON ── */
  .fs-submit-btn {
    width: 100%; padding: 13px 0;
    border-radius: 12px; border: none;
    background: #2563eb; color: #fff;
    font-size: 14px; font-weight: 600;
    cursor: pointer; margin-top: 4px;
    position: relative; overflow: hidden;
    font-family: 'Inter', sans-serif;
    letter-spacing: 0.01em;
    transition: background 0.2s, transform 0.1s, box-shadow 0.2s;
    box-shadow: 0 4px 14px rgba(37,99,235,0.3);
  }
  .fs-submit-btn:hover  { background: #1d4ed8; box-shadow: 0 6px 20px rgba(37,99,235,0.38); }
  .fs-submit-btn:active { transform: scale(0.98); }
  .fs-submit-btn:disabled { opacity: 0.65; cursor: not-allowed; transform: none; }

  .fs-ripple {
    position: absolute; border-radius: 50%;
    width: 80px; height: 80px;
    background: rgba(255,255,255,0.3);
    margin-top: -40px; margin-left: -40px;
    animation: ripple 0.6s ease-out forwards;
    pointer-events: none;
  }

  /* ── SPINNER ── */
  .fs-spinner {
    display: inline-block; width: 14px; height: 14px;
    border: 2px solid rgba(255,255,255,0.35);
    border-top-color: #fff; border-radius: 50%;
    animation: spin 0.7s linear infinite;
    vertical-align: middle; margin-right: 6px;
  }

  /* ── DIVIDER ── */
  .fs-divider {
    display: flex; align-items: center; gap: 10px;
    margin: 1.25rem 0 0.75rem;
  }
  .fs-divider-line { flex: 1; height: 1px; background: #e2e8f0; }
  .fs-divider-text {
    font-size: 11px; color: #94a3b8;
    text-transform: uppercase; letter-spacing: 0.08em;
  }

  /* ── SWITCH HINT ── */
  .fs-switch-hint { text-align: center; font-size: 13px; color: #64748b; margin: 0; }
  .fs-switch-link {
    color: #2563eb; font-weight: 600;
    cursor: pointer; background: none; border: none;
    font-size: 13px; font-family: 'Inter', sans-serif;
    padding: 0;
  }
  .fs-switch-link:hover { text-decoration: underline; }
`;

const EyeOff = () => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/>
    <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/>
    <line x1="1" y1="1" x2="23" y2="23"/>
  </svg>
);

const EyeOpen = () => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
    <circle cx="12" cy="12" r="3"/>
  </svg>
);

function RippleButton({ children, onClick, disabled, loading }) {
  const [ripples, setRipples] = useState([]);
  const handleClick = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const id = Date.now();
    setRipples((r) => [...r, { id, x: e.clientX - rect.left, y: e.clientY - rect.top }]);
    setTimeout(() => setRipples((r) => r.filter((rp) => rp.id !== id)), 650);
    onClick?.();
  };
  return (
    <button className="fs-submit-btn" onClick={handleClick} disabled={disabled}>
      {loading && <span className="fs-spinner" />}
      {children}
      {ripples.map((rp) => (
        <span key={rp.id} className="fs-ripple" style={{ top: rp.y, left: rp.x }} />
      ))}
    </button>
  );
}

export default function Signin_signup_form({ showRole = false }) {
  const roleConfig = {
    user:       { label: "User Account",       badge: "fs-badge-user",       dot: "fs-dot-user"       },
    admin:      { label: "Admin Account",      badge: "fs-badge-admin",      dot: "fs-dot-admin"      },
    superadmin: { label: "Super Admin Account", badge: "fs-badge-superadmin", dot: "fs-dot-superadmin" },
  };

  const navigate = useNavigate();

  const { showToast } = useToast();
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.auth);

  const [tab, setTab]         = useState("signin");
  const [role, setRole]       = useState("user");
  const [showPass, setShowPass] = useState(false);
  const cfg = roleConfig[role];

  // 🔥 FORM STATE
  const [email, setEmail]       = useState("");
  const [password, setPassword] = useState("");
  const [name, setName]         = useState("");

  const switchTab = (t) => { if (t === tab) return; setTab(t); };

  // 🔥 HANDLERS
 const handleLogin = async () => {
  const res = await dispatch(loginUser({ email, password }));

  if (loginUser.fulfilled.match(res)) {
    showToast("Login successful ✅", "success");

    const user = res.payload?.user || res.payload;

    if (user.role === "superadmin") navigate("/super-admin");
    else if (user.role === "admin") navigate("/admin");
    else navigate("/dashboard");
  } else {
    showToast(res.payload, "error");
  }
};

 const handleRegister = async () => {
  const res = await dispatch(
    registerUser({ name, email, password, role })
  );

  if (registerUser.fulfilled.match(res)) {
    showToast("Signup successful 🎉", "success");

    const user = res.payload.user; // 🔥 IMPORTANT

    if (user.role === "superadmin") navigate("/super-admin");
    else if (user.role === "admin") navigate("/admin");
    else navigate("/dashboard");
  } else {
    showToast(res.payload, "error");
  }
};

  return (
    <div className="fs-wrap">
      <style>{styles}</style>

      <div className="fs-card">

        {/* HEADING */}
        <h2 className="fs-title">
          {tab === "signin" ? "Welcome back" : "Create an account"}
        </h2>
        <p className="fs-subtitle">
          {tab === "signin"
            ? "Sign in to your account to continue"
            : "Fill in the details below to get started"}
        </p>

        {/* TAB BAR */}
        <div className="fs-tab-bar">
          <button
            className={`fs-tab-btn${tab === "signin" ? " active" : ""}`}
            onClick={() => switchTab("signin")}
          >
            Sign in
          </button>
          <button
            className={`fs-tab-btn${tab === "signup" ? " active" : ""}`}
            onClick={() => switchTab("signup")}
          >
            Sign up
          </button>
        </div>

        {/* ====== SIGN IN ====== */}
        {tab === "signin" && (
          <div className="fs-body">

            {/* EMAIL */}
            <div className="fs-field">
              <input
                className="fs-input"
                type="email"
                placeholder=" "
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <label className="fs-field-label">Email</label>
            </div>

            {/* PASSWORD */}
            <div className="fs-field">
              <div className="fs-pass-wrap">
                <input
                  className="fs-input"
                  type={showPass ? "text" : "password"}
                  placeholder=" "
                  style={{ paddingRight: "44px" }}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <label className="fs-field-label">Password</label>
                <button
                  type="button"
                  className="fs-eye-btn"
                  onClick={() => setShowPass((s) => !s)}
                >
                  {showPass ? <EyeOpen /> : <EyeOff />}
                </button>
              </div>
            </div>

            <RippleButton onClick={handleLogin} disabled={loading} loading={loading}>
              {loading ? "Signing in…" : "Sign in →"}
            </RippleButton>

            <div className="fs-divider">
              <div className="fs-divider-line" />
              <span className="fs-divider-text">or</span>
              <div className="fs-divider-line" />
            </div>

            <p className="fs-switch-hint">
              No account?{" "}
              <button className="fs-switch-link" onClick={() => switchTab("signup")}>
                Sign up
              </button>
            </p>
          </div>
        )}

        {/* ====== SIGN UP ====== */}
        {tab === "signup" && (
          <div className="fs-body">

            {showRole && (
              <>
                <span className="fs-role-label">Account type</span>
                <div className="fs-role-toggle">
                  {["user", "admin", "superadmin"].map((r) => (
                    <button
                      key={r}
                      type="button"
                      className={`fs-role-btn${role === r ? ` active-${r}` : ""}`}
                      onClick={() => setRole(r)}
                    >
                      {r === "superadmin" ? "Super admin" : r.charAt(0).toUpperCase() + r.slice(1)}
                    </button>
                  ))}
                </div>
                <div key={role} className={`fs-role-badge ${cfg.badge}`}>
                  <span className={`fs-role-dot ${cfg.dot}`} />
                  {cfg.label}
                </div>
              </>
            )}

            {/* FULL NAME */}
            <div className="fs-field">
              <input
                className="fs-input"
                type="text"
                placeholder=" "
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <label className="fs-field-label">Full name</label>
            </div>

            {/* EMAIL */}
            <div className="fs-field">
              <input
                className="fs-input"
                type="email"
                placeholder=" "
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <label className="fs-field-label">Email</label>
            </div>

            {/* PASSWORD */}
            <div className="fs-field">
              <div className="fs-pass-wrap">
                <input
                  className="fs-input"
                  type={showPass ? "text" : "password"}
                  placeholder=" "
                  style={{ paddingRight: "44px" }}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <label className="fs-field-label">Password</label>
                <button
                  type="button"
                  className="fs-eye-btn"
                  onClick={() => setShowPass((s) => !s)}
                >
                  {showPass ? <EyeOpen /> : <EyeOff />}
                </button>
              </div>
            </div>

            {/* hidden select for logic */}
            {showRole && (
              <select value={role} onChange={(e) => setRole(e.target.value)} style={{ display: "none" }}>
                <option value="user">User</option>
                <option value="admin">Admin</option>
                <option value="superadmin">Super Admin</option>
              </select>
            )}

            <RippleButton onClick={handleRegister} disabled={loading} loading={loading}>
              {loading ? "Creating account…" : "Create account →"}
            </RippleButton>

            <div className="fs-divider">
              <div className="fs-divider-line" />
              <span className="fs-divider-text">or</span>
              <div className="fs-divider-line" />
            </div>

            <p className="fs-switch-hint">
              Already have an account?{" "}
              <button className="fs-switch-link" onClick={() => switchTab("signin")}>
                Sign in
              </button>
            </p>
          </div>
        )}
      </div>
    </div>
  );
}