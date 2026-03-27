import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser, registerUser } from "../../features/auth/authSlice.js";
// const dispatch = useDispatch();
// const { loading, error } = useSelector((state) => state.auth);
// const handleLogin = () => {
//   dispatch(loginUser({ email, password }));
// };
// const handleRegister = () => {
//   dispatch(registerUser({ name, email, password, role }));
// };
const styles = `
@keyframes slideIn {
  from { opacity: 0; transform: translateY(16px); }
  to { opacity: 1; transform: translateY(0); }
}
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}
@keyframes ripple {
  from { transform: scale(0); opacity: 0.4; }
  to { transform: scale(2.5); opacity: 0; }
}
.form-anim { animation: slideIn 0.35s cubic-bezier(.4,0,.2,1) both; }

.fs-card {
  width: 100%;
  max-width: 420px;
  background: white;
  border: 0.5px solid #e2e8f0;
  border-radius: 16px;
  padding: 2rem 1.75rem 1.75rem;
  box-sizing: border-box;
  margin: 0 auto;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
}

.fs-tab-bar {
  display: flex;
  background: #f1f5f9;
  border-radius: 10px;
  padding: 4px;
  gap: 4px;
  margin-bottom: 1.75rem;
  border: 0.5px solid #e2e8f0;
}
.fs-tab-btn {
  flex: 1;
  padding: 9px 0;
  font-size: 13px;
  font-weight: 500;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  background: transparent;
  color: #64748b;
  transition: background 0.22s, color 0.22s, box-shadow 0.22s;
}
.fs-tab-btn.active {
  background: #2563eb;
  color: #fff;
  box-shadow: 0 2px 8px rgba(37,99,235,0.18);
}
.fs-tab-btn:not(.active):hover { color: #2563eb; background: #e8edf5; }

.fs-field { display: flex; flex-direction: column; gap: 5px; margin-bottom: 1rem; }
.fs-field label {
  font-size: 11px;
  font-weight: 500;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: #64748b;
}
.fs-input {
  padding: 10px 14px;
  border-radius: 8px;
  border: 0.5px solid #cbd5e1;
  background: #f8fafc;
  color: #0f172a;
  font-size: 14px;
  outline: none;
  transition: border 0.18s, box-shadow 0.18s, background 0.18s;
  box-sizing: border-box;
  width: 100%;
  font-family: inherit;
}
.fs-input:focus {
  border-color: #2563eb;
  box-shadow: 0 0 0 3px rgba(37,99,235,0.12);
  background: #fff;
}
.fs-input::placeholder { color: #94a3b8; }

.fs-pass-wrap { position: relative; display: flex; align-items: center; }
.fs-pass-wrap .fs-input { padding-right: 42px; }
.fs-eye-btn {
  position: absolute;
  right: 10px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #94a3b8;
  transition: color 0.18s;
  border-radius: 4px;
  line-height: 0;
}
.fs-eye-btn:hover { color: #2563eb; }

.fs-submit-btn {
  width: 100%;
  padding: 11px 0;
  border-radius: 8px;
  color: #fff;
  font-size: 14px;
  font-weight: 500;
  border: none;
  cursor: pointer;
  margin-top: 0.25rem;
  position: relative;
  overflow: hidden;
  transition: background 0.18s, transform 0.1s;
  letter-spacing: 0.01em;
  font-family: inherit;
}
.fs-submit-btn:active { transform: scale(0.98); }
.fs-ripple {
  position: absolute;
  border-radius: 50%;
  width: 80px; height: 80px;
  background: rgba(255,255,255,0.35);
  margin-top: -40px; margin-left: -40px;
  animation: ripple 0.55s ease-out forwards;
  pointer-events: none;
}

.fs-divider { display: flex; align-items: center; gap: 10px; margin: 1.1rem 0 0.8rem; }
.fs-divider .line { flex: 1; height: 0.5px; background: #e2e8f0; }
.fs-divider span { font-size: 11px; color: #94a3b8; text-transform: uppercase; letter-spacing: 0.06em; }

.fs-switch-hint { text-align: center; font-size: 12px; color: #64748b; }
.fs-switch-hint b { color: #2563eb; cursor: pointer; font-weight: 500; }
.fs-switch-hint b:hover { text-decoration: underline; }

.fs-role-label { font-size: 11px; font-weight: 500; letter-spacing: 0.08em; text-transform: uppercase; color: #64748b; margin-bottom: 7px; display: block; }
.fs-role-toggle { display: flex; background: #f1f5f9; border-radius: 8px; padding: 3px; gap: 3px; border: 0.5px solid #e2e8f0; margin-bottom: 1rem; }
.fs-role-btn { flex: 1; padding: 8px 4px; font-size: 12px; font-weight: 500; border: none; border-radius: 6px; cursor: pointer; background: transparent; color: #64748b; transition: background 0.2s, color 0.2s, box-shadow 0.2s; font-family: inherit; }
.fs-role-btn.active-user       { background: #2563eb; color: #fff; box-shadow: 0 1px 6px rgba(37,99,235,0.2); }
.fs-role-btn.active-admin      { background: #7c3aed; color: #fff; box-shadow: 0 1px 6px rgba(124,58,237,0.2); }
.fs-role-btn.active-superadmin { background: #0f766e; color: #fff; box-shadow: 0 1px 6px rgba(15,118,110,0.2); }
.fs-role-btn:not([class*="active"]):hover { color: #0f172a; background: #e8edf5; }

.fs-role-badge { display: inline-flex; align-items: center; gap: 5px; font-size: 11px; font-weight: 500; padding: 3px 10px; border-radius: 99px; margin-bottom: 1rem; animation: fadeIn 0.2s ease both; }
.badge-user        { background: #eff6ff; color: #1d4ed8; }
.badge-admin       { background: #f5f3ff; color: #6d28d9; }
.badge-superadmin  { background: #f0fdfa; color: #0f766e; }
.fs-role-dot { width: 6px; height: 6px; border-radius: 50%; display: inline-block; }
.dot-user        { background: #2563eb; }
.dot-admin       { background: #7c3aed; }
.dot-superadmin  { background: #0f766e; }
`;

