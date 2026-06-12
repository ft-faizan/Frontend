// pages/user_save/hooks/useToolFiltering.js
import { useMemo } from "react";

export function useToolFiltering(savedItems, defaultFolderId, filters) {
  const displayTools = useMemo(() => {
    return savedItems.filter((item) => {
      const folderIdValue =
        typeof item.folderId === "string" ? item.folderId : item.folderId?._id;
      const isInDefault = !item.folderId || folderIdValue === defaultFolderId;
      if (!isInDefault) return false;

      const toolName =
        item.type === "platform" ? item.toolId?.name : item.toolname;
      const matchesSearch = (toolName || "")
        .toLowerCase()
        .includes((filters.search || "").toLowerCase());
      const matchesType =
        filters.toolType === "all" || item.type === filters.toolType;
      const catId = item.toolId?.category?._id || item.toolId?.category;
      const matchesCategory = !filters.category || catId === filters.category;

      return matchesSearch && matchesType && matchesCategory;
    });
  }, [savedItems, defaultFolderId, filters]);

  const dynamicCategories = useMemo(() => {
    if (!savedItems || savedItems.length === 0) return [];

    const toolsInView = savedItems.filter((item) => {
      const folderIdValue =
        typeof item.folderId === "string" ? item.folderId : item.folderId?._id;
      return !item.folderId || folderIdValue === defaultFolderId;
    });

    const cats = toolsInView
      .filter((item) => item.type === "platform" && item.toolId?.category)
      .map((item) => item.toolId.category);

    const uniqueMap = new Map();
    cats.forEach((cat) => {
      const id = typeof cat === "string" ? cat : cat._id;
      const name = typeof cat === "object" ? cat.name : null;
      if (id && name && !uniqueMap.has(id)) {
        uniqueMap.set(id, { _id: id, name: name });
      }
    });

    return Array.from(uniqueMap.values());
  }, [savedItems, defaultFolderId]);

  return { displayTools, dynamicCategories };
}