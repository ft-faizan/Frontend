// pages/user_save/components/FolderGrid.jsx
import FolderCard from "../../../components/user_save_compo/FolderCard";

function FolderGrid({ folders, onNavigate, onEdit, onDelete }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-16">
      {folders.map((folder) => (
        <FolderCard
          key={folder._id}
          folder={folder}
          onNavigate={() => onNavigate(folder)}
          onEdit={() => onEdit(folder)}
          onDelete={() => onDelete(folder._id)}
        />
      ))}
    </div>
  );
}

export default FolderGrid;