import React, { useState, useEffect } from "react";
import { createRoot } from "react-dom/client";
import GatewayForm from "./components/GatewayForm";
import "./input.css";

const App = () => {
  //const year = new Date().getFullYear();
  const [gateways, setGateways] = useState<Gateway[]>();

  const getGateways = async () => {
    const response = await fetch("http://localhost:3001/gateways");
    console.log(response);
    const gateways = await response.json();
    console.log("got: ", gateways);
    setGateways(gateways);
  };

  return (
    <main className="container flex flex-col items-center justify-start min-h-screen">
      <h1 className="mt-8 text-xl font-bold">Gateways</h1>
      <button
        onClick={getGateways}
        className="p-2 mx-auto border border-black rounded-lg"
      >
        Get all
      </button>
      {gateways &&
        (Object.keys(gateways).length === 0 ? (
          <p>No results</p>
        ) : (
          <ul>
            {Object.entries(gateways).map(([name, gateway]) => (
              <li key={gateway.name}>
                {gateway.name} {gateway.ip}
              </li>
            ))}
          </ul>
        ))}
      <GatewayForm />
    </main>
  );
};

const domContainer = document.getElementById("react-code");
const root = createRoot(domContainer!); // createRoot(container!) if you use TypeScript
root.render(<App />);
