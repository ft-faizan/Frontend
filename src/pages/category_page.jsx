

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getTools } from "../features/tools/toolSlice.js"; // ❌ removed deleteTool

function Category_page() {
  const dispatch = useDispatch();
  const { tools, loading } = useSelector((state) => state.tools);

  const { id: categoryId } = useParams();

  useEffect(() => {
    if (categoryId) {
      dispatch(getTools({ category: categoryId }));
    }
  }, [dispatch, categoryId]);

  return (
    <div>
      <h1>Category Tools</h1>

      {loading && <p>Loading...</p>}

      {tools.map((tool) => (
        <div key={tool._id}>
          <h3>{tool.name}</h3>
          <p>Category: {tool.category?.name}</p>

          {/* ❌ Delete button removed */}
        </div>
      ))}
    </div>
  );
}

export default Category_page;