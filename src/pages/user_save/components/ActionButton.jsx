// pages/user_save/components/ActionButton.jsx
import SlidingButton from "../../../components/reuseable_compo/SlidingButton";
import { FaPlus } from "react-icons/fa";

function ActionButton({ activeTab, onAddCustomTool, onAddFolder }) {
  const isToolsTab = activeTab === "saved_tools";

  return isToolsTab ? (
    <SlidingButton
      icon={<FaPlus className="text-white text-base" />}
      text="Add Custom Tools"
      onClick={onAddCustomTool}
      width="w-[220px]"
    />
  ) : (
    <SlidingButton
      icon={<FaPlus className="text-white text-base" />}
      text="Add New Folder"
      onClick={onAddFolder}
      width="w-[200px]"
    />
  );
}

export default ActionButton;