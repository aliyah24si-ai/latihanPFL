/**
 * Component 6: Modal
 * Reusable modal/dialog overlay
 */
import { useEffect } from "react";
import { FaTimes } from "react-icons/fa";

export default function Modal({ isOpen, onClose, title, children, size = "md" }) {
  // Close on Escape key
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "Escape") onClose?.();
    };
    if (isOpen) document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const sizes = {
    sm: "max-w-sm",
    md: "max-w-md",
    lg: "max-w-lg",
    xl: "max-w-xl",
  };

  return (
    <div
      className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4"
      onClick={(e) => e.target === e.currentTarget && onClose?.()}
    >
      <div
        className={`bg-white rounded-2xl shadow-xl w-full ${sizes[size]} relative animate-in fade-in zoom-in-95 duration-200`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 pt-6 pb-4 border-b border-garis">
          <h3 className="text-lg font-semibold text-teks">{title}</h3>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-teks-samping hover:bg-gray-100 hover:text-teks transition-colors"
          >
            <FaTimes className="text-sm" />
          </button>
        </div>

        {/* Body */}
        <div className="px-6 py-5">{children}</div>
      </div>
    </div>
  );
}
