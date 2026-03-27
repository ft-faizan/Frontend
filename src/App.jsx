import App_Routes from "./routes/app_routes.jsx";
import ThemeToggle from "./components/dark_light_compo/ThemeToggle.jsx";
function App() {
  return (
    <>
      {/* <div>
        <ThemeToggle />
        <h1 className="text-3xl font-bold underline text-red-600 p-10 dark:text-green-300">
          Frontend
        </h1>
      </div> */}
      <App_Routes />
    </>
  );
}

export default App;
