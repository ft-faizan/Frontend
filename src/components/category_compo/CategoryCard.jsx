// import { useDispatch, useSelector } from "react-redux";
// import { deleteCategory } from "../../features/categories/categorySlice";
// import { useToast } from "../../context/ToastContext";
// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import CreateAndEditCategoryModal from "../admin/CreateAndEditCategoryModal";

// function CategoryCard({ category, mode, showCreator = true }) {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const { showToast } = useToast();

//   const user = useSelector((state) => state.auth.user);

//   const [open, setOpen] = useState(false);

//   const createdById =
//     typeof category.createdBy === "object"
//       ? category.createdBy?._id
//       : category.createdBy;

//   const isOwner = user?._id?.toString() === createdById?.toString();

//   const isAdmin = user?.role === "admin";
//   const isSuperAdmin = user?.role === "superadmin";

//   let canEdit = false;
//   let canDelete = false;

//   if (mode === "admin") {
//     canEdit = isOwner; // admin can edit only own
//   }

//   if (mode === "superadmin") {
//     canEdit = true; // super admin page
//     canDelete = true;
//   }

//   // console.log("MODE:", mode);
//   // console.log("isOwner:", isOwner);
//   // console.log("canEdit:", canEdit);

//   // 🔥 SAFETY (in case mode missing)
//   if (!mode) {
//     canEdit = false;
//     canDelete = false;
//   }
//   // 🗑 DELETE
//   const handleDelete = async () => {
//     try {
//       await dispatch(deleteCategory(category._id)).unwrap();
//       showToast("Category deleted successfully", "success");
//     } catch (err) {
//       showToast(err || "Delete failed", "error");
//     }
//   };

//   return (
//     <div className="border border-[#2a2d3a] rounded-xl p-4 bg-[]">
//       {/* CATEGORY NAME */}
//       <h3 className="text-lg font-semibold capitalize">{category.name}</h3>

//       {/* CREATED BY */}
//       {/* <p className="text-sm text-gray-400 mt-1">
//         Created by: {category.createdBy?.email}
//       </p> */}

//       {showCreator && (
//         <p className="text-sm text-gray-400 mt-1">
//           Created by: {category.createdBy?.email}
//         </p>
//       )}

//       {/* ACTIONS */}
//       <div className="flex gap-2 mt-4 flex-wrap">
//         {/* VIEW ALL */}
//         <button
//           // onClick={() => navigate(`/categories/${category._id}/folders`)}
//           onClick={() =>
//             navigate(`/categories/${category._id}/folders`, {
//               state: { name: category.name },
//             })
//           }
//           className="px-3 py-1 bg-[#3380FF] rounded text-white text-sm"
//         >
//           View All
//         </button>

//         {/* EDIT */}
//         {canEdit && (
//           <button
//             onClick={() => setOpen(true)}
//             className="px-3 py-1 border rounded text-sm"
//           >
//             Edit
//           </button>
//         )}

//         {/* DELETE */}
//         {canDelete && (
//           <button
//             onClick={handleDelete}
//             className="px-3 py-1 bg-red-500 rounded text-white text-sm"
//           >
//             Delete
//           </button>
//         )}
//       </div>

//       {/* MODAL */}
//       <CreateAndEditCategoryModal
//         open={open}
//         onClose={() => setOpen(false)}
//         editData={category}
//       />
//     </div>
//   );
// }

// export default CategoryCard;

// import { useDispatch, useSelector } from "react-redux";
// import { deleteCategory } from "../../features/categories/categorySlice";
// import { getCategoryPreviewTools } from "../../features/tools/toolSlice";
// import { useToast } from "../../context/ToastContext";
// import { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import CreateAndEditCategoryModal from "../admin/CreateAndEditCategoryModal";

// function CategoryCard({
//   category,
//   mode,
//   showCreator = true,
// }) {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const { showToast } = useToast();

//   const user = useSelector((state) => state.auth.user);

//   // 🔥 CATEGORY PREVIEW DATA
//   const preview = useSelector(
//     (state) =>
//       state.tools.categoryPreview?.[category._id]
//   );

//   const previewTools = preview?.tools || [];

//   const previewImage =
//   preview?.tools?.[0]?.image?.url ||
//   "https://placehold.co/600x400";

//   const [open, setOpen] = useState(false);

//   // 🔥 FETCH PREVIEW TOOLS
//   useEffect(() => {
//     dispatch(getCategoryPreviewTools(category._id));
//   }, [dispatch, category._id]);

//   const createdById =
//     typeof category.createdBy === "object"
//       ? category.createdBy?._id
//       : category.createdBy;

//   const isOwner =
//     user?._id?.toString() ===
//     createdById?.toString();

//   const isAdmin = user?.role === "admin";
//   const isSuperAdmin = user?.role === "superadmin";

//   let canEdit = false;
//   let canDelete = false;

//   if (mode === "admin") {
//     canEdit = isOwner;
//   }

//   if (mode === "superadmin") {
//     canEdit = true;
//     canDelete = true;
//   }

//   if (!mode) {
//     canEdit = false;
//     canDelete = false;
//   }

//   // 🗑 DELETE
//   const handleDelete = async () => {
//     try {
//       await dispatch(
//         deleteCategory(category._id)
//       ).unwrap();

//       showToast(
//         "Category deleted successfully",
//         "success"
//       );
//     } catch (err) {
//       showToast(
//         err || "Delete failed",
//         "error"
//       );
//     }
//   };

//   return (
//     <div className="border border-[#2a2d3a] rounded-2xl overflow-hidden bg-[#111827] hover:border-[#3380FF] transition-all duration-300 shadow-lg hover:shadow-blue-500/10">

//       {/* 🔥 IMAGE SECTION */}
//       <div className="relative h-44 overflow-hidden group">

//         {/* BACKGROUND IMAGE */}
//         <img
//           src={previewImage}
//           alt={category.name}
//           className="w-full h-full object-cover transition duration-500 group-hover:scale-110"
//         />

//         {/* OVERLAY */}
//         <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />

//         {/* TOOL COUNT */}
//         <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full text-xs text-white border border-white/10">
//           {previewTools.length}+ Tools
//         </div>

//         {/* TOOL LOGOS */}
//         <div className="absolute bottom-3 left-3 flex -space-x-3">

//           {previewTools
//             .slice(0, 5)
//             .map((tool) => (
//               <img
//                 key={tool._id}
//                 src={tool.image?.url}
//                 alt={tool.name}
//                 className="w-10 h-10 rounded-full border-2 border-white object-cover bg-white shadow-md"
//               />
//             ))}

//         </div>

//         {/* CATEGORY NAME */}
//         <div className="absolute bottom-3 right-3">
//           <h3 className="text-white text-xl font-bold capitalize drop-shadow-lg">
//             {category.name}
//           </h3>
//         </div>

//       </div>

//       {/* CONTENT */}
//       <div className="p-4">

