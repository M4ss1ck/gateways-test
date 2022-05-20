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
    <main className="container flex flex-col items-center justify-start min-h-screen">
      <h1 className="mt-8 text-xl font-bold">Gateways</h1>
      <button
        onClick={getGateways}
        className="p-2 mx-auto border border-black rounded-lg"
      >
        Refresh list
      </button>
      <ul className="w-full">
        <li className="flex flex-row items-center font-bold justify-evenly">
          <span className="w-1/4 text-center">ID</span>
          <span className="w-1/4 text-center">Name</span>
          <span className="w-1/4 text-center">IP</span>
          <span className="w-1/4 text-center">Peripherals</span>
        </li>
        <hr className="bg-black" />
        {gateways &&
          (Object.keys(gateways).length === 0 ? (
            <p>No results</p>
          ) : (
            Object.entries(gateways).map(([name, gateway]) => (
              <GatewayButton gateway={gateway} key={gateway.id} />
            ))
          ))}
        <GatewayForm />
      </ul>
    </main>
  );
};

const domContainer = document.getElementById("react-code");
const root = createRoot(domContainer!); // createRoot(container!) if you use TypeScript
root.render(<App />);
