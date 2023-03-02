import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import NameList from "./components/NameList";

export const URL = process.env.REACT_APP_SERVER_URL;

function App() {
  return (
    <div className="app">
      <div className="task-container">
        <NameList />
      </div>
      <ToastContainer />
    </div>
  );
}

export default App;