//         {/* CREATED BY */}
//         {showCreator && (
//           <p className="text-sm text-gray-400 mb-4">
//             Created by:{" "}
//             <span className="text-white">
//               {category.createdBy?.email}
//             </span>
//           </p>
//         )}

//         {/* ACTIONS */}
//         <div className="flex gap-2 flex-wrap">

//           {/* VIEW */}
//           <button
//             onClick={() =>
//               navigate(
//                 `/categories/${category._id}/folders`,
//                 {
//                   state: {
//                     name: category.name,
//                   },
//                 }
//               )
//             }
//             className="px-4 py-2 bg-[#3380FF] hover:bg-[#2563eb] transition rounded-lg text-white text-sm font-medium"
//           >
//             View All
//           </button>

//           {/* EDIT */}
//           {canEdit && (
//             <button
//               onClick={() => setOpen(true)}
//               className="px-4 py-2 border border-gray-600 hover:border-white transition rounded-lg text-sm text-white"
//             >
//               Edit
//             </button>
//           )}

//           {/* DELETE */}
//           {canDelete && (
//             <button
//               onClick={handleDelete}
//               className="px-4 py-2 bg-red-500 hover:bg-red-600 transition rounded-lg text-white text-sm"
//             >
//               Delete
//             </button>
//           )}

//         </div>

//       </div>

//       {/* MODAL */}
//       <CreateAndEditCategoryModal
//         open={open}
//         onClose={() => setOpen(false)}
//         editData={category}
//       />

//     </div>
//   );
// }

// export default CategoryCard;

// // v3
// import { useDispatch, useSelector } from "react-redux";
// import { deleteCategory } from "../../features/categories/categorySlice";
// import { getCategoryPreviewTools } from "../../features/tools/toolSlice";
// import { useToast } from "../../context/ToastContext";
// import { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import CreateAndEditCategoryModal from "../admin/CreateAndEditCategoryModal";

// function CategoryCard({ category, mode, showCreator = true }) {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const { showToast } = useToast();

//   const user = useSelector((state) => state.auth.user);
//   const preview = useSelector(
//     (state) => state.tools.categoryPreview?.[category._id]
//   );

//   const previewTools = preview?.tools || [];
//   const previewImage =
//     preview?.tools?.[0]?.image?.url || "https://placehold.co/600x320";

//   const [open, setOpen] = useState(false);

//   useEffect(() => {
//     dispatch(getCategoryPreviewTools(category._id));
//   }, [dispatch, category._id]);

//   const createdById =
//     typeof category.createdBy === "object"
//       ? category.createdBy?._id
//       : category.createdBy;

//   const isOwner = user?._id?.toString() === createdById?.toString();
//   const canEdit = mode === "superadmin" || (mode === "admin" && isOwner);
//   const canDelete = mode === "superadmin";

//   const handleDelete = async () => {
//     try {
//       await dispatch(deleteCategory(category._id)).unwrap();
//       showToast("Category deleted successfully", "success");
//     } catch (err) {
//       showToast(err || "Delete failed", "error");
//     }
//   };

//   return (
//     <div className="group bg-white dark:bg-[#111317] border border-[#e5e7eb] dark:border-[#1f2230] rounded-xl overflow-hidden hover:border-[#9ca3af] dark:hover:border-[#3a3f52] hover:-translate-y-0.5 transition-all duration-200">

//       {/* IMAGE */}
//       <div className="relative h-40 overflow-hidden bg-[#f9fafb] dark:bg-[#1a1d27]">
//         <img
//           src={previewImage}
//           alt={category.name}
//           className="w-full h-full object-cover transition-transform duration-400 group-hover:scale-105"
//         />

//         {/* Bottom color stripe */}
//         <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-gradient-to-r from-indigo-500 to-indigo-400" />

//         {/* Tool count badge */}
//         <div className="absolute top-2.5 right-2.5 flex items-center gap-1 bg-white dark:bg-[#111317] border border-[#e5e7eb] dark:border-[#2a2d3a] rounded-full px-2.5 py-0.5 text-[11px] font-medium text-gray-500 dark:text-gray-400">
//           <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
//             <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 11-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 004.486-6.336l-3.276 3.277a3.004 3.004 0 01-2.25-2.25l3.276-3.276a4.5 4.5 0 00-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437 1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008z" />
//           </svg>
//           {previewTools.length}+ Tools
//         </div>

//         {/* Tool avatars */}
//         <div className="absolute bottom-4 left-3 flex">
//           {previewTools.slice(0, 5).map((tool) => (
//             <img
//               key={tool._id}
//               src={tool.image?.url}
//               alt={tool.name}
//               className="w-7 h-7 rounded-full border-[1.5px] border-white dark:border-[#111317] object-cover -mr-2 bg-gray-100"
//             />
//           ))}
//         </div>
//       </div>

//       {/* BODY */}
//       <div className="p-4">
//         <div className="flex items-start justify-between gap-2 mb-3">
//           <h3 className="text-[15px] font-medium text-gray-900 dark:text-white capitalize leading-tight">
//             {category.name}
//           </h3>
//           <button className="flex-shrink-0 w-7 h-7 flex items-center justify-center rounded-lg border border-[#e5e7eb] dark:border-[#2a2d3a] text-gray-400 hover:bg-gray-50 dark:hover:bg-[#1f2230] transition-colors">
//             <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
//               <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
//             </svg>
//           </button>
//         </div>

//         <div className="h-px bg-[#f3f4f6] dark:bg-[#1f2230] mb-3" />

//         {showCreator && (
//           <p className="text-xs text-gray-400 mb-3">
//             Created by{" "}
//             <span className="text-gray-600 dark:text-gray-300">
//               {category.createdBy?.email}
//             </span>
//           </p>
//         )}

//         <div className="flex gap-2 flex-wrap">
//           <button
//             onClick={() =>
//               navigate(`/categories/${category._id}/folders`, {
//                 state: { name: category.name },
//               })
//             }
//             className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium border border-[#d1d5db] dark:border-[#2a2d3a] rounded-lg text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-[#1f2230] transition-colors"
//           >
//             View all
//           </button>

//           {canEdit && (
//             <button
//               onClick={() => setOpen(true)}
//               className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium border border-[#d1d5db] dark:border-[#2a2d3a] rounded-lg text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-[#1f2230] transition-colors"
//             >
//               Edit
//             </button>
//           )}

//           {canDelete && (
//             <button
//               onClick={handleDelete}
//               className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium border border-red-200 dark:border-red-900/50 rounded-lg text-red-500 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors"
//             >
//               Delete
//             </button>
//           )}
//         </div>
//       </div>

//       <CreateAndEditCategoryModal
//         open={open}
//         onClose={() => setOpen(false)}
//         editData={category}
//       />
//     </div>
//   );
// }

// export default CategoryCard;

// // v4

