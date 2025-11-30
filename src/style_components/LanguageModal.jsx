import React from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function LanguageModal({
  isOpen,
  onClose,
  langs,
  language,
  setLanguage,
}) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* 🔹 BACKDROP */}
          <motion.div
            onClick={onClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          {/* 🔹 MODAL */}
          <motion.div
            className="fixed inset-0 flex items-center justify-center z-50 p-4"
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            // close when click away
            onClick={(e) => {
              if (e.target === e.currentTarget) {
                onClose();
              }
            }}
            exit={{ opacity: 0, y: 30, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 120, damping: 14 }}
          >
            <div
              className="w-full max-w-md bg-white/10 backdrop-blur-2xl shadow-2xl border border-white/20 
                            rounded-2xl p-6 text-white"
            >
              {/* Title */}
              <h2 className="text-xl font-semibold text-center mb-4">
                Select Your Language
              </h2>

              {/* Language List */}
              <div className="max-h-80 overflow-y-auto space-y-2 pr-1">
                {langs.map((lang) => (
                  <motion.button
                    key={lang.code}
                    onClick={() => {
                      setLanguage(lang.code);
                      onClose();
                    }}
                    whileTap={{ scale: 0.97 }}
                    className={`
                      w-full flex items-center justify-between p-3 rounded-xl
                      transition border
                      ${
                        lang.code === language
                          ? "bg-indigo-600/40 border-indigo-400 text-indigo-200"
                          : "bg-white/10 border-white/10 hover:bg-white/20"
                      }
                    `}
                  >
                    <span className="text-sm">{lang.name}</span>

                    {/* Check mark */}
                    {lang.code === language && (
                      <motion.span
                        initial={{ opacity: 0, scale: 0.4 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="text-indigo-300 text-lg"
                      >
                        ✓
                      </motion.span>
                    )}
                  </motion.button>
                ))}
              </div>

              {/* Close Button */}
              <button
                onClick={onClose}
                className="mt-4 w-full py-2 rounded-xl bg-white/20 hover:bg-white/30 
                          text-white font-medium"
              >
                Close
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
