import { Building2 } from "lucide-react";
import Text from "@/components/shared/text";

export default function Footer() {
  return (
    <div className="w-full border-t border-gray-200 py-5 text-center">
      <div className="flex items-center justify-center">
        <Text className="mb-0 mr-2">
          Built by <a href="https://x.com/mager">@mager</a> in Chicago
        </Text>
        <Building2 size={24} strokeWidth={1.5} />
      </div>
    </div>
  );
}
