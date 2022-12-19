import { useEffect } from "react";
import "./App.css";
import buildStanfordRobot from "./components/Stanford";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Panel from "./components/Panel";

function App() {
  useEffect(() => {
    buildStanfordRobot();
  }, []);

  return (
    <div className="App">
      <canvas id="myCanvas"></canvas>
      <Panel />
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </div>
  );
}

export default App;
