// pages/user_save/components/PageModals.jsx
import FolderModal from "../../../components/user_save_compo/FolderModal";
import AddCustomToolModal from "../../../components/user_save_compo/AddCustomToolModal";
import FolderDeleteModal from "./FolderDeleteModal";

function PageModals({
  isFolderModalOpen,
  onCloseFolderModal,
  selectedFolder,
  onFolderConfirm,
  isCustomModalOpen,
  onCloseCustomModal,
  selectedCustomTool,
  deleteFolderModal,
  onCloseDeleteModal,
  onDeleteConfirm,
  deleteFolderName,
}) {
  return (
    <>
      <FolderModal
        open={isFolderModalOpen}
        onClose={onCloseFolderModal}
        initialData={selectedFolder}
        onConfirm={onFolderConfirm}
      />
      <AddCustomToolModal
        open={isCustomModalOpen}
        onClose={onCloseCustomModal}
        editData={selectedCustomTool}
      />
      <FolderDeleteModal
        open={deleteFolderModal}
        folderName={deleteFolderName}
        onConfirm={onDeleteConfirm}
        onClose={onCloseDeleteModal}
      />
    </>
  );
}

export default PageModals;