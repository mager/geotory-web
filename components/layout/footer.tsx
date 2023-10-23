import { Building2 } from "lucide-react";

export default function Footer() {
  return (
    <div className="w-full border-t border-gray-200 py-5 text-center font-sansSerif">
      <div className="flex items-center justify-center">
        <div className="mr-2">
          Built by <a href="https://x.com/mager">@mager</a> in Chicago
        </div>
        <Building2 size={24} strokeWidth={1.5} />
      </div>
    </div>
  );
}
