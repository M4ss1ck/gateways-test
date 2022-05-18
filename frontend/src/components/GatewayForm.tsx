import React, { useState } from "react";
import PeripheralForm from "./PeripheralForm";

const GatewayForm = () => {
  const [showNew, setShowNew] = useState(false);
  const [name, setName] = useState("");
  const [ip, setIp] = useState("");
  const handleNewGateway = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const response = await fetch("http://localhost:3001/post", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json;charset=UTF-8",
      },
      body: JSON.stringify({ name: name, ip: ip }),
    });
    const data = await response.json();
    console.log(data);
  };
  return !showNew ? (
    <button
      className="p-2 my-2 border border-black rounded-lg"
      onClick={() => setShowNew(!showNew)}
    >
      Add new gateway
    </button>
  ) : (
    <form
      className="relative flex flex-col items-center justify-center py-2 my-2 text-center border border-black rounded-lg"
      onSubmit={handleNewGateway}
    >
      <button
        className="absolute top-0 right-0 px-2 text-xl font-extrabold text-red-800 translate-x-1/2 -translate-y-1/2 bg-white border border-red-800 rounded-full"
        onClick={() => setShowNew(!showNew)}
      >
        X
      </button>
      <input
        id="name"
        type="text"
        placeholder="Name"
        className="px-1 my-4 text-center"
        onChange={(e) => setName(e.target.value)}
        value={name}
      />
      <input
        id="ip"
        type="text"
        placeholder="IP"
        className="px-1 my-4 text-center"
        onChange={(e) => setIp(e.target.value)}
        value={ip}
      />
      <label>Peripheral Devices</label>
      <PeripheralForm />

      <button type="submit" className="p-2 border border-black rounded-lg">
        Submit
      </button>
    </form>
  );
};

export default GatewayForm;
