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


import React from "react";

const FolderCard = ({ folder, onNavigate, onEdit, onDelete }) => {
  return (
    <div 
      onClick={() => onNavigate(folder)}
      className="bg-[#1c1f26] border border-[#2a2d3a] p-6 rounded-2xl relative cursor-pointer hover:border-[#286FF0] transition-all group flex flex-col items-center text-center"
    >
      {/* Action Buttons */}
      <div className="absolute top-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity z-10">
        <button 
          onClick={(e) => { 
            e.stopPropagation(); // 🔥 Stops redirection
            onEdit(folder); 
          }}
          className="p-1.5 bg-blue-500/10 text-blue-400 rounded-md hover:bg-blue-500 hover:text-white transition-all"
        >
          ✏️
        </button>
        <button 
          onClick={(e) => { 
            e.stopPropagation(); // 🔥 Stops redirection
            onDelete(folder._id); 
          }}
          className="p-1.5 bg-red-500/10 text-red-400 rounded-md hover:bg-red-500 hover:text-white transition-all"
        >
          🗑️
        </button>
      </div>

      <div className="text-4xl mb-3 group-hover:scale-110 transition-transform">📁</div>
      <h3 className="text-white font-bold capitalize group-hover:text-[#286FF0] truncate w-full">
        {folder.name}
      </h3>
    </div>
  );
};

export default FolderCard;