import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  createCategory,
  updateCategory,
} from "../../features/categories/categorySlice.js";
import { useToast } from "../../context/ToastContext.jsx";

function CreateAndEditCategoryModal({ open, onClose, editData }) {
  const dispatch = useDispatch();
  const { showToast } = useToast();

  const [name, setName] = useState("");

  useEffect(() => {
    if (editData) {
      setName(editData.name);
    } else {
      setName("");
    }
  }, [editData]);

  if (!open) return null;

  const handleSubmit = async () => {
    if (!name.trim()) return;

    try {
      if (editData) {
        // ✏️ UPDATE
        await dispatch(
          updateCategory({ id: editData._id, data: { name } })
        ).unwrap();

        showToast("Category updated successfully", "success");
      } else {
        // ➕ CREATE
        await dispatch(createCategory({ name })).unwrap();

        showToast("Category created successfully", "success");
      }

      onClose();
      setName("");
    } catch (err) {
      // ❌ ERROR HANDLING
      if (err?.toLowerCase().includes("exist")) {
        showToast("Category already exists", "error");
      } else {
        showToast(err || "Something went wrong", "error");
      }
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-xl w-[400px]">

        <h2 className="text-lg font-bold mb-4">
          {editData ? "Edit Category" : "Create Category"}
        </h2>

        <input
          type="text"
          placeholder="Enter category name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full border p-2 rounded mb-4"
        />

        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 border rounded"
          >
            Cancel
          </button>

          <button
            onClick={handleSubmit}
            className="bg-[#3380FF] text-white px-4 py-2 rounded"
          >
            {editData ? "Update" : "Create"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default CreateAndEditCategoryModal;