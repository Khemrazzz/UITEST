"use client";

import { ZapexProvider } from "./ZapexContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ZapexProviders = ({ children }) => {
  return (
    <ZapexProvider>
      {children}
      <ToastContainer position='top-right' newestOnTop theme='colored' autoClose={2500} />
    </ZapexProvider>
  );
};

export default ZapexProviders;
