import "core-js/stable";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import store from "./lib/store";
import { Provider } from "react-redux";

import AppRoutes from "./routes/_routes";

const container = document.getElementById("root");
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <HelmetProvider>
          <AppRoutes />
        </HelmetProvider>
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);