// import { useDispatch, useSelector } from "react-redux";
// import { deleteCategory } from "../../features/categories/categorySlice";
// import { getCategoryPreviewTools } from "../../features/tools/toolSlice";
// import { useToast } from "../../context/ToastContext";
// import { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import CreateAndEditCategoryModal from "../admin/CreateAndEditCategoryModal";

// function CategoryCard({
//   category,
//   mode,
//   showCreator = true,
// }) {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const { showToast } = useToast();

//   const user = useSelector((state) => state.auth.user);

//   const preview = useSelector(
//     (state) =>
//       state.tools.categoryPreview?.[category._id]
//   );

//   const previewTools = preview?.tools || [];

//   const [open, setOpen] = useState(false);

//   useEffect(() => {
//     dispatch(
//       getCategoryPreviewTools(category._id)
//     );
//   }, [dispatch, category._id]);

//   const createdById =
//     typeof category.createdBy === "object"
//       ? category.createdBy?._id
//       : category.createdBy;

//   const isOwner =
//     user?._id?.toString() ===
//     createdById?.toString();

//   const canEdit =
//     mode === "superadmin" ||
//     (mode === "admin" && isOwner);

//   const canDelete =
//     mode === "superadmin";

//   const handleDelete = async () => {
//     try {
//       await dispatch(
//         deleteCategory(category._id)
//       ).unwrap();

//       showToast(
//         "Category deleted successfully",
//         "success"
//       );
//     } catch (err) {
//       showToast(
//         err || "Delete failed",
//         "error"
//       );
//     }
//   };

//   return (
//     <div className="group relative overflow-hidden rounded-2xl border border-[#23263a] bg-[#0f1117] hover:border-[#3b82f6]/40 transition-all duration-300">

//       {/* 🔥 MARQUEE SECTION */}
//       <div className="relative h-44 overflow-hidden border-b border-[#1f2230] bg-gradient-to-br from-[#111827] via-[#0f172a] to-[#020617]">

//         {/* GRADIENT BLUR */}
//         <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(59,130,246,0.15),transparent_40%)]" />

//         {/* TOP BLUR */}
//         <div className="absolute top-0 left-0 w-full h-12 bg-gradient-to-b from-black/40 to-transparent z-10" />

//         {/* BOTTOM BLUR */}
//         <div className="absolute bottom-0 left-0 w-full h-12 bg-gradient-to-t from-black/50 to-transparent z-10" />

//         {/* INFINITE LOOP */}
//        {/* 🔥 DOUBLE MARQUEE */}
// <div className="absolute inset-0 overflow-hidden py-5">

//   {/* ROW 1 */}
//   <div className="marquee-row mb-4">

//     <div className="marquee-track flex gap-3">

//       {[...previewTools, ...previewTools].map(
//         (tool, index) => (
//           <div
//             key={`${tool._id}-${index}`}
//             className="pill-card"
//           >
//             <img
//               src={tool.image?.url}
//               alt={tool.name}
//               className="w-5 h-5 rounded-full object-cover"
//             />

//             <span className="text-sm text-gray-200 whitespace-nowrap">
//               {tool.name}
//             </span>
//           </div>
//         )
//       )}

//     </div>

//   </div>

//   {/* ROW 2 */}
//   <div className="marquee-row reverse">

//     <div className="marquee-track flex gap-3">

//       {[...previewTools, ...previewTools].map(
//         (tool, index) => (
//           <div
//             key={`${tool._id}-bottom-${index}`}
//             className="pill-card"
//           >
//             <img
//               src={tool.image?.url}
//               alt={tool.name}
//               className="w-5 h-5 rounded-full object-cover"
//             />

//             <span className="text-sm text-gray-200 whitespace-nowrap">
//               {tool.name}
//             </span>
//           </div>
//         )
//       )}

//     </div>

//   </div>

// </div>

//         {/* CATEGORY NAME */}
//         <div className="absolute left-4 bottom-4 z-20">

//           <h3 className="text-white text-xl font-semibold capitalize">
//             {category.name}
//           </h3>

//           <p className="text-xs text-gray-400 mt-1">
//             {previewTools.length}+ AI Tools
//           </p>

//         </div>

//       </div>

//       {/* BODY */}
//       <div className="p-4">

//         {showCreator && (
//           <p className="text-xs text-gray-500 mb-4">
//             Created by{" "}
//             <span className="text-gray-300">
//               {category.createdBy?.email}
//             </span>
//           </p>
//         )}

//         {/* ACTIONS */}
//         <div className="flex gap-2 flex-wrap">

//           <button
//             onClick={() =>
//               navigate(
//                 `/categories/${category._id}/folders`,
//                 {
//                   state: {
//                     name: category.name,
//                   },
//                 }
//               )
//             }
//             className="px-4 py-2 rounded-xl bg-[#2563eb] hover:bg-[#1d4ed8] text-white text-sm transition"
//           >
//             View All
//           </button>

//           {canEdit && (
//             <button
//               onClick={() => setOpen(true)}
//               className="px-4 py-2 rounded-xl border border-[#2a2d3a] hover:border-[#3b82f6] text-sm text-white transition"
//             >
//               Edit
//             </button>
//           )}

//           {canDelete && (
//             <button
//               onClick={handleDelete}
//               className="px-4 py-2 rounded-xl bg-red-500 hover:bg-red-600 text-sm text-white transition"
//             >
//               Delete
//             </button>
//           )}

//         </div>

//       </div>

//       {/* MODAL */}
//       <CreateAndEditCategoryModal
//         open={open}
//         onClose={() => setOpen(false)}
//         editData={category}
//       />

//       {/* 🔥 CSS */}
//      <style>
//   {`
//     .marquee-row {
//       display: flex;
//       width: max-content;
//       animation: marqueeLeft 30s linear infinite;
//     }

//     .marquee-row.reverse {
//       animation: marqueeRight 30s linear infinite;
//     }

//     .marquee-track {
//       display: flex;
//       width: max-content;
//     }

//     .pill-card {
//       display: flex;
//       align-items: center;
//       gap: 10px;
//       padding: 10px 16px;
//       border-radius: 999px;
//       background: rgba(255,255,255,0.06);
//       border: 1px solid rgba(255,255,255,0.08);
//       backdrop-filter: blur(10px);
//       min-width: max-content;
//       transition: 0.3s ease;
//     }

//     .pill-card:hover {
//       transform: translateY(-2px);
//       background: rgba(255,255,255,0.1);
//       border-color: rgba(59,130,246,0.4);
//     }

//     @keyframes marqueeLeft {
//       from {
//         transform: translateX(0);
//       }

//       to {
//         transform: translateX(-50%);
//       }
//     }

//     @keyframes marqueeRight {
//       from {
//         transform: translateX(-50%);
//       }

//       to {
//         transform: translateX(0%);
//       }
//     }
//   `}
// </style>
//     </div>
//   );
// }

// export default CategoryCard;

