import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "./store";

// const root = ReactDOM.createRoot(
//   document.getElementById("root") as HTMLElement
// );
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <App />
      {/*  limit={1} */}
      <ToastContainer autoClose={500} closeOnClick></ToastContainer>
    </PersistGate>
  </Provider>,
  document.getElementById("root"),
);
