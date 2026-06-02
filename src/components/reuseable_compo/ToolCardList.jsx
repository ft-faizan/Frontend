import ToolCard from "../tool_compo/ToolCard.jsx";

const ToolCardList = ({ tools, mode, onEdit, onDelete, loading }) => {
  if (loading)
    return (
      <div className="text-gray-500 p-10 text-center">Loading tools...</div>
    );

  if (!tools || tools.length === 0) {
    return (
      <div className="bg-white border border-dashed border-[#296DE2] rounded-2xl p-20 text-center">
        <p className="text-[#296DE2]">No tools found here yet.</p>
      </div>
    );
  }

  return (
    <div
      className="
      flex
      gap-5
      flex-wrap
      justify-center
      mb-[70px]
            "
    >
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
