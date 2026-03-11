import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import "react-loading-skeleton/dist/skeleton.css";
import "./index.css";
import App from "./App.tsx";
import { store } from "./store/store";

createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <App />
  </Provider>,
);
