import React from "react";
import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./index.scss";
import App from "./App";
import "./i18n";
import reportWebVitals from "./reportWebVitals";
import "bootstrap/dist/css/bootstrap.min.css";

// Créer une instance de QueryClient
const queryClient = new QueryClient();

const Root = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="App">
        <App />
      </div>
    </QueryClientProvider>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Root />);

reportWebVitals();
