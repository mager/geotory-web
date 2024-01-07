export default function Input({
  id,
  label,
  multiline = false,
  onChange,
  placeholder = "",
  value,
}: {
  id: string;
  label?: string;
  multiline?: boolean;
  onChange: (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
  ) => void;
  placeholder?: string;
  value?: string;
}) {
  const InputComponent = multiline ? "textarea" : "input";

  return (
    <div className="mb-4">
      {label && (
        <label className="font-sansSerif" htmlFor={id}>
          {label}
        </label>
      )}
      <InputComponent
        id={id}
        name={id}
        placeholder={placeholder}
        onChange={onChange}
        value={value}
        className="w-full rounded-md border border-gray-300 p-2 font-mono focus:outline-none focus:ring-2 focus:ring-blue-200"
      />
    </div>
  );
}
