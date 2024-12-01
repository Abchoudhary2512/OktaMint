import { React, StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { GoogleOAuthProvider } from "@react-oauth/google";

import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
const GOOGLE_CLIENT_ID =
  "328722015384-4oii9dns0vf8ri8i7ku4hiui5l1tgfr6.apps.googleusercontent.com";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      <App />
    </GoogleOAuthProvider>
  </StrictMode>
);