const roleConfig = {
  user: {
    label: "User account",
    badge: "badge-user",
    dot: "dot-user",
    btnColor: "#2563eb",
    btnHover: "#1d4ed8",
  },
  admin: {
    label: "Admin account",
    badge: "badge-admin",
    dot: "dot-admin",
    btnColor: "#7c3aed",
    btnHover: "#6d28d9",
  },
  superadmin: {
    label: "Super admin account",
    badge: "badge-superadmin",
    dot: "dot-superadmin",
    btnColor: "#0f766e",
    btnHover: "#0d6560",
  },
};

const EyeOpen = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

const EyeOff = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
    <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
    <line x1="1" y1="1" x2="23" y2="23" />
  </svg>
);

function PasswordField({ label, placeholder }) {
  const [show, setShow] = useState(false);
  return (
    <div className="fs-field">
      <label>{label}</label>
      <div className="fs-pass-wrap">
        <input
          className="fs-input"
          type={show ? "text" : "password"}
          placeholder={placeholder}
        />
        <button
          type="button"
          className="fs-eye-btn"
          onClick={() => setShow((s) => !s)}
          tabIndex={-1}
          aria-label={show ? "Hide password" : "Show password"}
        >
          {show ? <EyeOpen /> : <EyeOff />}
        </button>
      </div>
    </div>
  );
}

function Field({ label, type = "text", placeholder }) {
  return (
    <div className="fs-field">
      <label>{label}</label>
      <input className="fs-input" type={type} placeholder={placeholder} />
    </div>
  );
}

