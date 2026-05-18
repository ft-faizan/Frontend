import React, { useState, useEffect } from "react";

const FolderModal = ({ open, onClose, onConfirm, initialData }) => {
  const [name, setName] = useState("");

  useEffect(() => {
    setName(initialData?.name || "");
  }, [initialData, open]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="bg-[#1c1f26] border border-[#2a2d3a] w-full max-w-sm rounded-2xl p-6 shadow-2xl">
        <h2 className="text-xl font-bold text-white mb-4">
          {initialData ? "Edit Folder" : "Create New Folder"}
        </h2>
        <input
          autoFocus
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Folder name..."
          className="w-full bg-[#13151a] border border-[#2a2d3a] p-3 rounded-xl text-white outline-none focus:border-[#286FF0] mb-6"
        />
        <div className="flex gap-3">
          <button onClick={onClose} className="flex-1 px-4 py-2 text-gray-400 hover:text-white transition-colors">
            Cancel
          </button>
          <button 
            onClick={() => { onConfirm(name); onClose(); }}
            disabled={!name.trim()}
            className="flex-1 bg-[#286FF0] text-white px-4 py-2 rounded-xl font-bold disabled:opacity-50"
          >
            {initialData ? "Update" : "Create"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default FolderModal;