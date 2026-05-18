/**
 * Component 3: InputField
 * Supports: text, email, password, number, date, textarea
 */
export default function InputField({
  label,
  name,
  type = "text",
  value,
  onChange,
  placeholder,
  required = false,
  disabled = false,
  error,
  hint,
  icon,
  rows = 3,
  className = "",
}) {
  const inputClass = `w-full bg-latar border rounded-lg px-4 py-2.5 text-sm text-teks placeholder-teks-samping outline-none transition-all duration-200
    ${error ? "border-merah focus:border-merah" : "border-garis focus:border-navy"}
    ${disabled ? "opacity-50 cursor-not-allowed" : ""}
    ${icon ? "pl-10" : ""}`;

  return (
    <div className={`flex flex-col gap-1 ${className}`}>
      {label && (
        <label className="text-xs font-medium text-teks-samping">
          {label}
          {required && <span className="text-merah ml-0.5">*</span>}
        </label>
      )}
      <div className="relative">
        {icon && (
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-teks-samping text-sm">
            {icon}
          </span>
        )}
        {type === "textarea" ? (
          <textarea
            name={name}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            required={required}
            disabled={disabled}
            rows={rows}
            className={`${inputClass} resize-none`}
          />
        ) : (
          <input
            type={type}
            name={name}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            required={required}
            disabled={disabled}
            className={inputClass}
          />
        )}
      </div>
      {error && <p className="text-xs text-merah">{error}</p>}
      {hint && !error && <p className="text-xs text-teks-samping">{hint}</p>}
    </div>
  );
}
