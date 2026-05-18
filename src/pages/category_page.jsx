

import CategoryList from "../components/reuseable_compo/CategoryList.jsx";


function Category_page() {
 

  return (
      <>
      <h1>Category Tools</h1>
           <CategoryList mode="user" showCreator={false} />
      </>
      

  );
}

export default Category_page;