import React, { useEffect, useState } from "react";

const Alert = ({ type = "success", message, onClose }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(() => {
        if (onClose) onClose();
      }, 400);
    }, 4200);

    return () => clearTimeout(timer);
  }, [onClose]);

  const types = {
    success: {
      border: "border-green-500",
      from: "from-green-400/50",
      to: "to-emerald-600/30",
      glow: "shadow-green-500/40",
      iconColor: "text-green-600",
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
          <path
            fillRule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
            clipRule="evenodd"
          />
        </svg>
      ),
    },
    error: {
      border: "border-red-500",
      from: "from-red-400/60",
      to: "to-rose-600/40",
      glow: "shadow-red-500/50",
      iconColor: "text-red-600",
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
          <path
            fillRule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
            clipRule="evenodd"
          />
        </svg>
      ),
    },
    warning: {
      border: "border-yellow-500",
      from: "from-yellow-400/50",
      to: "to-amber-600/30",
      glow: "shadow-yellow-500/40",
      iconColor: "text-yellow-600",
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
          <path
            fillRule="evenodd"
            d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.742-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
            clipRule="evenodd"
          />
        </svg>
      ),
    },
    info: {
      border: "border-blue-500",
      from: "from-blue-400/50",
      to: "to-cyan-600/30",
      glow: "shadow-blue-500/40",
      iconColor: "text-blue-600",
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
          <path
            fillRule="evenodd"
            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
            clipRule="evenodd"
          />
        </svg>
      ),
    },
  };

  const config = types[type] || types.success;

  return (
    <div className="fixed inset-x-0 top-4 z-50 flex justify-center pointer-events-none">
      <div
        role="alert"
        className={`
          relative overflow-hidden max-w-sm w-full mx-4
          border-l-4 ${config.border}
          rounded-2xl
          backdrop-blur-3xl
          bg-white/45 dark:bg-black/35
          ${config.from} ${config.to}
          shadow-2xl ${config.glow}
          ring-1 ring-white/30 dark:ring-white/10
          p-4 flex items-center gap-3
          transition-all duration-400 ease-out
          ${
            isVisible
              ? "translate-y-0 opacity-100 scale-100"
              : "-translate-y-20 opacity-0 scale-90"
          }
          pointer-events-auto
        `}
        style={{
          fontFamily:
            "-apple-system, BlinkMacSystemFont, 'SF Pro Display', sans-serif",
          fontWeight: "500",
          backgroundImage: `
            linear-gradient(to bottom, rgba(255,255,255,0.3), rgba(255,255,255,0.05)),
            linear-gradient(135deg, ${config.from.replace(
              /\/\d+/g,
              "/50"
            )} 0%, ${config.to.replace(/\/\d+/g, "/30")} 100%)
          `,
          boxShadow: `
            0 10px 30px rgba(0,0,0,0.15),
            0 0 30px ${config.glow
              .replace("shadow-", "")
              .replace("/40", "/30")},
            inset 0 1px 0 rgba(255,255,255,0.5)
          `,
        }}
      >
        {/* Liquid shine highlight */}
        <div
          className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/60 to-transparent"
          style={{ filter: "blur(1px)" }}
        />

        {/* Icon */}
        <div className={`${config.iconColor} flex-shrink-0 drop-shadow-md`}>
          {config.icon}
        </div>

        {/* Message */}
        <p className="flex-1 text-sm font-medium text-black dark:text-white drop-shadow-sm">
          {message}
        </p>

        {/* Close button */}
        <button
          onClick={() => {
            setIsVisible(false);
            setTimeout(() => {
              if (onClose) onClose();
            }, 400);
          }}
          className="text-black/60 dark:text-white/60 hover:text-black/90 dark:hover:text-white/90 transition"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2.5}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Alert;
