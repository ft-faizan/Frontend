import CategoryList from "../components/reuseable_compo/CategoryList.jsx";

function Category_page() {
  return (
    <>
      <div className=" h-[90vh] overflow-y-scroll p-5">
        <CategoryList mode="user" showCreator={false} />
      </div>
    </>
  );
}

export default Category_page;
