// import React from "react";

// const FolderCard = ({ folder, onNavigate, onEdit, onDelete }) => {
//   return (
//     <div className="bg-[#1c1f26] border border-[#2a2d3a] p-6 rounded-2xl relative hover:border-[#286FF0] transition-all group flex flex-col items-center text-center">
      
//       {/* Action Buttons (Top Right) */}
//       <div className="absolute top-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
//         <button 
//           onClick={(e) => { e.stopPropagation(); onEdit(folder); }}
//           className="p-1.5 bg-blue-500/10 text-blue-400 rounded-md hover:bg-blue-500 hover:text-white transition-all"
//           title="Edit Name"
//         >
//           ✏️
//         </button>
//         <button 
//           onClick={(e) => { e.stopPropagation(); onDelete(folder._id); }}
//           className="p-1.5 bg-red-500/10 text-red-400 rounded-md hover:bg-red-500 hover:text-white transition-all"
//           title="Delete Folder"
//         >
//           🗑️
//         </button>
//       </div>

//       {/* Main Content */}
//       <div 
//         className="cursor-pointer w-full"
//         onClick={() => onNavigate(folder)}
//       >
//         <div className="text-4xl mb-3 group-hover:scale-110 transition-transform">📁</div>
//         <h3 className="text-white font-bold capitalize group-hover:text-[#286FF0] truncate w-full px-2">
//           {folder.name}
//         </h3>
//         <p className="text-gray-500 text-[10px] mt-2 inline-block uppercase tracking-widest border border-[#2a2d3a] px-2 py-1 rounded-md">
//           Collection
//         </p>
//       </div>
//     </div>
//   );
// };

// export default FolderCard;


// import React from "react";

// const FolderCard = ({ folder, onNavigate, onEdit, onDelete }) => {
//   return (
//     <div 
//       onClick={() => onNavigate(folder)}
//       className="bg-[#1c1f26] border border-[#2a2d3a] p-6 rounded-2xl relative cursor-pointer hover:border-[#286FF0] transition-all group flex flex-col items-center text-center"
//     >
//       {/* Action Buttons */}
//       <div className="absolute top-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity z-10">
//         <button 
//           onClick={(e) => { 
//             e.stopPropagation(); // 🔥 Stops redirection
//             onEdit(folder); 
//           }}
//           className="p-1.5 bg-blue-500/10 text-blue-400 rounded-md hover:bg-blue-500 hover:text-white transition-all"
//         >
//           ✏️
//         </button>
//         <button 
//           onClick={(e) => { 
//             e.stopPropagation(); // 🔥 Stops redirection
//             onDelete(folder._id); 
//           }}
//           className="p-1.5 bg-red-500/10 text-red-400 rounded-md hover:bg-red-500 hover:text-white transition-all"
//         >
//           🗑️
//         </button>
//       </div>

//       <div className="text-4xl mb-3 group-hover:scale-110 transition-transform">📁</div>
//       <h3 className="text-white font-bold capitalize group-hover:text-[#286FF0] truncate w-full">
//         {folder.name}
//       </h3>
//     </div>
//   );
// };

// export default FolderCard;






// v3
import React from "react";
import { Pencil, Trash2, Folder, ArrowRight } from "lucide-react";

const FolderCard = ({ folder, onNavigate, onEdit, onDelete }) => {
  const toolCount = folder.toolCount ?? folder.tools?.length ?? 0;

  return (
    <div
      onClick={() => onNavigate(folder)}
      className="
        relative group cursor-pointer
         bg-white
        border border-white/[0.07]
        rounded-2xl
        p-5
        flex flex-col gap-3.5
        overflow-hidden
        transition-all duration-200
        hover:border-[#2F70EB]/50
        hover:shadow-[0_4px_24px_rgba(47,112,235,0.12)]
        hover:-translate-y-0.5
      "
    >
      {/* Blue glow on hover */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#2F70EB]/[0.06] to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />

      {/* Action buttons — visible on hover */}
      <div className="absolute top-2.5 right-2.5 flex gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity z-10">
        <button
          onClick={(e) => { e.stopPropagation(); onEdit(folder); }}
          aria-label="Edit folder"
          className="
            w-7 h-7 rounded-lg flex items-center justify-center
            bg-[#2F70EB]/10 text-[#2F70EB]
            hover:bg-[#2F70EB] hover:text-white
            transition-all duration-150
          "
        >
          <Pencil size={13} />
        </button>
        <button
          onClick={(e) => { e.stopPropagation(); onDelete(folder._id); }}
          aria-label="Delete folder"
          className="
            w-7 h-7 rounded-lg flex items-center justify-center
            bg-red-500/10 text-red-400
            hover:bg-red-500 hover:text-white
            transition-all duration-150
          "
        >
          <Trash2 size={13} />
        </button>
      </div>

      {/* Folder icon */}
      <div className="
        w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0
        bg-[#2F70EB]/10 border border-[#2F70EB]/20
        group-hover:bg-[#2F70EB]/18 group-hover:border-[#2F70EB]/40
        transition-all duration-200
      ">
        <Folder size={20} className="text-[#2F70EB]" />
      </div>

      {/* Name + count */}
      <div className="flex flex-col gap-0.5 min-w-0">
        <h3 className="
          text-[14px] font-medium text-[#296DE2]
          truncate group-hover:text-[#2F70EB]
          transition-colors duration-200
          capitalize
        ">
          {folder.name}
        </h3>
        {/* <p className="text-[12px] text-white/30">
          {toolCount} {toolCount === 1 ? "tool" : "tools"}
        </p> */}
      </div>

      {/* Divider */}
      <div className="h-px bg-[#EAF0FC]" />

      {/* Footer */}
      <div className="flex items-center justify-between">
        
        <span className="
          w-1.5 h-1.5 rounded-full
          bg-[#2F70EB]/30
          group-hover:bg-[#2F70EB]
          transition-colors duration-200
        " />
        <button className="flex items-center gap-1 text-[12px] text-[#212B3A] group-hover:text-[#2F70EB] transition-colors duration-200">
         
          Open
           <ArrowRight size={13} />
        </button>
      </div>
    </div>
  );
};

export default FolderCard;