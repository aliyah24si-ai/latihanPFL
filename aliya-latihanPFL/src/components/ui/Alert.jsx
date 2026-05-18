/**
 * Component 18: Alert
 * Inline alert/notification banner
 */
import { FaCheckCircle, FaExclamationCircle, FaInfoCircle, FaExclamationTriangle, FaTimes } from "react-icons/fa";

const configs = {
  success: {
    bg: "bg-emerald-50 border-emerald-200",
    text: "text-emerald-800",
    icon: <FaCheckCircle className="text-emerald-500 shrink-0" />,
  },
  danger: {
    bg: "bg-red-50 border-red-200",
    text: "text-red-800",
    icon: <FaExclamationCircle className="text-red-500 shrink-0" />,
  },
  warning: {
    bg: "bg-amber-50 border-amber-200",
    text: "text-amber-800",
    icon: <FaExclamationTriangle className="text-amber-500 shrink-0" />,
  },
  info: {
    bg: "bg-blue-50 border-blue-200",
    text: "text-blue-800",
    icon: <FaInfoCircle className="text-blue-500 shrink-0" />,
  },
};

export default function Alert({ variant = "info", title, message, onClose, className = "" }) {
  const cfg = configs[variant] || configs.info;

  return (
    <div
      className={`flex items-start gap-3 p-4 rounded-xl border ${cfg.bg} ${className}`}
    >
      <span className="mt-0.5">{cfg.icon}</span>
      <div className="flex-1 min-w-0">
        {title && (
          <p className={`text-sm font-semibold ${cfg.text}`}>{title}</p>
        )}
        {message && (
          <p className={`text-xs mt-0.5 ${cfg.text} opacity-80`}>{message}</p>
        )}
      </div>
      {onClose && (
        <button
          onClick={onClose}
          className={`${cfg.text} opacity-60 hover:opacity-100 transition-opacity shrink-0`}
        >
          <FaTimes className="text-xs" />
        </button>
      )}
    </div>
  );
}
