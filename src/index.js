import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import "react-toastify/dist/ReactToastify.css";
import App from "./App";
import "./index.css";
// import { store } from "./store";
import store from "./storert";
import { ToastContainer } from "react-toastify";

// const root = ReactDOM.createRoot(
//   document.getElementById("root") as HTMLElement
// );
const root = ReactDOM.createRoot(document.getElementById("root"));
// root.render(
//   <Provider store={store}>
//     <PersistGate loading={null} persistor={persistor}>
//       <App />
//       {/*  limit={1} */}
//       <ToastContainer autoClose={500} closeOnClick></ToastContainer>
//     </PersistGate>
//   </Provider>,
//   document.getElementById("root"),
// );

// Redux Toolkit 저장소 공급
root.render(
  <Provider store={store}>
    <App />
    <ToastContainer autoClose={500} closeOnClick></ToastContainer>
  </Provider>,
);
