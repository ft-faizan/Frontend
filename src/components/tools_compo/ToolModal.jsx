import { useState, useEffect } from "react";

function ToolModal({
  isOpen,
  onClose,
  onSubmit,
  initialData,
  categories,
}) {
  const [form, setForm] = useState({
    name: "",
    link: "",
    description: "",
    category: "",
    image: null,
  });

  useEffect(() => {
    if (initialData) {
      setForm({
        name: initialData.name || "",
        link: initialData.link || "",
        description: initialData.description || "",
        category: initialData.category?._id || "",
        image: null,
      });
    }
  }, [initialData]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg w-full max-w-md">

        <h2 className="text-xl font-bold mb-4">
          {initialData ? "Edit Tool" : "Create Tool"}
        </h2>

        {/* NAME */}
        <input
          placeholder="Tool Name"
          value={form.name}
          onChange={(e) =>
            setForm({ ...form, name: e.target.value })
          }
          className="w-full p-2 border mb-3"
        />

        {/* LINK */}
        <input
          placeholder="Website Link"
          value={form.link}
          onChange={(e) =>
            setForm({ ...form, link: e.target.value })
          }
          className="w-full p-2 border mb-3"
        />

        {/* DESCRIPTION */}
        <textarea
          placeholder="Description"
          value={form.description}
          onChange={(e) =>
            setForm({ ...form, description: e.target.value })
          }
          className="w-full p-2 border mb-3"
        />

        {/* CATEGORY */}
        <select
          value={form.category}
          onChange={(e) =>
            setForm({ ...form, category: e.target.value })
          }
          className="w-full p-2 border mb-3"
        >
          <option value="">Select Category</option>
          {categories.map((cat) => (
            <option key={cat._id} value={cat._id}>
              {cat.name}
            </option>
          ))}
        </select>

        {/* IMAGE */}
        <input
          type="file"
          onChange={(e) =>
            setForm({ ...form, image: e.target.files[0] })
          }
          className="mb-3"
        />

        {/* ACTIONS */}
        <div className="flex justify-end gap-2">
          <button onClick={onClose}>Cancel</button>

          <button
            onClick={() => {
              const formData = new FormData();
              formData.append("name", form.name);
              formData.append("link", form.link);
              formData.append("description", form.description);
              formData.append("category", form.category);

              if (form.image) {
                formData.append("image", form.image);
              }

              onSubmit(formData);
            }}
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            {initialData ? "Update" : "Create"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ToolModal;