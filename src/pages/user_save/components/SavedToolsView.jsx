// pages/user_save/components/SavedToolsView.jsx
import ToolFilters from "../../../components/reuseable_compo/ToolFilters";
import ToolCardList from "../../../components/reuseable_compo/ToolCardList";
import SavedToolsPagination from "./SavedToolsPagination";

function SavedToolsView({
  filters,
  categories,
  onFilterChange,
  onClearFilters,
  paginatedTools,
  loading,
  onDelete,
  onEdit,
  toolPage,
  totalToolPages,
  onToolPageChange,
}) {
  return (
    <>
      <ToolFilters
        type="user_saved"
        filters={filters}
        categories={categories}
        onFilterChange={onFilterChange}
        onClear={onClearFilters}
      />
      <div className="mt-[30px]">
        <ToolCardList
          tools={paginatedTools}
          mode="saved"
          loading={loading}
          onDelete={onDelete}
          onEdit={onEdit}
        />
      </div>
      <SavedToolsPagination
        currentPage={toolPage}
        totalPages={totalToolPages}
        onPageChange={onToolPageChange}
      />
    </>
  );
}

export default SavedToolsView;