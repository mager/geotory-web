import { AlertCircle } from "lucide-react";

type Props = {
  message: string;
};

export default function Error({ message }: Props) {
  return (
    <div className="error-box my-4 flex text-red-400">
      <div className="error-icon mr-2">
        <AlertCircle size={24} />
      </div>
      <p className="error-message">{message}</p>
    </div>
  );
}