// import { useDispatch, useSelector } from "react-redux";
// import { deleteCategory } from "../../features/categories/categorySlice";
// import { getCategoryPreviewTools } from "../../features/tools/toolSlice";
// import { useToast } from "../../context/ToastContext";
// import { useState, useEffect, useMemo } from "react";
// import { useNavigate } from "react-router-dom";
// import CreateAndEditCategoryModal from "../admin/CreateAndEditCategoryModal";

// function CategoryCard({ category, mode, showCreator = true }) {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const { showToast } = useToast();

//   const user = useSelector((state) => state.auth.user);
//   const preview = useSelector((state) => state.tools.categoryPreview?.[category._id]);

//   const previewTools = preview?.tools || [];
//   const [open, setOpen] = useState(false);
//   const [imageErrors, setImageErrors] = useState({});

//   useEffect(() => {
//     dispatch(getCategoryPreviewTools(category._id));
//   }, [dispatch, category._id]);

//   const createdById =
//     typeof category.createdBy === "object" ? category.createdBy?._id : category.createdBy;
//   const isOwner = user?._id?.toString() === createdById?.toString();
//   const canEdit = mode === "superadmin" || (mode === "admin" && isOwner);
//   const canDelete = mode === "superadmin";

//   // Duplicate tools for seamless marquee (enough for smooth loop)
//   const marqueeTools = useMemo(() => {
//     if (previewTools.length === 0) return [];
//     // 3 copies ensure no gap on any screen
//     return [...previewTools, ...previewTools, ...previewTools];
//   }, [previewTools]);

//   const handleDelete = async () => {
//     try {
//       await dispatch(deleteCategory(category._id)).unwrap();
//       showToast("Category deleted successfully", "success");
//     } catch (err) {
//       showToast(err || "Delete failed", "error");
//     }
//   };

//   const handleImageError = (toolId) => {
//     setImageErrors((prev) => ({ ...prev, [toolId]: true }));
//   };

//   // Navigate to tool page
//   const handleToolClick = (toolId) => {
//     if (toolId) navigate(`/tools/${toolId}`);
//   };

//   return (
//     <div className="group relative overflow-hidden rounded-2xl border border-[#fcfcff] bg-[#6190e243] hover:border-[#3365E1]/40 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-[#3380FF]/5">
//       {/* 🔥 MARQUEE SECTION */}
//       {/* bg-[#6190e243]  */}
//       <div className="relative h-44 bg-white overflow-hidden">
//         {/* Ambient glow */}
//         <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(51,128,255,0.15),transparent_40%)]" />

//         {/* Edge fades */}
//         <div className="absolute top-0 left-0 w-full h-12 z-10 pointer-events-none" />
//         <div className="absolute bottom-0 left-0 w-full h-12 z-10 pointer-events-none" />

//         {/* Empty state fallback */}
//         {previewTools.length === 0 && (
//           <div className="absolute inset-0 flex items-center justify-center">
//             <p className="text-[#3981FA] text-sm animate-pulse"> No tools yet</p>
//           </div>
//         )}

//         {/* DOUBLE MARQUEE (only if tools exist) */}
//         {previewTools.length > 0 && (
//           <div className="absolute inset-0 overflow-hidden py-5">
//             {/* ROW 1 - left to right */}
//             <div className="marquee-row mb-4">
//               <div className="marquee-track flex gap-3">
//                 {marqueeTools.map((tool, idx) => (
//                   <button
//                     key={`${tool._id}-top-${idx}`}
//                     onClick={() => handleToolClick(tool._id)}
//                     className="pill-card group/pill"
//                     title={tool.name}
//                   >
//                     <img
//                       src={imageErrors[tool._id] ? `` : tool.image?.url}
//                       alt={tool.name}
//                       className="w-5 h-5 rounded-full object-cover flex-shrink-0"
//                       onError={() => handleImageError(tool._id)}
//                     />
//                     <span className="text-sm text-[#3981FA] whitespace-nowrap hidden sm:inline">
//                       {tool.name}
//                     </span>
//                     {/* Mobile: only show first 2 letters if needed */}
//                     <span className="text-sm text-[#3981FA] whitespace-nowrap sm:hidden">
//                       {tool.name.slice(0, 2)}
//                     </span>
//                   </button>
//                 ))}
//               </div>
//             </div>

//             {/* ROW 2 - right to left (reverse) */}
//             <div className="marquee-row reverse">
//               <div className="marquee-track flex gap-3">
//                 {marqueeTools.map((tool, idx) => (
//                   <button
//                     key={`${tool._id}-bottom-${idx}`}
//                     onClick={() => handleToolClick(tool._id)}
//                     className="pill-card group/pill"
//                     title={tool.name}
//                   >
//                     <img
//                       src={imageErrors[tool._id] ? `https://ui-avatars.com/api/?name=${encodeURIComponent(tool.name)}&background=3380FF&color=fff&bold=true&size=24` : tool.image?.url}
//                       alt={tool.name}
//                       className="w-5 h-5 rounded-full object-cover flex-shrink-0"
//                       onError={() => handleImageError(tool._id)}
//                     />
//                     <span className="text-sm text-[#3981FA] whitespace-nowrap hidden sm:inline">
//                       {tool.name}
//                     </span>
//                     <span className="text-sm text-[#3981FA] whitespace-nowrap sm:hidden">
//                       {tool.name.slice(0, 2)}
//                     </span>
//                   </button>
//                 ))}
//               </div>
//             </div>
//           </div>
//         )}

//         {/* CATEGORY NAME & STATS */}
//         <div className="absolute left-4 bottom-2 z-20">
//           <h3 className="text-white text-xl font-semibold capitalize tracking-tight">
//             {category.name}
//           </h3>
//           <p className="text-xs text-gray-400 mt-1 flex items-center gap-1">
//             <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#3380FF]" />
//             {previewTools.length}+ AI Tools
//           </p>
//         </div>
//       </div>

//       {/* BODY */}
//       <div className="p-4">
//         {showCreator && (
//           <p className="text-xs text-gray-500 mb-4 truncate">
//             Created by{" "}
//             <span className="text-gray-300 font-medium">
//               {category.createdBy?.email?.split("@")[0] || "Anonymous"}
//             </span>
//           </p>
//         )}

//         {/* ACTION BUTTONS */}
//         <div className="flex gap-2 flex-wrap">
//           <button
//             onClick={() =>
//               navigate(`/categories/${category._id}/folders`, {
//                 state: { name: category.name },
//               })
//             }
//             className="px-4 py-2 rounded-xl bg-[#3380FF] hover:bg-[#2770E6] text-white text-sm font-medium transition-all duration-200 active:scale-95 shadow-sm hover:shadow-md"
//           >
//             View All
//           </button>

//           {canEdit && (
//             <button
//               onClick={() => setOpen(true)}
//               className="px-4 py-2 rounded-xl border border-[#2770E6] hover:border-[#3380FF] text-sm text-[#2770E6] transition-all duration-200 hover:bg-[#3380FF]/10"
//             >
//               Edit
//             </button>
//           )}

