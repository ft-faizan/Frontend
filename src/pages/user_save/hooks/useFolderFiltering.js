// pages/user_save/hooks/useFolderFiltering.js
import { useMemo } from "react";

export function useFolderFiltering(folders, searchQuery) {
  const filteredFolders = useMemo(() => {
    return folders
      .filter((f) => f.type === "custom")
      .filter((f) =>
        (f.name || "").toLowerCase().includes(searchQuery.toLowerCase())
      );
  }, [folders, searchQuery]);

  return { filteredFolders };
}