"use client";

import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { saveTool } from "../features/savedTools/savedToolSlice";

function Trash_page() {
  const dispatch = useDispatch();
  const [trashItems, setTrashItems] = useState([]);

  // LOAD TRASH - Run only once on mount
  useEffect(() => {
    const trash = JSON.parse(localStorage.getItem("trashTools")) || [];
    setTrashItems(trash);
  }, []);

  // RECOVER TOOL

    const handleRecover = async (toolId) => {
      const recoveredTool = trashItems.find((item) => item._id === toolId);

      if (!recoveredTool) return;

      const formData = new FormData();

      formData.append("type", "custom");

      formData.append("toolname", recoveredTool.toolname || "");

      formData.append("toollink", recoveredTool.toollink || "");

      formData.append("description", recoveredTool.description || "");

      // IMPORTANT
      formData.append("imageUrl", recoveredTool.imageUrl || "");

      try {
        await dispatch(saveTool(formData)).unwrap();

        // REMOVE FROM TRASH
        const updatedTrash = trashItems.filter((item) => item._id !== toolId);

        localStorage.setItem("trashTools", JSON.stringify(updatedTrash));

        setTrashItems(updatedTrash);

        alert("Recovered!");
      } catch (err) {
        console.log(err);

        alert("Recovery failed");
      }
    };

//   const handleRecover = async (toolId) => {
//     const recoveredTool = trashItems.find((item) => item._id === toolId);

//     const formData = new FormData();

//     formData.append("type", "custom");

//     formData.append("toolname", recoveredTool.toolname || "");

//     formData.append("toollink", recoveredTool.toollink || "");

//     formData.append("imageUrl", recoveredTool.imageUrl || "");

//     // 🔥 ADD THIS PART
//     console.log("=== RECOVERY PAYLOAD ===");

//     for (let [key, value] of formData.entries()) {
//       console.log(key, "→", value);
//     }

//     console.log("imageType:", recoveredTool.imageType);

//     console.log("imageUrl:", recoveredTool.imageUrl);

//     console.log("full trashItem:", recoveredTool);

//     // 🔥 THIS ALREADY EXISTS
//     dispatch(saveTool(formData));
//   };
  // DELETE FOREVER
  const handleDeleteForever = (toolId) => {
    const updatedTrash = trashItems.filter((item) => item._id !== toolId);
    localStorage.setItem("trashTools", JSON.stringify(updatedTrash));
    setTrashItems(updatedTrash);
  };

  return (
    <div className="p-10 min-h-screen bg-[#13151a]">
      <div className="flex justify-between items-center mb-10">
        <h1 className="text-3xl font-bold text-red-500">Trash Bin</h1>
        <p className="text-gray-500 text-sm">{trashItems.length} items found</p>
      </div>

      {trashItems.length === 0 ? (
        <div className="text-center py-20 border-2 border-dashed border-[#2a2d3a] rounded-3xl">
          <p className="text-gray-400">
            Trash is empty. No deleted tools to show.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {trashItems.map((tool) => (
            <div
              key={tool._id}
              className="bg-[#1c1f26] border border-[#2a2d3a] rounded-2xl p-5 flex flex-col justify-between"
            >
              <div>
                <h2 className="text-white text-xl font-bold truncate capitalize">
                  {tool.toolname || tool.name}
                </h2>
                <p className="text-gray-500 text-sm mt-1 truncate">
                  {tool.toollink || tool.link}
                </p>
              </div>

              <div className="flex gap-3 mt-6">
                <button
                  onClick={() => handleRecover(tool._id)}
                  className="flex-1 bg-green-600/10 text-green-500 border border-green-600/20 px-4 py-2 rounded-lg font-semibold hover:bg-green-600 hover:text-white transition-all"
                >
                  Recover
                </button>

                <button
                  onClick={() => handleDeleteForever(tool._id)}
                  className="bg-red-600/10 text-red-500 border border-red-600/20 px-4 py-2 rounded-lg font-semibold hover:bg-red-600 hover:text-white transition-all"
                >
                  Delete Forever
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Trash_page;