//           {canDelete && (
//             <button
//               onClick={handleDelete}
//               className="px-4 py-2 rounded-xl bg-red-500/90 hover:bg-red-600 text-sm text-white transition-all duration-200 active:scale-95"
//             >
//               Delete
//             </button>
//           )}
//         </div>
//       </div>

//       {/* MODAL */}
//       <CreateAndEditCategoryModal
//         open={open}
//         onClose={() => setOpen(false)}
//         editData={category}
//       />
//         {/* rgba(255, 255, 255, 0.05) */}
//       {/* GLOBAL STYLES */}
//       <style>{`
//         .marquee-row {
//           display: flex;
//           width: max-content;
//           animation: marqueeLeft 28s linear infinite;
//           will-change: transform;
//         }

//         .marquee-row.reverse {
//           animation: marqueeRight 28s linear infinite;
//         }

//         .marquee-track {
//           display: flex;
//           width: max-content;
//           gap: 0.75rem;
//         }

//         .pill-card {
//           display: flex;
//           align-items: center;
//           gap: 10px;
//           padding: 8px 16px;
//           border-radius: 999px;
//           background:white;
//           border: 1px solid #3981FA;
//           backdrop-filter: blur(8px);
//           cursor: pointer;
//           transition: all 0.2s ease-out;
//           min-width: max-content;

//         }

//         .pill-card:hover {
//           transform: translateY(-2px);
//           background: rgba(255, 255, 255, 0.12);
//           border-color: rgba(51, 128, 255, 0.5);
//           box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
//         }

//         .pill-card:active {
//           transform: scale(0.97);
//         }

//         @keyframes marqueeLeft {
//           from {
//             transform: translateX(0);
//           }
//           to {
//             transform: translateX(-33.333%);
//           }
//         }

//         @keyframes marqueeRight {
//           from {
//             transform: translateX(-33.333%);
//           }
//           to {
//             transform: translateX(0);
//           }
//         }

//         /* Pause animation on hover for better readability */
//         .group:hover .marquee-row {
//           animation-play-state: paused;
//         }

//         /* Responsive: smaller text/padding on very narrow screens */
//         @media (max-width: 480px) {
//           .pill-card {
//             padding: 6px 12px;
//             gap: 6px;
//           }
//           .pill-card span {
//             font-size: 11px;
//           }
//           .marquee-row {
//             animation-duration: 22s;
//           }
//         }
//       `}</style>
//     </div>
//   );
// }

// export default CategoryCard;

// import { useDispatch, useSelector } from "react-redux";
// import { deleteCategory } from "../../features/categories/categorySlice";
// import { getCategoryPreviewTools } from "../../features/tools/toolSlice";
// import { useToast } from "../../context/ToastContext";
// import { useState, useEffect, useMemo } from "react";
// import { useNavigate } from "react-router-dom";
// import CreateAndEditCategoryModal from "../admin/CreateAndEditCategoryModal";

// function CategoryCard({ category, mode, showCreator = true }) {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const { showToast } = useToast();

//   const user = useSelector((state) => state.auth.user);
//   const preview = useSelector((state) => state.tools.categoryPreview?.[category._id]);

//   const previewTools = preview?.tools || [];
//   const [open, setOpen] = useState(false);
//   const [imageErrors, setImageErrors] = useState({});
//   const [hoveredToolId, setHoveredToolId] = useState(null);
//   const [isDeleting, setIsDeleting] = useState(false);

//   useEffect(() => {
//     dispatch(getCategoryPreviewTools(category._id));
//   }, [dispatch, category._id]);

//   const createdById =
//     typeof category.createdBy === "object" ? category.createdBy?._id : category.createdBy;
//   const isOwner = user?._id?.toString() === createdById?.toString();
//   const canEdit = mode === "superadmin" || (mode === "admin" && isOwner);
//   const canDelete = mode === "superadmin";

//   // Duplicate tools for seamless marquee (enough for smooth loop)
//   const marqueeTools = useMemo(() => {
//     if (previewTools.length === 0) return [];
//     return [...previewTools, ...previewTools, ...previewTools];
//   }, [previewTools]);

//   const handleDelete = async () => {
//     setIsDeleting(true);
//     try {
//       await dispatch(deleteCategory(category._id)).unwrap();
//       showToast("Category deleted successfully", "success");
//     } catch (err) {
//       showToast(err || "Delete failed", "error");
//     } finally {
//       setIsDeleting(false);
//     }
//   };

//   const handleImageError = (toolId) => {
//     setImageErrors((prev) => ({ ...prev, [toolId]: true }));
//   };

//   // Navigate to tool page
//   const handleToolClick = (toolId) => {
//     if (toolId) navigate(`/tools/${toolId}`);
//   };

//   return (
//     <div className="group relative overflow-hidden rounded-3xl border border-[#fcfcff] bg-gradient-to-br from-[#6190e243] to-[#3165D9]/15 hover:border-[#3365E1]/60 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-[#3380FF]/10">
//       {/* ✨ ANIMATED BACKGROUND GRADIENT */}
//       <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-[#3380FF]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

//       {/* 🔥 MARQUEE SECTION */}
//       <div className="relative h-48 bg-white overflow-hidden">
//         {/* Animated ambient glow with pulse */}
//         <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(51,128,255,0.15),transparent_40%)] group-hover:bg-[radial-gradient(circle_at_top_right,rgba(51,128,255,0.25),transparent_40%)] transition-all duration-500" />

//         {/* Subtle grid pattern */}
//         <div className="absolute inset-0 opacity-[0.03] group-hover:opacity-[0.06] transition-opacity duration-500"
//           style={{
//             backgroundImage: "linear-gradient(45deg, #3380FF 1px, transparent 1px), linear-gradient(-45deg, #3380FF 1px, transparent 1px)",
//             backgroundSize: "30px 30px",
//           }}
//         />

//         {/* Edge fades with smoother gradient */}
//         <div className="absolute top-0 left-0 w-full h-16 z-10 pointer-events-none bg-gradient-to-b from-white via-white/50 to-transparent" />
//         <div className="absolute bottom-0 left-0 w-full h-16 z-10 pointer-events-none bg-gradient-to-t from-white via-white/50 to-transparent" />

//         {/* Empty state fallback with animation */}
//         {previewTools.length === 0 && (
//           <div className="absolute inset-0 flex items-center justify-center">
//             <div className="flex flex-col items-center gap-2">
//               <div className="w-8 h-8 border-2 border-[#3981FA] border-t-transparent rounded-full animate-spin" />
//               <p className="text-[#3981FA] text-sm font-medium">No tools yet</p>
//             </div>
//           </div>
//         )}

