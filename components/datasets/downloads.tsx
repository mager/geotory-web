"use client";
import { FolderArchive } from "lucide-react";
import { getHost } from "@/lib/utils";

async function downloadCSV(username: string, slug: string) {
  const url = `${getHost()}/datasets/${username}/${slug}/zip`;
  // Open CSV in a new tab
  window.open(url, "_blank");
}

export const Downloads = ({
  username,
  slug,
}: {
  username: string;
  slug: string;
}) => (
  <div className="mb-4">
    <button
      onClick={() => downloadCSV(username, slug)}
      className="inline-block rounded bg-gray-400 px-4 py-2 text-white hover:bg-gray-300"
      title="Download CSV"
    >
      <div className="flex items-center justify-center">
        <FolderArchive className="h-8 w-8" />
        <span className="ml-2">ZIP</span>
      </div>
    </button>
  </div>
);
