
import { useState } from "react";
import loginImg from "../assets/auth.img.png";
import logo from "../assets/logo.png";
import Signin_signup_form from "../components/auth_compo/sigin_siginup_form";
/* ── Coloured headline words ─────────────────────────────────────── */
const LINE1 = [
  { text: "Don't", accent: false },
  { text: "search", accent: true },
  { text: "again.", accent: false },
  { text: "Just", accent: false },
  { text: "save.", accent: true },
];
const LINE2 = [
  { text: "Create", accent: true },
  { text: "it.", accent: false },
  { text: "Save", accent: true },
  { text: "it.", accent: false },
  { text: "Never", accent: false },
  { text: "search", accent: true },
  { text: "again.", accent: false },
];

function ColoredHeadline({ words }) {
  return (
    <h1
      style={{
        display: "flex",
        flexWrap: "wrap",
        gap: "0.3em",
        margin: 0,
        lineHeight: 1.2,
        fontSize: "clamp(1.1rem, 2.5vw, 1.85rem)",
        fontWeight: 800,
        letterSpacing: "-0.02em",
      }}
    >
      {words.map((w, i) => (
        <span key={i} style={{ color: w.accent ? "#0066FF" : "#0f172a" }}>
          {w.text}
        </span>
      ))}
    </h1>
  );
}

/* ── Glass Input ─────────────────────────────────────────────────── */
function GlassInput({ label, type = "text", placeholder }) {
  const [focused, setFocused] = useState(false);
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "0.35rem" }}>
      <label
        style={{
          fontSize: "0.72rem",
          fontWeight: 700,
          letterSpacing: "0.07em",
          textTransform: "uppercase",
          color: "#475569",
        }}
      >
        {label}
      </label>
      <input
        type={type}
        placeholder={placeholder}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        style={{
          padding: "0.65rem 1rem",
          borderRadius: "0.7rem",
          border: `1.5px solid ${focused ? "#0066FF" : "rgba(0,102,255,0.18)"}`,
          background: "rgba(255,255,255,0.6)",
          backdropFilter: "blur(8px)",
          outline: "none",
          fontSize: "0.875rem",
          color: "#0f172a",
          transition: "border 0.2s, box-shadow 0.2s",
          boxShadow: focused ? "0 0 0 3px rgba(0,102,255,0.1)" : "none",
          width: "100%",
          boxSizing: "border-box",
        }}
      />
    </div>
  );
}