//         {/* DOUBLE MARQUEE (only if tools exist) */}
//         {previewTools.length > 0 && (
//           <div className="absolute inset-0 overflow-hidden py-4">
//             {/* ROW 1 - left to right */}
//             <div className="marquee-row mb-6">
//               <div className="marquee-track flex gap-4">
//                 {marqueeTools.map((tool, idx) => (
//                   <button
//                     key={`${tool._id}-top-${idx}`}
//                     onClick={() => handleToolClick(tool._id)}
//                     onMouseEnter={() => setHoveredToolId(tool._id)}
//                     onMouseLeave={() => setHoveredToolId(null)}
//                     className="pill-card group/pill"
//                     title={tool.name}
//                   >
//                     <div className="relative">
//                       <img
//                         src={imageErrors[tool._id] ? `` : tool.image?.url}
//                         alt={tool.name}
//                         className="w-6 h-6 rounded-full object-cover flex-shrink-0 transition-transform duration-300 group-hover/pill:scale-110"
//                         onError={() => handleImageError(tool._id)}
//                       />
//                       {hoveredToolId === tool._id && (
//                         <div className="absolute inset-0 w-6 h-6 rounded-full bg-[#3380FF]/20 animate-pulse" />
//                       )}
//                     </div>
//                     <span className="text-sm text-[#3981FA] whitespace-nowrap hidden sm:inline font-medium transition-colors duration-300">
//                       {tool.name}
//                     </span>
//                     <span className="text-sm text-[#3981FA] whitespace-nowrap sm:hidden font-medium">
//                       {tool.name.slice(0, 2).toUpperCase()}
//                     </span>
//                   </button>
//                 ))}
//               </div>
//             </div>

//             {/* ROW 2 - right to left (reverse) */}
//             <div className="marquee-row reverse">
//               <div className="marquee-track flex gap-4">
//                 {marqueeTools.map((tool, idx) => (
//                   <button
//                     key={`${tool._id}-bottom-${idx}`}
//                     onClick={() => handleToolClick(tool._id)}
//                     onMouseEnter={() => setHoveredToolId(tool._id)}
//                     onMouseLeave={() => setHoveredToolId(null)}
//                     className="pill-card group/pill"
//                     title={tool.name}
//                   >
//                     <div className="relative">
//                       <img
//                         src={imageErrors[tool._id] ? `https://ui-avatars.com/api/?name=${encodeURIComponent(tool.name)}&background=3380FF&color=fff&bold=true&size=24` : tool.image?.url}
//                         alt={tool.name}
//                         className="w-6 h-6 rounded-full object-cover flex-shrink-0 transition-transform duration-300 group-hover/pill:scale-110"
//                         onError={() => handleImageError(tool._id)}
//                       />
//                       {hoveredToolId === tool._id && (
//                         <div className="absolute inset-0 w-6 h-6 rounded-full bg-[#3380FF]/20 animate-pulse" />
//                       )}
//                     </div>
//                     <span className="text-sm text-[#3981FA] whitespace-nowrap hidden sm:inline font-medium transition-colors duration-300">
//                       {tool.name}
//                     </span>
//                     <span className="text-sm text-[#3981FA] whitespace-nowrap sm:hidden font-medium">
//                       {tool.name.slice(0, 2).toUpperCase()}
//                     </span>
//                   </button>
//                 ))}
//               </div>
//             </div>
//           </div>
//         )}

//         {/* CATEGORY NAME & STATS - Enhanced with glassmorphism */}
//         <div className="absolute left-5 bottom-1 z-20   rounded-2xl  border border-white/40 transition-all duration-300 ">
//           <h3 className="text-gray-900 text-xl font-bold capitalize tracking-tight leading-tight">
//             {category.name}
//           </h3>
//           <div className="flex items-center gap-2 mt-2">
//             <span className="inline-block w-2 h-2 rounded-full bg-gradient-to-r from-[#3380FF] to-[#2770E6] animate-pulse" />
//             <p className="text-xs text-gray-600 font-medium">
//               {previewTools.length}+ AI Tools
//             </p>
//           </div>
//         </div>
//       </div>

//       {/* BODY */}
//       <div className="p-5 relative z-10">
//         {showCreator && (
//           <div className="mb-4 p-3 rounded-xl bg-[#3380FF]/5 border border-[#3380FF]/10 transition-all duration-300 group-hover:bg-[#3380FF]/10">
//             <p className="text-xs text-gray-600">
//               Created by{" "}
//               <span className="text-[#3380FF] font-bold">
//                 {category.createdBy?.email?.split("@")[0] || "Anonymous"}
//               </span>
//             </p>
//           </div>
//         )}

//         {/* ACTION BUTTONS - Enhanced with better spacing and animations */}
//         <div className="flex gap-3 flex-wrap">
//           <button
//             onClick={() =>
//               navigate(`/categories/${category._id}/folders`, {
//                 state: { name: category.name },
//               })
//             }
//             className="flex-1 min-w-[120px] px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#3380FF] to-[#2770E6] hover:from-[#2770E6] hover:to-[#1860D6] text-white text-sm font-bold transition-all duration-300 active:scale-95 shadow-lg hover:shadow-xl hover:shadow-[#3380FF]/30 relative overflow-hidden group/btn"
//           >
//             <span className="relative z-10 flex items-center justify-center gap-2">
//               <span>View All</span>
//               <svg className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
//               </svg>
//             </span>
//             <div className="absolute inset-0 bg-white/20 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300" />
//           </button>

//           {canEdit && (
//             <button
//               onClick={() => setOpen(true)}
//               className="px-4 py-2.5 rounded-xl border-2 border-[#3380FF] hover:border-[#2770E6] text-sm text-[#3380FF] font-bold transition-all duration-300 hover:bg-[#3380FF]/10 active:scale-95 relative overflow-hidden group/edit"
//             >
//               <span className="relative z-10 flex items-center gap-2">
//                 <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
//                 </svg>
//                 Edit
//               </span>
//             </button>
//           )}

//           {canDelete && (
//             <button
//               onClick={handleDelete}
//               disabled={isDeleting}
//               className="px-4 py-2.5 rounded-xl bg-red-500/90 hover:bg-red-600 disabled:opacity-50 disabled:cursor-not-allowed text-sm text-white font-bold transition-all duration-300 active:scale-95 shadow-lg hover:shadow-red-500/30 relative overflow-hidden group/del"
//             >
//               <span className="relative z-10 flex items-center gap-2">
//                 {isDeleting ? (
//                   <>
//                     <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
//                     Deleting...
//                   </>
//                 ) : (
//                   <>
//                     <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
//                     </svg>
//                     Delete
//                   </>
//                 )}
//               </span>
//             </button>
//           )}
//         </div>
//       </div>

//       {/* MODAL */}
//       <CreateAndEditCategoryModal
//         open={open}
//         onClose={() => setOpen(false)}
//         editData={category}
//       />

//       {/* GLOBAL STYLES */}
//       <style>{`
//         .marquee-row {
//           display: flex;
//           width: max-content;
//           animation: marqueeLeft 32s linear infinite;
//           will-change: transform;
//         }

//         .marquee-row.reverse {
//           animation: marqueeRight 32s linear infinite;
//         }

