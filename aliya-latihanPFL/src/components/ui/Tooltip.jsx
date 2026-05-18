/**
 * Component 16: Tooltip
 * Hover tooltip wrapper
 */
export default function Tooltip({ children, text, position = "top" }) {
  const positions = {
    top: "bottom-full left-1/2 -translate-x-1/2 mb-2",
    bottom: "top-full left-1/2 -translate-x-1/2 mt-2",
    left: "right-full top-1/2 -translate-y-1/2 mr-2",
    right: "left-full top-1/2 -translate-y-1/2 ml-2",
  };

  return (
    <div className="relative inline-flex group">
      {children}
      <div
        className={`absolute ${positions[position]} z-50 px-2.5 py-1.5 bg-teks text-white text-xs rounded-lg whitespace-nowrap
          opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity duration-200`}
      >
        {text}
      </div>
    </div>
  );
}
