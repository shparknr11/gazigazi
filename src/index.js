import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { Provider } from "react-redux";
import store from "./store";

// const root = ReactDOM.createRoot(
//   document.getElementById("root") as HTMLElement
// );
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <App />
      {/*  limit={1} */}
    <ToastContainer autoClose={500} closeOnClick></ToastContainer>
  </Provider>,
);