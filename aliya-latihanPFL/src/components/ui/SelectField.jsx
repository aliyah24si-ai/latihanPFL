/**
 * Component 4: SelectField
 */
export default function SelectField({
  label,
  name,
  value,
  onChange,
  options = [],
  required = false,
  disabled = false,
  error,
  placeholder,
  className = "",
}) {
  return (
    <div className={`flex flex-col gap-1 ${className}`}>
      {label && (
        <label className="text-xs font-medium text-teks-samping">
          {label}
          {required && <span className="text-merah ml-0.5">*</span>}
        </label>
      )}
      <select
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        disabled={disabled}
        className={`w-full bg-latar border rounded-lg px-4 py-2.5 text-sm text-teks outline-none transition-all duration-200 appearance-none cursor-pointer
          ${error ? "border-merah focus:border-merah" : "border-garis focus:border-navy"}
          ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}
      >
        {placeholder && (
          <option value="" disabled>
            {placeholder}
          </option>
        )}
        {options.map((opt) => (
          <option key={opt.value ?? opt} value={opt.value ?? opt}>
            {opt.label ?? opt}
          </option>
        ))}
      </select>
      {error && <p className="text-xs text-merah">{error}</p>}
    </div>
  );
}
