import { useEffect } from "react";
import "./App.css";
import buildStanfordRobot from "./components/Stanford";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Panel from "./components/Panel";

function App() {
  useEffect(() => {
    // build stanford robot on webapp mount
    buildStanfordRobot();
  }, []);

  return (
    <div className="App">
      {/* our canvas for manipulating stanford robot */}
      <canvas id="myCanvas"></canvas>
      {/* panel for adjust object's coordination which will be tracked by robot */}
      <Panel />
      {/* toast message container for limit's error messages  */}
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
