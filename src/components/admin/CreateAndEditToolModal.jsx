import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createTool, updateTool } from "../../features/tools/toolSlice.js"; // Adjust path
import { getCategories } from "../../features/categories/categorySlice.js"; // Assuming you have this

const CreateAndEditToolModal = ({ open, onClose, editData }) => {
  const dispatch = useDispatch();
  const { categories } = useSelector((state) => state.categories);
  
  const [formData, setFormData] = useState({
    name: "",
    link: "",
    category: "",
    description: "",
  });
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState("");

  // Sync modal with editData when opening
  useEffect(() => {
    if (editData) {
      setFormData({
        name: editData.name,
        link: editData.link,
        category: editData.category?._id || editData.category,
        description: editData.description,
      });
      setPreview(editData.image?.url || "");
    } else {
      setFormData({ name: "", link: "", category: "", description: "" });
      setPreview("");
      setImage(null);
    }
    
    // Fetch categories if not loaded for the dropdown
    dispatch(getCategories({ limit: 100 }));
  }, [editData, open, dispatch]);

  if (!open) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("name", formData.name);
    data.append("link", formData.link);
    data.append("category", formData.category);
    data.append("description", formData.description);
    if (image) data.append("image", image);

    if (editData) {
      await dispatch(updateTool({ id: editData._id, data }));
    } else {
      await dispatch(createTool(data));
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="bg-[#1c1f26] border border-[#2a2d3a] w-full max-w-lg rounded-2xl p-6 shadow-xl">
        <h2 className="text-xl font-bold mb-4 text-white">
          {editData ? "Edit Tool" : "Add New Tool"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Tool Name"
            className="w-full bg-[#13151a] border border-[#2a2d3a] p-3 rounded-lg text-white"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
          />

          <input
            type="url"
            placeholder="Website Link (https://...)"
            className="w-full bg-[#13151a] border border-[#2a2d3a] p-3 rounded-lg text-white"
            value={formData.link}
            onChange={(e) => setFormData({ ...formData, link: e.target.value })}
            required
          />

          <select
            className="w-full bg-[#13151a] border border-[#2a2d3a] p-3 rounded-lg text-white"
            value={formData.category}
            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            required
          >
            <option value="">Select Category</option>
            {categories?.map((cat) => (
              <option key={cat._id} value={cat._id}>{cat.name}</option>
            ))}
          </select>

          <textarea
            placeholder="Description"
            className="w-full bg-[#13151a] border border-[#2a2d3a] p-3 rounded-lg text-white h-24"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            required
          />

          <div className="flex flex-col gap-2">
            <label className="text-sm text-gray-400">Tool Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files[0];
                setImage(file);
                setPreview(URL.createObjectURL(file));
              }}
              className="text-sm text-gray-400"
            />
            {preview && <img src={preview} alt="Preview" className="w-20 h-20 object-cover rounded-lg border border-blue-500" />}
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <button type="button" onClick={onClose} className="px-5 py-2 text-gray-400 hover:text-white">Cancel</button>
            <button type="submit" className="bg-[#3380FF] text-white px-6 py-2 rounded-lg font-bold hover:bg-blue-600 transition-colors">
              {editData ? "Update Tool" : "Create Tool"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateAndEditToolModal;