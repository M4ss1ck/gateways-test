import React, { useState, useEffect } from "react";
import { createRoot } from "react-dom/client";
import GatewayForm from "./components/GatewayForm";
import GatewayButton from "./components/GatewayButton";
import "./input.css";

const App = () => {
  //const year = new Date().getFullYear();
  const [gateways, setGateways] = useState<Gateway[]>();

  useEffect(() => {
    fetch("http://localhost:3001/gateway/list")
      .then((response) => response.json())
      .then((data) => setGateways(data));
  }, []);

  const getGateways = async () => {
    const response = await fetch("http://localhost:3001/gateway/list");
    console.log(response);
    const gateways = await response.json();
    console.log("got: ", gateways);
    setGateways(gateways);
  };

  return (
    <main className="container flex flex-col items-center justify-start min-h-screen max-w-prose bg-dark text-light">
      <h1 className="mt-8 text-xl font-bold text-primary">Add gateway</h1>
      <GatewayForm />
      <h1 className="mt-8 text-xl font-bold text-primary">List</h1>
      <p>Touch boxes to show more info. "X" button to go back</p>
      <ul className="flex flex-col items-center justify-start w-full my-2">
        {gateways &&
          (Object.keys(gateways).length === 0 ? (
            <p>No results</p>
          ) : (
            Object.entries(gateways).map(([name, gateway]) => (
              <GatewayButton gateway={gateway} key={gateway.id} />
            ))
          ))}
        <button
          onClick={getGateways}
          className="p-2 mx-auto border rounded-lg border-warning hover:bg-warning hover:text-primary"
        >
          Refresh list
        </button>
      </ul>
    </main>
  );
};

const domContainer = document.getElementById("react-code");
const root = createRoot(domContainer!);
root.render(<App />);
