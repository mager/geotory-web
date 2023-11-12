"use client";
import { FolderArchive, GithubIcon } from "lucide-react";
import { getHost } from "@/lib/utils";
import { DatasetT } from "@/app/types";

async function downloadCSV(username: string, slug: string) {
  const url = `${getHost()}/datasets/${username}/${slug}/zip`;
  // Open CSV in a new tab
  window.open(url, "_blank");
}

export const Downloads = ({
  // dataset,
  slug,
  username,
}: {
  dataset: DatasetT;
  username: string;
  slug: string;
}) => {
  // const { source } = dataset;
  // Determine if source contains github.com
  // const isGithub = source.match(/github.com/);

  return (
    <div className="mb-4">
      <h3 className="bold mb-2 font-sansSerif text-2xl">Downloads</h3>
      <div className="flex gap-x-4">
        <div>
          <button
            onClick={() => downloadCSV(username, slug)}
            className="inline-block rounded bg-gray-400 px-4 py-2 text-white hover:bg-gray-300"
            title="Download CSV"
          >
            <FolderArchive className="h-8 w-8" />
          </button>
        </div>
        {/* <div>
        <button
          onClick={() => downloadCSV(username, slug)}
          className="inline-block rounded bg-gray-400 px-4 py-2 text-white hover:bg-gray-300"
          title="Github"
        >
          <GithubIcon className="h-8 w-8" />
        </button>
      </div> */}
      </div>
    </div>
  );
};
