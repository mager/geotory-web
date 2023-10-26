import { AlertCircle } from "lucide-react";
import Text from "@/components/shared/text";

export default function Error({ message }: { message: string }) {
  return (
    <div className="error-box my-4 flex text-red-400">
      <div className="error-icon mr-2">
        <AlertCircle size={24} />
      </div>
      <Text className="error-message">{message}</Text>
    </div>
  );
}
