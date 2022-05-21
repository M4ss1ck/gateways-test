import React, { useState } from "react";

const GatewayForm = () => {
  const [newDevice, setNewDevice] = useState(false);
  const [name, setName] = useState("");
  const [ip, setIp] = useState("");
  const [uid, setUid] = useState("");
  const [vendor, setVendor] = useState("");
  const [status, setStatus] = useState<"online" | "offline">("offline");
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
    setIp("");
    setName("");
  };

  const handleNewPeripheral = () => {
    const parsedUid = parseInt(uid);
    const date = new Date();
    const device = {
      uid: parsedUid,
      vendor: vendor,
      status: status,
      dateCreated: date,
    } as Peripheral;
    setPeripherals([...peripherals, device]);
    setUid("");
    setVendor("");
    setStatus("offline");
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
        <div className="flex flex-col items-center p-2 my-2 text-center border rounded-lg border-warning justify-evenly">
          <h3>Add peripheral device</h3>
          <input
            id="uid"
            type="number"
            placeholder="UID"
            className="px-1 my-4 text-center border-b bg-dark border-b-warning"
            onChange={(e) => setUid(e.target.value)}
            value={uid}
          />
          <input
            id="vendor"
            type="text"
            placeholder="Vendor"
            className="px-1 my-4 text-center border-b bg-dark border-b-warning"
            onChange={(e) => setVendor(e.target.value)}
            value={vendor}
          />
          <span className="flex flex-row items-center justify-center">
            <input
              id="online"
              type="radio"
              name="status"
              value="online"
              className="px-2 mx-1 my-4"
              checked={status === "online"}
              onChange={(e) => setStatus(e.target.value as "online")}
            />{" "}
            online
          </span>
          <span className="flex flex-row items-center justify-center">
            <input
              id="offline"
              type="radio"
              name="status"
              value="offline"
              className="px-2 mx-1 my-4"
              checked={status === "offline"}
              onChange={(e) => setStatus(e.target.value as "offline")}
            />{" "}
            offline
          </span>
          <button
            type="button"
            className="p-2 border rounded-lg border-warning hover:bg-warning hover:text-primary"
            onClick={handleNewPeripheral}
          >
            Add
          </button>
        </div>
      )}
    </>
  );
};

export default GatewayForm;
