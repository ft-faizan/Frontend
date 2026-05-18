export const getTrashTools = () => {
  const data = localStorage.getItem("trashTools");
  return data ? JSON.parse(data) : [];
};

export const addToTrash = (tool) => {
  const existing = getTrashTools();

  const updated = [...existing, tool];

  localStorage.setItem("trashTools", JSON.stringify(updated));
};

export const removeFromTrash = (id) => {
  const existing = getTrashTools();

  const filtered = existing.filter((item) => item._id !== id);

  localStorage.setItem("trashTools", JSON.stringify(filtered));
};