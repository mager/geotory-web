export default function Input({
  id,
  label,
  onChange,
  placeholder = "",
  value,
}: {
  id: string;
  label?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  value?: string;
}) {
  return (
    <>
      {label && <label htmlFor={id}>{label}</label>}
      <input
        id={id}
        name={id}
        placeholder={placeholder}
        onChange={onChange}
        value={value}
        className="mb-4 rounded-md border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-200"
      />
    </>
  );
}
