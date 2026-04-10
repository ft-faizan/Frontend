

import { createContext, useContext, useState, useCallback } from "react";

const ToastContext = createContext();

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');

  @keyframes toastSlideIn {
    from { opacity: 0; transform: translateX(110%) scale(0.92); }
    to   { opacity: 1; transform: translateX(0)    scale(1);    }
  }
  @keyframes toastSlideOut {
    from { opacity: 1; transform: translateX(0)    scale(1);    max-height: 100px; margin-bottom: 0; }
    to   { opacity: 0; transform: translateX(110%) scale(0.92); max-height: 0;     margin-bottom: -10px; }
  }
  @keyframes toastBar {
    from { width: 100%; }
    to   { width: 0%;   }
  }
  @keyframes iconPop {
    0%   { transform: scale(0.5) rotate(-15deg); opacity: 0; }
    60%  { transform: scale(1.2) rotate(4deg);  opacity: 1; }
    100% { transform: scale(1)   rotate(0deg);  opacity: 1; }
  }
  @keyframes ripplePulse {
    0%   { transform: scale(1);   opacity: 0.4; }
    100% { transform: scale(2.2); opacity: 0;   }
  }

  .toast-wrap {
    position: fixed; top: 20px; right: 20px;
    z-index: 2000;
    display: flex; flex-direction: column;
    gap: 10px; align-items: flex-end;
    pointer-events: none;
    font-family: 'Inter', sans-serif;
  }

  .toast-item {
    pointer-events: auto;
    display: flex; align-items: flex-start; gap: 12px;
    width: 320px; padding: 14px 16px 18px;
    border-radius: 16px;
    border: 1px solid;
    position: relative; overflow: hidden;
    backdrop-filter: blur(12px);
    box-shadow: 0 8px 32px rgba(0,0,0,0.12), 0 2px 8px rgba(0,0,0,0.06);
    animation: toastSlideIn 0.4s cubic-bezier(0.34,1.56,0.64,1) both;
    cursor: pointer;
    transition: transform 0.15s ease, box-shadow 0.15s ease;
  }
  .toast-item:hover {
    transform: translateX(-3px) scale(1.01);
    box-shadow: 0 12px 40px rgba(0,0,0,0.16), 0 2px 8px rgba(0,0,0,0.08);
  }
  .toast-item.exiting {
    animation: toastSlideOut 0.35s cubic-bezier(0.4,0,0.2,1) forwards;
  }

  /* TYPE SKINS */
  .toast-success {
    background: rgba(255,255,255,0.93);
    border-color: rgba(52,211,153,0.45);
  }
  .toast-error {
    background: rgba(255,255,255,0.93);
    border-color: rgba(251,113,133,0.45);
  }
  .toast-warning {
    background: rgba(255,255,255,0.93);
    border-color: rgba(251,191,36,0.45);
  }

  /* ICON CIRCLE */
  .toast-icon-wrap {
    position: relative; flex-shrink: 0;
    width: 36px; height: 36px;
    border-radius: 12px;
    display: flex; align-items: center; justify-content: center;
    animation: iconPop 0.45s cubic-bezier(0.34,1.56,0.64,1) 0.05s both;
  }
  .toast-icon-wrap::after {
    content: '';
    position: absolute; inset: 0;
    border-radius: 12px;
    animation: ripplePulse 0.7s ease-out 0.1s both;
  }
  .toast-success .toast-icon-wrap { background: #d1fae5; color: #059669; }
  .toast-success .toast-icon-wrap::after { background: #34d399; }
  .toast-error   .toast-icon-wrap { background: #fee2e2; color: #dc2626; }
  .toast-error   .toast-icon-wrap::after { background: #fb7185; }
  .toast-warning .toast-icon-wrap { background: #fef3c7; color: #d97706; }
  .toast-warning .toast-icon-wrap::after { background: #fbbf24; }

  .toast-icon-wrap svg { width: 17px; height: 17px; stroke-width: 2.5; position: relative; z-index: 1; }

  /* TEXT */
  .toast-content { flex: 1; min-width: 0; padding-top: 1px; }
  .toast-label {
    font-size: 12px; font-weight: 700;
    letter-spacing: 0.04em; text-transform: uppercase;
    margin-bottom: 3px; line-height: 1;
  }
  .toast-message {
    font-size: 13px; font-weight: 400;
    line-height: 1.5; color: #475569;
  }
  .toast-success .toast-label { color: #059669; }
  .toast-error   .toast-label { color: #dc2626; }
  .toast-warning .toast-label { color: #d97706; }

  /* CLOSE BTN */
  .toast-close {
    flex-shrink: 0; width: 24px; height: 24px;
    border-radius: 8px; border: none;
    background: transparent; cursor: pointer;
    display: flex; align-items: center; justify-content: center;
    color: #94a3b8; margin-top: 1px;
    transition: background 0.15s, color 0.15s;
    font-family: 'Inter', sans-serif;
  }
  .toast-close:hover { background: #f1f5f9; color: #475569; }

  /* PROGRESS BAR */
  .toast-bar {
    position: absolute; bottom: 0; left: 0; height: 3px;
    border-radius: 0 2px 2px 0;
    animation: toastBar 2s linear forwards;
  }
  .toast-success .toast-bar { background: linear-gradient(90deg, #10b981, #34d399); }
  .toast-error   .toast-bar { background: linear-gradient(90deg, #ef4444, #fb7185); }
  .toast-warning .toast-bar { background: linear-gradient(90deg, #f59e0b, #fbbf24); }

  /* SHINE SWEEP */
  .toast-shine {
    position: absolute; top: 0; left: -60%;
    width: 40%; height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.5), transparent);
    animation: toastShine 0.6s ease-out 0.2s both;
    pointer-events: none;
  }
  @keyframes toastShine {
    from { left: -60%; }
    to   { left: 120%; }
  }

  @media (max-width: 480px) {
    .toast-wrap { top: 12px; right: 12px; left: 12px; align-items: stretch; }
    .toast-item { width: 100%; }
  }
`;

const config = {
  success: {
    label: "Success",
    icon: (
      <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
      </svg>
    ),
  },
  error: {
    label: "Error",
    icon: (
      <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
      </svg>
    ),
  },
  warning: {
    label: "Warning",
    icon: (
      <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v4m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
      </svg>
    ),
  },
};

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const removeToast = useCallback((id) => {
    // trigger exit animation first
    setToasts((prev) =>
      prev.map((t) => (t.id === id ? { ...t, exiting: true } : t))
    );
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 350);
  }, []);

  const showToast = useCallback((message, type = "success") => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type, exiting: false }]);
    setTimeout(() => removeToast(id), 3000);
  }, [removeToast]);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}

      <style>{styles}</style>

      <div className="toast-wrap">
        {toasts.map((toast) => {
          const c = config[toast.type] || config.success;
          return (
            <div
              key={toast.id}
              className={`toast-item toast-${toast.type}${toast.exiting ? " exiting" : ""}`}
              onClick={() => removeToast(toast.id)}
            >
              {/* shine sweep on enter */}
              <div className="toast-shine" />

              {/* icon */}
              <div className="toast-icon-wrap">
                {c.icon}
              </div>

              {/* text */}
              <div className="toast-content">
                <p className="toast-label">{c.label}</p>
                <p className="toast-message">{toast.message}</p>
              </div>

              {/* close */}
              <button
                className="toast-close"
                onClick={(e) => { e.stopPropagation(); removeToast(toast.id); }}
                aria-label="Dismiss"
              >
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>

              {/* progress bar */}
              <div className="toast-bar" />
            </div>
          );
        })}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  return useContext(ToastContext);
}