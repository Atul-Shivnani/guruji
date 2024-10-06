import "./index.css";
import Personal from "./personal";
import { Routes, Route } from "react-router-dom";
import Address from "./address";
import Dots from "./components/dots";
import { useLocation, useNavigate } from "react-router-dom";
import Confirmation from "./confirmation";
import Success from "./success";
import Users from "./users";
import Profile from "./profile";

function App() {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  // List of valid routes where the step buttons and dots should appear
  const stepsRoutes = ["/", "/step1", "/step2", "/step3"];

  return (
    <div className="bg-bg h-screen flex flex-col justify-center items-center bg-cover px-4 lg:px-12">
      <div className="flex justify-between w-full top-0 fixed p-4">
        <img
          className="cursor-pointer rounded-xl w-12 h-12 p-1 bg-purple-200 border border-purple-300 transition-all ease-in-out delay-75 hover:bg-purple-300 shadow-xl hover:border-purple-400 hover:shadow-md"
          src="/night.png"
          alt="Night Mode"
          onClick={() => {
            // Implement dark mode toggle logic here
          }}
        />

        <img
          className="cursor-pointer rounded-xl w-14 h-14 p-1 bg-purple-200 border border-purple-300 transition-all ease-in-out delay-75 hover:bg-purple-300 shadow-xl hover:border-purple-400 hover:shadow-md"
          src="/sun.png"
          alt="Day Mode"
          onClick={() => {
            // Implement light mode toggle logic here
          }}
        />
      </div>

      <Routes>
        <Route path="/" element={<Users />} />
        <Route path="/profile/:id" element={<Profile />} />
        <Route path="/step1" element={<Personal />} />
        <Route path="/step2" element={<Address />} />
        <Route path="/step3" element={<Confirmation />} />
        <Route path="/success" element={<Success />} />
      </Routes>

      {/* Conditionally render the step buttons and dots */}
      {stepsRoutes.includes(pathname) && (
        <div className="fixed bottom-4 flex justify-center items-center gap-2 md:gap-6 lg:gap-8 max-w-full w-full px-4">
          {/* Step 1 button */}
          <button
            onClick={() => navigate("/")}
            className={`transition-all ease-in-out delay-75 p-1 md:p-2 lg:p-3 border-2 rounded-full 
              ${
                pathname === "/"
                  ? "bg-purple-300 border-purple-400 shadow-xl hover:shadow-md"
                  : "bg-purple-200 border-purple-300 hover:bg-purple-300 hover:border-purple-400 shadow-xl hover:shadow-md"
              } text-xs md:text-sm lg:text-base`}
          >
            Step 1: Personal Information
          </button>
          <Dots />

          {/* Step 2 button */}
          <button
            onClick={() => navigate("/step2")}
            className={`transition-all ease-in-out delay-75 p-1 md:p-2 lg:p-3 border-2 rounded-full 
              ${
                pathname === "/step2"
                  ? "bg-purple-300 border-purple-400 shadow-xl hover:shadow-md"
                  : "bg-purple-200 border-purple-300 hover:bg-purple-300 hover:border-purple-400 shadow-xl hover:shadow-md"
              } text-xs md:text-sm lg:text-base`}
          >
            Step 2: Address Information
          </button>
          <Dots />

          {/* Step 3 button */}
          <button
            onClick={() => navigate("/step3")}
            className={`transition-all ease-in-out delay-75 p-1 md:p-2 lg:p-3 border-2 rounded-full 
              ${
                pathname === "/step3"
                  ? "bg-purple-300 border-purple-400 shadow-xl hover:shadow-md"
                  : "bg-purple-200 border-purple-300 hover:bg-purple-300 hover:border-purple-400 shadow-xl hover:shadow-md"
              } text-xs md:text-sm lg:text-base`}
          >
            Step 3: Confirmation
          </button>
        </div>
      )}
    </div>
  );
}

export default App;
