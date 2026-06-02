import { useState, useCallback, useEffect } from "react";

const STORAGE_KEY = "recentTools";
const MAX_ITEMS = 5;
const EVENT_NAME = "recentToolsUpdated"; // custom event to sync without refresh

function readStorage() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
  } catch {
    return [];
  }
}

export function useRecentTools() {
  const [recentTools, setRecentTools] = useState(readStorage);

  // listen for updates from OTHER components in the same tab
  useEffect(() => {
    const onUpdate = () => setRecentTools(readStorage());
    window.addEventListener(EVENT_NAME, onUpdate);
    return () => window.removeEventListener(EVENT_NAME, onUpdate);
  }, []);

  const addRecentTool = useCallback((tool) => {
    setRecentTools((prev) => {
      const filtered = prev.filter((t) => t._id !== tool._id);
      const next = [
        { _id: tool._id, name: tool.name, link: tool.link, image: tool.image },
        ...filtered,
      ].slice(0, MAX_ITEMS);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      // fire custom event so RecentToolsDock updates instantly (same tab)
      window.dispatchEvent(new Event(EVENT_NAME));
      return next;
    });
  }, []);

  return { recentTools, addRecentTool };
}
