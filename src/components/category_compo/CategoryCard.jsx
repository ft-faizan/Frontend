import { useDispatch, useSelector } from "react-redux";
import { deleteCategory } from "../../features/categories/categorySlice";
import { useToast } from "../../context/ToastContext";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import CreateAndEditCategoryModal from "../admin/CreateAndEditCategoryModal";

function CategoryCard({ category, mode, showCreator = true }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { showToast } = useToast();

  const user = useSelector((state) => state.auth.user);

  const [open, setOpen] = useState(false);

  const createdById =
    typeof category.createdBy === "object"
      ? category.createdBy?._id
      : category.createdBy;

  const isOwner = user?._id?.toString() === createdById?.toString();

  const isAdmin = user?.role === "admin";
  const isSuperAdmin = user?.role === "superadmin";

  let canEdit = false;
  let canDelete = false;

  if (mode === "admin") {
    canEdit = isOwner; // admin can edit only own
  }

  if (mode === "superadmin") {
    canEdit = true; // super admin page
    canDelete = true;
  }

  // console.log("MODE:", mode);
  // console.log("isOwner:", isOwner);
  // console.log("canEdit:", canEdit);

  // 🔥 SAFETY (in case mode missing)
  if (!mode) {
    canEdit = false;
    canDelete = false;
  }
  // 🗑 DELETE
  const handleDelete = async () => {
    try {
      await dispatch(deleteCategory(category._id)).unwrap();
      showToast("Category deleted successfully", "success");
    } catch (err) {
      showToast(err || "Delete failed", "error");
    }
  };

  return (
    <div className="border border-[#2a2d3a] rounded-xl p-4 bg-[]">
      {/* CATEGORY NAME */}
      <h3 className="text-lg font-semibold capitalize">{category.name}</h3>

      {/* CREATED BY */}
      {/* <p className="text-sm text-gray-400 mt-1">
        Created by: {category.createdBy?.email}
      </p> */}

      {showCreator && (
        <p className="text-sm text-gray-400 mt-1">
          Created by: {category.createdBy?.email}
        </p>
      )}

      {/* ACTIONS */}
      <div className="flex gap-2 mt-4 flex-wrap">
        {/* VIEW ALL */}
        <button
          // onClick={() => navigate(`/categories/${category._id}/folders`)}
          onClick={() =>
            navigate(`/categories/${category._id}/folders`, {
              state: { name: category.name },
            })
          }
          className="px-3 py-1 bg-[#3380FF] rounded text-white text-sm"
        >
          View All
        </button>

        {/* EDIT */}
        {canEdit && (
          <button
            onClick={() => setOpen(true)}
            className="px-3 py-1 border rounded text-sm"
          >
            Edit
          </button>
        )}

        {/* DELETE */}
        {canDelete && (
          <button
            onClick={handleDelete}
            className="px-3 py-1 bg-red-500 rounded text-white text-sm"
          >
            Delete
          </button>
        )}
      </div>

      {/* MODAL */}
      <CreateAndEditCategoryModal
        open={open}
        onClose={() => setOpen(false)}
        editData={category}
      />
    </div>
  );
}

export default CategoryCard;
