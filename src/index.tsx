// src/index.tsx

import React from "react";
import ReactDOM from "react-dom/client";
import "../styles/index.css";

import Button from "@mui/material/Button";

export default function ButtonUsage() {
  return <Button variant="contained">Hello world</Button>;
}

function Index() {
  return (
    <>
      <Button variant="contained">Hello world</Button>
      <div className="bg-gray-400">Hello, World!</div>
    </>
  );
}

const rootDiv = document.createElement("div");
document.body.appendChild(rootDiv);
const root = ReactDOM.createRoot(rootDiv);
root.render(<Index />);
