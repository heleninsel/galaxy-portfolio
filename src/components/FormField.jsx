// Tek bir form alanı: label + input/textarea + hata mesajı.
// Tekrarı önlemek için yeniden kullanılabilir bir bileşen.
export default function FormField({
  label, name, type = "text", value, onChange, error, textarea = false,
}) {
  return (
    <div className="field">
      <label htmlFor={name}>{label}</label>
      {textarea ? (
        <textarea
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          rows={4}
          aria-invalid={!!error}
        />
      ) : (
        <input
          id={name}
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          aria-invalid={!!error}
        />
      )}
      {/* hata varsa erişilebilir şekilde göster */}
      {error && <span className="field-error" role="alert">{error}</span>}
    </div>
  );
}