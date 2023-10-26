type Props = {
  id: string;
  placeholder: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export default function Input({ id, placeholder, onChange }: Props) {
  return (
    <input
      id={id}
      name={id}
      placeholder={placeholder}
      onChange={onChange}
      className="rounded-md border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-200"
    />
  );
}