//         .marquee-track {
//           display: flex;
//           width: max-content;
//           gap: 1rem;
//         }

//         .pill-card {
//           display: flex;
//           align-items: center;
//           gap: 10px;
//           padding: 10px 18px;
//           border-radius: 999px;
//           background: white;
//           border: 1.5px solid #3981FA;
//           backdrop-filter: blur(10px);
//           cursor: pointer;
//           transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
//           min-width: max-content;
//           box-shadow: 0 4px 12px rgba(51, 128, 255, 0.1);
//         }

//         .pill-card:hover {
//           transform: translateY(-3px);
//           background: rgba(255, 255, 255, 0.95);
//           border-color: rgba(51, 128, 255, 0.7);
//           box-shadow: 0 8px 20px rgba(51, 128, 255, 0.25);
//         }

//         .pill-card:active {
//           transform: scale(0.96);
//         }

//         @keyframes marqueeLeft {
//           from {
//             transform: translateX(0);
//           }
//           to {
//             transform: translateX(-33.333%);
//           }
//         }

//         @keyframes marqueeRight {
//           from {
//             transform: translateX(-33.333%);
//           }
//           to {
//             transform: translateX(0);
//           }
//         }

//         /* Pause animation on hover for better readability */
//         .group:hover .marquee-row {
//           animation-play-state: paused;
//         }

//         /* Smooth transitions for icons */
//         .group/btn svg, .group/edit svg, .group/del svg {
//           transition: transform 0.3s ease;
//         }

//         /* Responsive: smaller text/padding on very narrow screens */
//         @media (max-width: 480px) {
//           .pill-card {
//             padding: 8px 14px;
//             gap: 6px;
//           }
//           .pill-card span {
//             font-size: 12px;
//           }
//           .marquee-row {
//             animation-duration: 26s;
//           }
//         }
//       `}</style>
//     </div>
//   );
// }

// export default CategoryCard;

