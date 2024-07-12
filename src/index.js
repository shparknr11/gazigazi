import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
// const root = ReactDOM.createRoot(
//   document.getElementById("root") as HTMLElement
// );
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <>
    <App />
    <ToastContainer autoClose={500}></ToastContainer>
  </>,
);
