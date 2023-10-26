import { AlertCircle } from "lucide-react";

export default function Error({ message }: { message: string }) {
  return (
    <div className="error-box my-4 flex text-red-400">
      <div className="error-icon mr-2">
        <AlertCircle size={24} />
      </div>
      <p className="error-message">{message}</p>
    </div>
  );
}