/* ── Page ────────────────────────────────────────────────────────── */
export default function Signin_Signup_page() {
  const [tab, setTab] = useState("signin");

  return (
    <>
      <style>{`
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        /* ── PAGE WRAP ── */
        .ts-wrap {
          width: 100%;
          min-height: 100vh;
          display: flex;
         
        }

        /* ── LEFT PANEL ── */
        .ts-left {
          width: 60%;
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          overflow: hidden;
        }

        /* HERO */
        .ts-hero {
          padding: clamp(1.2rem, 3vw, 2.2rem) clamp(1.5rem, 3vw, 2.5rem);
          
          backdrop-filter: blur(14px);
          border-bottom: 1px solid rgba(0,102,255,0.1);
          display: flex;
          flex-direction: column;
          gap: 0.55rem;
          animation: fadeUp 0.55s ease both;
          z-index: 2;
        }
        .ts-provider {
          display: flex;
          align-items: center;
          gap: 0.45rem;
          margin-top: 0.2rem;
        }
        .ts-dot {
          width: 6px; height: 6px;
          border-radius: 50%;
          background: #0066FF;
          opacity: 0.5;
        }
        .ts-plabel {
          font-size: 0.7rem;
          font-weight: 600;
          letter-spacing: 0.07em;
          text-transform: uppercase;
          color: #94a3b8;
        }
        .ts-pname {
          font-size: 0.82rem;
          font-weight: 800;
          color: #0066FF;
        }

        /* IMAGE */
        .ts-imgwrap {
          flex: 1;
          position: relative;
          overflow: hidden;
          min-height: 260px;
        }
        .ts-imgwrap img {
          width: 100%; height: 100%;
          object-fit: cover;
          display: block;
        }
        .ts-overlay {
          display: none;
          position: absolute; inset: 0;
          background: linear-gradient(
            135deg,
            rgba(0,102,255,0.38) 0%,
            rgba(0,25,90,0.6) 100%
          );
        }
        .ts-imgtext {
          position: absolute; inset: 0;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 0.6rem;
          z-index: 5;
          animation: fadeUp 0.7s 0.15s ease both;
          opacity: 0;
        }
        .ts-big {
          font-size: clamp(2rem, 5vw, 3.8rem);
          font-weight: 900;
          color: #1868FA;
          letter-spacing: -0.03em;
          text-shadow: 0 4px 30px rgba(0,0,0,0.2);
        }
        .ts-sub {
          font-size: clamp(0.72rem, 1.4vw, 0.9rem);
          font-weight: 500;
          color: #0F1729;
          letter-spacing: 0.12em;
          text-transform: uppercase;
        }

        /* floating badge */
        .ts-badge {
          position: absolute;
          bottom: clamp(1rem, 2.5vw, 1.8rem);
          left: clamp(1rem, 2.5vw, 1.8rem);
          background: #90B0EC;
          backdrop-filter: blur(16px);
          border: 1px solid rgba(255,255,255,0.28);
          border-radius: 0.85rem;
          padding: 0.6rem 1rem;
          display: flex;
          align-items: center;
          gap: 0.55rem;
          z-index: 6;
          animation: fadeUp 0.7s 0.3s ease both;
          opacity: 0;
        }
        .ts-badge-dot {
          width: 8px; height: 8px;
          border-radius: 50%;
          background: #4fffb0;
          box-shadow: 0 0 8px #4fffb0;
          flex-shrink: 0;
        }
        .ts-badge-txt {
          font-size: 0.78rem;
          font-weight: 600;
          color: #fff;
        }

        /* ── RIGHT PANEL ── */
        .ts-right {
          width: 40%;
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: clamp(1.5rem, 3vw, 2.5rem) clamp(1rem, 2.5vw, 2rem);
          backdrop-filter: blur(22px);
          border-left: 1px solid rgba(0,102,255,0.1);
          position: relative;
          overflow: hidden;
          flex-direction: column;
        }
        .ts-right::before {
          content: '';
          position: absolute;
          top: -140px; right: -140px;
          width: 340px; height: 340px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(0,102,255,0.1) 0%, transparent 70%);
          pointer-events: none;
        }
        .ts-right::after {
          content: '';
          position: absolute;
          bottom: -100px; left: -100px;
          width: 260px; height: 260px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(0,102,255,0.07) 0%, transparent 70%);
          pointer-events: none;
        }

        
       

        /* FOOTER */
        .ts-ffoot {
          text-align: center;
          font-size: 0.76rem;
          color: #64748b;
          margin-top: 1rem;
        }
        .ts-ffoot b {
          color: #0066FF;
          font-weight: 700;
          cursor: pointer;
        }
        .ts-ffoot b:hover { text-decoration: underline; }
               /* ── BRAND HEADER (RIGHT PANEL) ── */
.ts-brand-header {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 2rem;
  width: 100%;
  max-width: 400px;
  animation: fadeUp 0.5s 0.05s ease both;
  opacity: 0;
}

.ts-logo-wrapper {
  background: rgba(0, 102, 255, 0.12);
  border-radius: 1rem;
  padding: 0.5rem;
  backdrop-filter: blur(8px);
  border: 1px solid rgba(0, 102, 255, 0.2);
  display: flex;

}

.ts-logo {
  display: block;
  filter: drop-shadow(0 2px 8px rgba(0, 102, 255, 0.3));
}

.ts-brand-info {
  flex: 1;
}

.ts-brand-name {
  font-size: 1.35rem;
  font-weight: 800;
  letter-spacing: -0.02em;
  background: linear-gradient(135deg, #0066FF 0%, #3b82f6 100%);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  margin: 0;
  line-height: 1.3;
}

.ts-brand-tagline {
  font-size: 0.7rem;
  color: #64748b;
  font-weight: 500;
  margin: 0;
  letter-spacing: 0.02em;
}

/* Dark mode adjustments */
.dark .ts-brand-name {
  background: linear-gradient(135deg, #e0e0e0 0%, #ffffff 100%);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}

.dark .ts-brand-tagline {
  color: #9ca3af;
}

.dark .ts-logo-wrapper {
  background: rgba(255, 255, 255, 0.08);
  border-color: rgba(255, 255, 255, 0.15);
}
  /* ── BRAND HEADER (RIGHT PANEL) ── */
.ts-brand-header {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 2rem;
  width: 100%;
  max-width: 400px;
  animation: fadeUp 0.5s 0.05s ease both;
  opacity: 0;
}

.ts-logo-wrapper {
  background: rgba(0, 102, 255, 0.12);
  border-radius: 1rem;
  padding: 0.5rem;
  backdrop-filter: blur(8px);
  border: 1px solid rgba(0, 102, 255, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100px;
  height: 100px;
  flex-shrink: 0;
}

.ts-logo-img {
  width: 100px;
  height: 100px;
  object-fit: cover;
  display: block;
}

.ts-brand-info {
  flex: 1;
}

.ts-brand-name {
  font-size: 2.35rem;
  font-weight: 800;
  letter-spacing: -0.02em;
  background: linear-gradient(135deg, #0066FF 0%, #3b82f6 100%);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  margin: 0;
  line-height: 1.3;
}

.ts-brand-tagline {
  font-size: larger;
  color: #64748b;
  font-weight: 500;
  margin: 0;
  letter-spacing: 0.02em;
}

/* Dark mode adjustments */
.dark .ts-brand-name {
  background: linear-gradient(135deg, #e0e0e0 0%, #ffffff 100%);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}

.dark .ts-brand-tagline {
  color: #9ca3af;
}

.dark .ts-logo-wrapper {
  background: rgba(255, 255, 255, 0.08);
  border-color: rgba(255, 255, 255, 0.15);
}
        /* ── RESPONSIVE ── */
        @media (max-width: 768px) {
          .ts-wrap { flex-direction: column; }
          .ts-left  { width: 100%; min-height: unset; }
          .ts-right {
            width: 100%;
            min-height: unset;
            border-left: none;
            border-top: 1px solid rgba(0,102,255,0.1);
            padding: 2rem 1.25rem 3rem;
          }
          .ts-imgwrap { min-height: 240px; }
        .ts-overlay {
          display:block;}
          .ts-big{color:white;}
          .ts-sub{color:white;}
          .ts-brand-name { font-size: 2rem; }
        }
          
        @media (max-width: 420px) {
          .ts-big { font-size: 1.8rem; }
        }
      `}</style>

      <div className="ts-wrap">
        {/* ── LEFT ── */}
        <div className="ts-left">
          {/* Hero text strip */}
          <div className="ts-hero">
            <ColoredHeadline words={LINE1} />
            <ColoredHeadline words={LINE2} />
            <div className="ts-provider">
              <div className="ts-dot" />
              <span className="ts-plabel">Provided by</span>
              <span className="ts-pname">toolssaver.com</span>
            </div>
          </div>

          {/* Image */}
          <div className="ts-imgwrap">
            <img src={loginImg} alt="toolssaver" />
            <div className="ts-overlay" />
            <div className="ts-imgtext">
              <span className="ts-big">Just Save</span>
              <span className="ts-sub">Stop searching · Start saving</span>
            </div>
            <div className="ts-badge">
              <div className="ts-badge-dot" />
              <span className="ts-badge-txt">siginup for free</span>
            </div>
          </div>
        </div>
        
        {/* ── RIGHT ── */}
        <div className="ts-right">
          {/* Header with Logo & Name */}
          <div className="ts-brand-header">
            <div className="ts-logo-wrapper">
              <img src={logo} alt="logo" className="ts-logo-img" />
            </div>
            <div className="ts-brand-info">
              <h2 className="ts-brand-name">ToolsSaver</h2>
              <p className="ts-brand-tagline">Save smarter, not harder</p>
            </div>
          </div>

         
          <Signin_signup_form />
        </div>
      </div>
    </>
  );
}
