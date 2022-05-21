import React, { useState } from "react";
import DeviceNew from "./DeviceNew";

const GatewayForm = () => {
  const [newDevice, setNewDevice] = useState(false);
  const [name, setName] = useState("");
  const [ip, setIp] = useState("");
  const [peripherals, setPeripherals] = useState<Peripheral[]>([]);
  const [data, setData] = useState<any>({});

  const handleNewGateway = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const url = "http://localhost:3001/gateway/new";
    const body = JSON.stringify({
      name: name,
      ip: ip,
      peripherals: peripherals,
    });
    const options = {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json;charset=UTF-8",
      },
      body: body,
    };
    const response = await fetch(url, options);
    const result = await response.json();
    setData(result);
    setPeripherals([]);
    setIp("");
    setName("");
  };

  return (
    <>
      <form
        className="relative flex flex-col items-center py-2 my-2 text-center border rounded-lg border-warning justify-evenly"
        onSubmit={handleNewGateway}
      >
        <input
          id="name"
          type="text"
          placeholder="Name"
          className="px-1 mx-4 text-center border-b bg-dark border-b-warning"
          onChange={(e) => setName(e.target.value)}
          value={name}
        />
        <input
          id="ip"
          type="text"
          placeholder="IP"
          className="px-1 my-4 text-center border-b bg-dark border-b-warning"
          onChange={(e) => setIp(e.target.value)}
          value={ip}
        />
        <button
          type="button"
          className="p-2 my-2 border rounded-lg border-warning hover:bg-warning hover:text-primary"
          onClick={() => setNewDevice(!newDevice)}
        >
          Add device
        </button>
        <button
          type="submit"
          className="p-2 border rounded-lg border-warning hover:bg-warning hover:text-primary"
        >
          Submit
        </button>
      </form>
      {data.error && <p className="text-alert">{data.error}</p>}
      {peripherals.length > 0 && (
        <ol className="text-center">
          <li>Peripheral list:</li>
          {peripherals.map((peripheral) => (
            <li key={peripheral.uid}>
              {peripheral.uid} - {peripheral.vendor} - {peripheral.status}
            </li>
          ))}
        </ol>
      )}
      {newDevice && (
        <DeviceNew peripherals={peripherals} setPeripherals={setPeripherals} />
      )}
    </>
  );
};

export default GatewayForm;
