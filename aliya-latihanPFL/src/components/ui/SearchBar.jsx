/**
 * Component 13: SearchBar
 * Search input with icon + autoFocus via useRef
 */
import { useRef, useEffect } from "react";
import { FaSearch, FaTimes } from "react-icons/fa";

export default function SearchBar({
  value,
  onChange,
  placeholder = "Cari...",
  onClear,
  autoFocus = false,
  className = "",
}) {
  const inputRef = useRef(null);

  useEffect(() => {
    if (autoFocus && inputRef.current) {
      inputRef.current.focus();
    }
  }, [autoFocus]);

  return (
    <div className={`relative ${className}`}>
      <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-teks-samping text-xs" />
      <input
        ref={inputRef}
        type="text"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full bg-latar border border-garis rounded-lg pl-9 pr-9 py-2.5 text-sm text-teks placeholder-teks-samping outline-none focus:border-navy transition-colors"
      />
      {value && onClear && (
        <button
          onClick={onClear}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-teks-samping hover:text-teks transition-colors"
        >
          <FaTimes className="text-xs" />
        </button>
      )}
    </div>
  );
}
