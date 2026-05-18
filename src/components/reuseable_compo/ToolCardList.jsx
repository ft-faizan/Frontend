import ToolCard from "../tool_compo/ToolCard.jsx";

const ToolCardList = ({ tools, mode, onEdit, onDelete, loading }) => {
  if (loading) return <div className="text-gray-500 p-10 text-center">Loading tools...</div>;

  if (!tools || tools.length === 0) {
    return (
      <div className="bg-[#1c1f26] border border-dashed border-[#2a2d3a] rounded-2xl p-20 text-center">
        <p className="text-gray-500">No tools found here yet.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {tools.map((tool) => (
        <ToolCard 
          // key={tool._id} 
          // key={`${tool._id}-${tool.updatedAt}`}
          key={`${tool._id}-${tool.updatedAt || Date.now()}`}
          tool={tool} 
          mode={mode} 
          onEdit={onEdit} 
          onDelete={onDelete} 
          
        />
      ))}
    </div>
  );
};

export default ToolCardList;