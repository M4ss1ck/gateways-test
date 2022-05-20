import React, { useState } from "react";
import PeripheralForm from "./PeripheralForm";

const GatewayForm = () => {
  // const [showNew, setShowNew] = useState(false);
  const [newDevice, setNewDevice] = useState(false);
  const [name, setName] = useState("");
  const [ip, setIp] = useState("");
  const [data, setData] = useState<any>({});

  const handleNewGateway = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const url = "http://localhost:3001/gateway/new";
    const body = JSON.stringify({ name: name, ip: ip });
    const options = {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json;charset=UTF-8",
      },
      body: body,
    };
    console.log(options);
    const response = await fetch(url, options);
    const result = await response.json();
    setData(result);
    //console.log(data);
  };

  return (
    <>
      <form
        className="relative flex flex-row items-center py-2 my-2 text-center border border-black rounded-lg justify-evenly"
        onSubmit={handleNewGateway}
      >
        <h2>Add new gateway</h2>
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
        <button
          type="button"
          className="p-2 my-2 border border-black rounded-lg"
          onClick={() => setNewDevice(!newDevice)}
        >
          Add device
        </button>
        <button type="submit" className="p-2 border border-black rounded-lg">
          Submit
        </button>
      </form>
      {data.error && <p>{data.error}</p>}
      {newDevice && <PeripheralForm />}
    </>
  );
};

export default GatewayForm;
