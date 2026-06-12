// pages/user_save/components/FolderView.jsx
import FolderSearchBar from "./FolderSearchBar";
import FolderGrid from "./FolderGrid";
import FolderEmptyState from "./FolderEmptyState";
import FolderPagination from "./FolderPagination";

function FolderView({
  searchQuery,
  onSearchChange,
  filteredFolders,
  paginatedFolders,
  currentPage,
  totalFolderPages,
  onPageChange,
  onNavigate,
  onEditFolder,
  onDeleteFolder,
}) {
  const hasFolders = filteredFolders.length > 0;

  return (
    <div className="space-y-6">
      <FolderSearchBar searchQuery={searchQuery} onSearchChange={onSearchChange} />

      {!hasFolders ? (
        <FolderEmptyState searchQuery={searchQuery} onClearSearch={() => onSearchChange("")} />
      ) : (
        <>
          <FolderGrid
            folders={paginatedFolders}
            onNavigate={onNavigate}
            onEdit={onEditFolder}
            onDelete={onDeleteFolder}
          />
          <FolderPagination
            currentPage={currentPage}
            totalPages={totalFolderPages}
            onPageChange={onPageChange}
          />
        </>
      )}
    </div>
  );
}

export default FolderView;