// gimini
import { useDispatch, useSelector } from "react-redux";
import { deleteCategory } from "../../features/categories/categorySlice";
import { getCategoryPreviewTools } from "../../features/tools/toolSlice";
import { useToast } from "../../context/ToastContext";
import { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import ConfirmModal from "../reuseable_compo/ConfirmModal";

// 💡 Added `onEdit` to the props
function CategoryCard({ category, mode, showCreator = true, onEdit }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { showToast } = useToast();

  const user = useSelector((state) => state.auth.user);
  const preview = useSelector(
    (state) => state.tools.categoryPreview?.[category._id],
  );

  const previewTools = preview?.tools || [];
  const totalTools = preview?.total || 0;
  const [imageErrors, setImageErrors] = useState({});
  const [hoveredToolId, setHoveredToolId] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  useEffect(() => {
    dispatch(getCategoryPreviewTools(category._id));
  }, [dispatch, category._id]);

  const createdById =
    typeof category.createdBy === "object"
      ? category.createdBy?._id
      : category.createdBy;
  const isOwner = user?._id?.toString() === createdById?.toString();
  const canEdit = mode === "superadmin" || (mode === "admin" && isOwner);
  const canDelete = mode === "superadmin";

  const marqueeTools = useMemo(() => {
    if (previewTools.length === 0) return [];
    return [...previewTools, ...previewTools, ...previewTools];
  }, [previewTools]);

  // const handleDelete = async () => {
  //   if (!window.confirm("Are you sure you want to delete this category?")) return;
  //   setIsDeleting(true);
  //   try {
  //     await dispatch(deleteCategory(category._id)).unwrap();
  //     showToast("Category deleted successfully", "success");
  //   } catch (err) {
  //     showToast(err || "Delete failed", "error");
  //   } finally {
  //     setIsDeleting(false);
  //   }
  // };

  const handleDelete = async () => {
    setIsDeleting(true);

    try {
      await dispatch(deleteCategory(category._id)).unwrap();

      showToast("Category deleted successfully", "success");
    } catch (err) {
      showToast(err || "Delete failed", "error");
    } finally {
      setIsDeleting(false);

      setDeleteModalOpen(false);
    }
  };

  const handleImageError = (toolId) => {
    setImageErrors((prev) => ({ ...prev, [toolId]: true }));
  };

  const handleToolClick = (toolId) => {
    if (toolId) navigate(`/tools/${toolId}`);
  };

  return (
    <div className="group relative overflow-hidden rounded-3xl border border-[#fcfcff] bg-gradient-to-br from-[#6190e243] to-[#3165D9]/15 hover:border-[#3365E1]/60 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-[#3380FF]/10">
      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-[#3380FF]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      {/* MARQUEE SECTION */}
      <div className="relative h-48 bg-white overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(51,128,255,0.15),transparent_40%)] group-hover:bg-[radial-gradient(circle_at_top_right,rgba(51,128,255,0.25),transparent_40%)] transition-all duration-500" />

        <div
          className="absolute inset-0 opacity-[0.03] group-hover:opacity-[0.06] transition-opacity duration-500"
          style={{
            backgroundImage:
              "linear-gradient(45deg, #3380FF 1px, transparent 1px), linear-gradient(-45deg, #3380FF 1px, transparent 1px)",
            backgroundSize: "30px 30px",
          }}
        />

        <div className="absolute top-0 left-0 w-full h-16 z-10 pointer-events-none bg-gradient-to-b from-white via-white/50 to-transparent" />
        <div className="absolute bottom-0 left-0 w-full h-16 z-10 pointer-events-none bg-gradient-to-t from-white via-white/50 to-transparent" />

        {previewTools.length === 0 && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="flex flex-col items-center gap-2">
              <div className="w-8 h-8 border-2 border-[#3981FA] border-t-transparent rounded-full animate-spin" />
              <p className="text-[#3981FA] text-sm font-medium">No tools yet</p>
            </div>
          </div>
        )}

        {previewTools.length > 0 && (
          <div className="absolute inset-0 overflow-hidden py-4">
            <div className="marquee-row mb-6">
              <div className="marquee-track flex gap-4">
                {marqueeTools.map((tool, idx) => (
                  <button
                    key={`${tool._id}-top-${idx}`}
                    onClick={() => handleToolClick(tool._id)}
                    onMouseEnter={() => setHoveredToolId(tool._id)}
                    onMouseLeave={() => setHoveredToolId(null)}
                    className="pill-card group/pill"
                    title={tool.name}
                  >
                    <div className="relative">
                      <img
                        src={
                          imageErrors[tool._id]
                            ? `https://ui-avatars.com/api/?name=${encodeURIComponent(tool.name)}&background=3380FF&color=fff&bold=true&size=24`
                            : tool.image?.url
                        }
                        alt={tool.name}
                        className="w-6 h-6 rounded-full object-cover flex-shrink-0 transition-transform duration-300 group-hover/pill:scale-110"
                        onError={() => handleImageError(tool._id)}
                      />
                      {hoveredToolId === tool._id && (
                        <div className="absolute inset-0 w-6 h-6 rounded-full bg-[#3380FF]/20 animate-pulse" />
                      )}
                    </div>
                    <span className="text-sm text-[#3981FA] whitespace-nowrap hidden sm:inline font-medium transition-colors duration-300">
                      {tool.name}
                    </span>
                    <span className="text-sm text-[#3981FA] whitespace-nowrap sm:hidden font-medium">
                      {tool.name.slice(0, 2).toUpperCase()}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            <div className="marquee-row reverse">
              <div className="marquee-track flex gap-4">
                {marqueeTools.map((tool, idx) => (
                  <button
                    key={`${tool._id}-bottom-${idx}`}
                    // onClick={() => handleToolClick(tool._id)}
                    onMouseEnter={() => setHoveredToolId(tool._id)}
                    onMouseLeave={() => setHoveredToolId(null)}
                    className="pill-card group/pill"
                    title={tool.name}
                  >
                    <div className="relative">
                      <img
                        src={
                          imageErrors[tool._id]
                            ? `https://ui-avatars.com/api/?name=${encodeURIComponent(tool.name)}&background=3380FF&color=fff&bold=true&size=24`
                            : tool.image?.url
                        }
                        alt={tool.name}
                        className="w-6 h-6 rounded-full object-cover flex-shrink-0 transition-transform duration-300 group-hover/pill:scale-110"
                        onError={() => handleImageError(tool._id)}
                      />
                      {hoveredToolId === tool._id && (
                        <div className="absolute inset-0 w-6 h-6 rounded-full bg-[#3380FF]/20 animate-pulse" />
                      )}
                    </div>
                    <span className="text-sm text-[#3981FA] whitespace-nowrap hidden sm:inline font-medium transition-colors duration-300">
                      {tool.name}
                    </span>
                    <span className="text-sm text-[#3981FA] whitespace-nowrap sm:hidden font-medium">
                      {tool.name.slice(0, 2).toUpperCase()}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* CATEGORY NAME & STATS */}
        <div className="absolute left-5 bottom-1 z-20 rounded-2xl border border-white/40 transition-all duration-300">
          <h3 className="text-gray-900 text-xl font-bold capitalize tracking-tight leading-tight">
            {category.name}
          </h3>
          <div className="flex items-center gap-2 mt-2">
            <span className="inline-block w-2 h-2 rounded-full bg-gradient-to-r from-[#3380FF] to-[#2770E6] animate-pulse" />
            <p className="text-xs text-gray-600 font-medium">
              {/* {previewTools.length}+ Web Tools */}
              {totalTools}+ Web Tools
            </p>
          </div>
        </div>
      </div>

      {/* BODY */}
      <div className="p-5 relative z-10">
        {showCreator && (
          <div className="mb-4 p-3 rounded-xl bg-[#3380FF]/5 border border-[#3380FF]/10 transition-all duration-300 group-hover:bg-[#3380FF]/10">
            <p className="text-xs text-gray-600">
              Created by{" "}
              <span className="text-[#3380FF] font-bold">
                {category.createdBy?.email?.split("@")[0] || "Anonymous"}
              </span>
            </p>
          </div>
        )}

        {/* ACTION BUTTONS */}
        <div className="flex gap-3 flex-wrap">
          <button
            onClick={() =>
              navigate(`/categories/${category._id}/folders`, {
                state: { name: category.name },
              })
            }
            className="flex-1 min-w-[120px] px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#3380FF] to-[#2770E6] hover:from-[#2770E6] hover:to-[#1860D6] text-white text-sm font-bold transition-all duration-300 active:scale-95 shadow-lg hover:shadow-xl hover:shadow-[#3380FF]/30 relative overflow-hidden group/btn"
          >
            <span className="relative z-10 flex items-center justify-center gap-2">
              <span>View All</span>
              <svg
                className="w-4 h-4 transition-transform group-hover/btn:translate-x-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                />
              </svg>
            </span>
            <div className="absolute inset-0 bg-white/20 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300" />
          </button>

          {canEdit && (
            <button
              onClick={() => onEdit(category)} // 💡 Passes the current category details back up to the parent layer
              className="px-4 py-2.5 rounded-xl border-2 border-[#3380FF] hover:border-[#2770E6] text-sm text-[#3380FF] font-bold transition-all duration-300 hover:bg-[#3380FF]/10 active:scale-95 relative overflow-hidden group/edit"
            >
              <span className="relative z-10 flex items-center gap-2">
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                  />
                </svg>
                Edit
              </span>
            </button>
          )}

          {canDelete && (
            <button
              // onClick={handleDelete}
              onClick={() => setDeleteModalOpen(true)}
              disabled={isDeleting}
              className="px-4 py-2.5 rounded-xl bg-red-500/90 hover:bg-red-600 disabled:opacity-50 disabled:cursor-not-allowed text-sm text-white font-bold transition-all duration-300 active:scale-95 shadow-lg hover:shadow-red-500/30 relative overflow-hidden group/del"
            >
              <span className="relative z-10 flex items-center gap-2">
                {isDeleting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Deleting...
                  </>
                ) : (
                  <>
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                      />
                    </svg>
                    Delete
                  </>
                )}
              </span>
            </button>
          )}
        </div>
      </div>
      <ConfirmModal
        open={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={handleDelete}
        title="Delete Category"
        message={`Are you sure you want to delete "${category.name}" category?`}
        confirmText="Delete"
        cancelText="Cancel"
        type="danger"
      />
      <style>{`
        .marquee-row { display: flex; width: max-content; animation: marqueeLeft 32s linear infinite; will-change: transform; }
        .marquee-row.reverse { animation: marqueeRight 32s linear infinite; }
        .marquee-track { display: flex; width: max-content; gap: 1rem; }
        .pill-card { display: flex; align-items: center; gap: 10px; padding: 10px 18px; border-radius: 999px; background: white; border: 1.5px solid #3981FA; backdrop-filter: blur(10px); cursor: pointer; transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1); min-width: max-content; box-shadow: 0 4px 12px rgba(51, 128, 255, 0.1); }
        .pill-card:hover { transform: translateY(-3px); background: rgba(255, 255, 255, 0.95); border-color: rgba(51, 128, 255, 0.7); box-shadow: 0 8px 20px rgba(51, 128, 255, 0.25); }
        .pill-card:active { transform: scale(0.96); }
        @keyframes marqueeLeft { from { transform: translateX(0); } to { transform: translateX(-33.333%); } }
        @keyframes marqueeRight { from { transform: translateX(-33.333%); } to { transform: translateX(0); } }
        .group:hover .marquee-row { animation-play-state: paused; }
        .group/btn svg, .group/edit svg, .group/del svg { transition: transform 0.3s ease; }
        @media (max-width: 480px) {
          .pill-card { padding: 8px 14px; gap: 6px; }
          .pill-card span { font-size: 12px; }
          .marquee-row { animation-duration: 26s; }
        }
      `}</style>
    </div>
  );
}

export default CategoryCard;