function RippleButton({ children, color, hoverColor }) {
  const [ripples, setRipples] = useState([]);
  const handleClick = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const id = Date.now();
    setRipples((r) => [
      ...r,
      { id, x: e.clientX - rect.left, y: e.clientY - rect.top },
    ]);
    setTimeout(() => setRipples((r) => r.filter((rp) => rp.id !== id)), 600);
  };
  return (
    <button
      className="fs-submit-btn"
      style={{ background: color }}
      onMouseOver={(e) => (e.currentTarget.style.background = hoverColor)}
      onMouseOut={(e) => (e.currentTarget.style.background = color)}
      onClick={handleClick}
    >
      {children}
      {ripples.map((rp) => (
        <span
          key={rp.id}
          className="fs-ripple"
          style={{ top: rp.y, left: rp.x }}
        />
      ))}
    </button>
  );
}

export default function Signin_signup_form({ showRole = false }) {
  const [tab, setTab] = useState("signin");
  const [role, setRole] = useState("user");
  const [animKey, setAnimKey] = useState(0);

  const switchTab = (t) => {
    if (t === tab) return;
    setTab(t);
    setAnimKey((k) => k + 1);
  };

  const cfg = roleConfig[role];
  const titles = {
    signin: {
      title: "Welcome back",
      sub: "Sign in to your account to continue",
    },
    signup: {
      title: "Create an account",
      sub: "Fill in the details below to get started",
    },
  };

  return (
    <>
      <style>{styles}</style>
      <div className="fs-card">
        {/* Header */}
        <div style={{ marginBottom: "1.5rem" }}>
          <div
            style={{
              fontSize: 20,
              fontWeight: 500,
              color: "#0f172a",
              marginBottom: 3,
            }}
          >
            {titles[tab].title}
          </div>
          <div style={{ fontSize: 13, color: "#64748b" }}>
            {titles[tab].sub}
          </div>
        </div>

        {/* Tab bar */}
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

        {/* Sign In */}
        {tab === "signin" && (
          <div key={`signin-${animKey}`} className="form-anim">
            <Field label="Email" type="email" placeholder="you@example.com" />
            <PasswordField label="Password" placeholder="Enter your password" />
            <div style={{ textAlign: "right", marginBottom: "1rem" }}>
              <span
                style={{ fontSize: 12, color: "#2563eb", cursor: "pointer" }}
                onMouseOver={(e) =>
                  (e.target.style.textDecoration = "underline")
                }
                onMouseOut={(e) => (e.target.style.textDecoration = "none")}
              >
                <br />
              </span>
            </div>
            <RippleButton color="#2563eb" hoverColor="#1d4ed8">
              Sign in →
            </RippleButton>
            <div className="fs-divider">
              <div className="line" />
              <span>or</span>
              <div className="line" />
            </div>
            <p className="fs-switch-hint">
              No account? <b onClick={() => switchTab("signup")}>Sign up</b>
            </p>
          </div>
        )}

        {/* Sign Up */}
        {tab === "signup" && (
          <div key={`signup-${animKey}`} className="form-anim">
            
            {showRole && (
              <>
                <span className="fs-role-label">Account type</span>

                <div className="fs-role-toggle">
                  {["user", "admin", "superadmin"].map((r) => (
                    <button
                      key={r}
                      className={`fs-role-btn${role === r ? ` active-${r}` : ""}`}
                      onClick={() => setRole(r)}
                    >
                      {r === "superadmin"
                        ? "Super admin"
                        : r.charAt(0).toUpperCase() + r.slice(1)}
                    </button>
                  ))}
                </div>

                <div key={role} className={`fs-role-badge ${cfg.badge}`}>
                  <span className={`fs-role-dot ${cfg.dot}`} />
                  {cfg.label}
                </div>
              </>
            )}
            
            <Field label="Full name" placeholder="John Doe" />
            <Field label="Email" type="email" placeholder="you@example.com" />
            <PasswordField label="Password" placeholder="Create a password" />
            <RippleButton color={cfg.btnColor} hoverColor={cfg.btnHover}>
              Create account →
            </RippleButton>
            <div className="fs-divider">
              <div className="line" />
              <span>or</span>
              <div className="line" />
            </div>
            <p className="fs-switch-hint">
              Already have an account?{" "}
              <b onClick={() => switchTab("signin")}>Sign in</b>
            </p>
          </div>
        )}
      </div>
    </>
  );
}
