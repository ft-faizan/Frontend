// pages/user_save/UserSavePage.jsx
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { useToast } from "../../context/ToastContext";
import {
  fetchSavedTools,
  deleteSavedTool,
} from "../../features/savedTools/savedToolSlice";
import {
  getFolders,
  deleteFolder,
  updateFolder,
  createFolder,
} from "../../features/folders/folderSlice";
import SaveTabs from "./components/SaveTabs";
import ActionButton from "./components/ActionButton";
import SavedToolsView from "./components/SavedToolsView";
import FolderView from "./components/FolderView";
import PageModals from "./components/PageModals";
import { useToolFiltering } from "./hooks/useToolFiltering";
import { useFolderFiltering } from "./hooks/useFolderFiltering";
import { usePagination } from "./hooks/usePagination";

const TOOLS_PER_PAGE = 27;
const FOLDERS_PER_PAGE = 16;

function UserSavePage() {
  const { showToast } = useToast();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  // Redux state
  const { savedItems, loading } = useSelector((state) => state.savedTools);
  const { folders } = useSelector((state) => state.folders);

  // Local state
  const [activeTab, setActiveTab] = useState("saved_tools");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [toolPage, setToolPage] = useState(1);
  const [filters, setFilters] = useState({
    search: "",
    toolType: "all",
    category: "",
  });

  // Modal states
  const [isFolderModalOpen, setIsFolderModalOpen] = useState(false);
  const [selectedFolder, setSelectedFolder] = useState(null);
  const [isCustomModalOpen, setIsCustomModalOpen] = useState(false);
  const [selectedCustomTool, setSelectedCustomTool] = useState(null);
  const [deleteFolderModal, setDeleteFolderModal] = useState(false);
  const [selectedFolderId, setSelectedFolderId] = useState(null);
  const [selectedFolderName, setSelectedFolderName] = useState("");

  // Derived: default folder ID
  const defaultFolder = folders.find((f) => f.name === "default");
  const defaultFolderId = defaultFolder?._id;

  // Custom hooks
  const { displayTools, dynamicCategories } = useToolFiltering(
    savedItems,
    defaultFolderId,
    filters
  );
  const { filteredFolders } = useFolderFiltering(folders, searchQuery);
  const { paginatedItems: paginatedTools, totalPages: totalToolPages } =
    usePagination(displayTools, TOOLS_PER_PAGE, toolPage);
  const { paginatedItems: paginatedFolders, totalPages: totalFolderPages } =
    usePagination(filteredFolders, FOLDERS_PER_PAGE, currentPage);

  // Initial fetch
  useEffect(() => {
    dispatch(fetchSavedTools());
    dispatch(getFolders());
  }, [dispatch]);

  // Sync tab from navigation state
  useEffect(() => {
    if (location.state?.activeTab) {
      setActiveTab(location.state.activeTab);
      window.history.replaceState({}, document.title);
    }
  }, [location.state]);

  // Handlers
  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
    setToolPage(1);
  };

  const handleClearFilters = () => {
    setFilters({ search: "", toolType: "all", category: "" });
  };

  const handleRemoveSaved = (id) => {
    if (window.confirm("Remove this tool?")) dispatch(deleteSavedTool(id));
  };

  const handleEditTool = (tool) => {
    setSelectedCustomTool(tool);
    setIsCustomModalOpen(true);
  };

  // const handleDeleteFolder = async (id) => {
  //   try {
  //     await dispatch(deleteFolder(id)).unwrap();
  //     showToast("Folder deleted successfully");
  //     setDeleteFolderModal(false);
  //   } catch (err) {
  //     showToast(err || "Failed to delete folder", "error");
  //   }
  // };


  // 🛠️ Inside your UserSavePage.jsx file

const handleDeleteFolder = async (id) => {
  try {
    // 1. Wait for the folder to be deleted on the database
    await dispatch(deleteFolder(id)).unwrap();
    
    // 🚀 THE FIX: Immediately re-fetch all saved tools!
    // This pulls the updated tools (which the backend moved to 'default') into Redux instantly.
    await dispatch(fetchSavedTools());

    showToast("Folder deleted and tools moved to default folder", "success");
    setDeleteFolderModal(false);
  } catch (err) {
    showToast(err || "Failed to delete folder", "error");
  }
};

  const handleFolderConfirm = async (name) => {
    try {
      if (selectedFolder) {
        await dispatch(
          updateFolder({ id: selectedFolder._id, name })
        ).unwrap();
        showToast("Folder renamed successfully");
      } else {
        await dispatch(createFolder(name)).unwrap();
        showToast("Folder created successfully");
      }
      setIsFolderModalOpen(false);
    } catch (err) {
      showToast(err || "Something went wrong", "error");
    }
  };

  const handleOpenAddFolder = () => {
    setSelectedFolder(null);
    setIsFolderModalOpen(true);
  };

  const handleOpenAddCustomTool = () => {
    setSelectedCustomTool(null);
    setIsCustomModalOpen(true);
  };

  const handleFolderNavigate = (folder) => {
    navigate(`/saved/folder/${folder._id}`, { state: { name: folder.name } });
  };

  const handleEditFolder = (folder) => {
    setSelectedFolder(folder);
    setIsFolderModalOpen(true);
  };

  const handleDeleteFolderClick = (id) => {
    const folder = folders.find((f) => f._id === id);
    setSelectedFolderId(id);
    setSelectedFolderName(folder?.name || "folder");
    setDeleteFolderModal(true);
  };

  return (
    <div className="h-[90vh] overflow-y-scroll p-5">
      <div className="flex justify-between">
        <SaveTabs activeTab={activeTab} onTabChange={setActiveTab} />
        <ActionButton
          activeTab={activeTab}
          onAddCustomTool={handleOpenAddCustomTool}
          onAddFolder={handleOpenAddFolder}
        />
      </div>

      <div className="-h-[100%]">
        {activeTab === "saved_tools" ? (
          <SavedToolsView
            filters={filters}
            categories={dynamicCategories}
            onFilterChange={handleFilterChange}
            onClearFilters={handleClearFilters}
            paginatedTools={paginatedTools}
            loading={loading}
            onDelete={handleRemoveSaved}
            onEdit={handleEditTool}
            toolPage={toolPage}
            totalToolPages={totalToolPages}
            onToolPageChange={setToolPage}
          />
        ) : (
          <FolderView
            searchQuery={searchQuery}
            onSearchChange={(val) => {
              setSearchQuery(val);
              setCurrentPage(1);
            }}
            filteredFolders={filteredFolders}
            paginatedFolders={paginatedFolders}
            currentPage={currentPage}
            totalFolderPages={totalFolderPages}
            onPageChange={setCurrentPage}
            onNavigate={handleFolderNavigate}
            onEditFolder={handleEditFolder}
            onDeleteFolder={handleDeleteFolderClick}
          />
        )}
      </div>

      <PageModals
        isFolderModalOpen={isFolderModalOpen}
        onCloseFolderModal={() => setIsFolderModalOpen(false)}
        selectedFolder={selectedFolder}
        onFolderConfirm={handleFolderConfirm}
        isCustomModalOpen={isCustomModalOpen}
        onCloseCustomModal={() => {
          setIsCustomModalOpen(false);
          setSelectedCustomTool(null);
        }}
        selectedCustomTool={selectedCustomTool}
        deleteFolderModal={deleteFolderModal}
        onCloseDeleteModal={() => setDeleteFolderModal(false)}
        onDeleteConfirm={() => handleDeleteFolder(selectedFolderId)}
        deleteFolderName={selectedFolderName}
      />
    </div>
  );
}

export default UserSavePage;