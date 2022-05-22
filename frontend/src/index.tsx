import React, { useState, useEffect } from "react";
import { createRoot } from "react-dom/client";
import GatewayForm from "./components/GatewayForm";
import GatewayButton from "./components/GatewayButton";
import "./input.css";

const App = () => {
  const [gateways, setGateways] = useState<Gateway[]>();

  useEffect(() => {
    fetch("http://localhost:3001/gateway/list")
      .then((response) => response.json())
      .then((data) => setGateways(data));
  }, []);

  const getGateways = async () => {
    const response = await fetch("http://localhost:3001/gateway/list");
    const gateways = await response.json();
    setGateways(gateways);
  };

  return (
    <main className="container flex flex-col items-center justify-start w-5/6 min-h-screen bg-dark text-light sm:w-80">
      <h1 className="mt-8 text-xl font-bold text-primary">Add gateway</h1>
      <GatewayForm />
      <h1 className="mt-2 text-xl font-bold text-primary">List</h1>
      <p>Touch boxes to show more info. "X" button to go back</p>
      <ul className="flex flex-col items-center justify-start w-full my-2">
        {gateways &&
          (Object.keys(gateways).length === 0 ? (
            <p className="text-alert">No results</p>
          ) : (
            Object.entries(gateways).map(([name, gateway]) => (
              <GatewayButton gateway={gateway} key={gateway.id} />
            ))
          ))}
        <button
          onClick={getGateways}
          className="w-full p-2 mx-auto border rounded-lg border-warning hover:bg-warning hover:text-primary"
        >
          ✨ Refresh list ✨
        </button>
      </ul>
    </main>
  );
};

const domContainer = document.getElementById("react-code");
const root = createRoot(domContainer!);
root.render(<App />);
