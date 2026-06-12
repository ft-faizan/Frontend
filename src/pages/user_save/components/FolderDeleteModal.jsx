// pages/user_save/components/FolderDeleteModal.jsx
import ConfirmModal from "../../../components/reuseable_compo/ConfirmModal";

function FolderDeleteModal({ open, folderName, onConfirm, onClose }) {
  return (
    <ConfirmModal
      open={open}
      onClose={onClose}
      onConfirm={onConfirm}
      title="Delete Folder"
      message={`Are you sure you want to delete "${folderName}"? Tools inside will be moved to default folder.`}
      confirmText="Delete"
      cancelText="Cancel"
      type="danger"
    />
  );
}

export default FolderDeleteModal;