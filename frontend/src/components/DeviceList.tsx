import React, { useState, useEffect } from "react";

const DeviceList: React.FC<{ peripherals: Peripheral[]; id: string }> = ({
  peripherals,
  id,
}) => {
  const [newDevice, setNewDevice] = useState(false);
  const [peripheralList, setPeripherals] = useState<Peripheral[]>(peripherals);
  const [uid, setUid] = useState("");
  const [vendor, setVendor] = useState("");
  const [status, setStatus] = useState<"online" | "offline">("offline");

  const removePeripheral = async (id: string) => {
    const url = `http://localhost:3001/device/${id}`;
    const options = {
      method: "DELETE",
    };
    const response = await fetch(url, options);
    const peripherals = await response.json();
    if (!peripherals.error) {
      setPeripherals(peripherals);
    } else {
      console.log(peripherals.error);
    }
  };

  const addPeripheral = async (peripheral: Peripheral) => {
    const url = `http://localhost:3001/device/new`;
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...peripheral, id: id }),
    };
    const response = await fetch(url, options);
    const peripherals = await response.json();
    setPeripherals(peripherals);
    setNewDevice(!newDevice);
  };

  const handleNewPeripheral = async () => {
    const parsedUid = parseInt(uid);
    const date = new Date();
    const device = {
      uid: parsedUid,
      vendor: vendor,
      status: status,
      dateCreated: date,
    } as Peripheral;
    setUid("");
    setVendor("");
    setStatus("offline");
    await addPeripheral(device);
  };

  return (
    <div className="w-full">
      <small className="px-2 mx-auto text-center">Peripheral devices:</small>
      {peripheralList?.length > 0 && (
        <ol className="px-2 mx-auto">
          {peripheralList.map((peripheral) => (
            <li
              key={peripheral.id}
              className="flex flex-row flex-wrap items-center"
            >
              {peripheral.dateCreated.toString()} - {peripheral.uid} -{" "}
              {peripheral.status} - {peripheral.vendor}
              <button
                className="flex px-2 mx-2 my-1 border rounded-lg border-alert hover:bg-alert"
                onClick={() => removePeripheral(peripheral.id as string)}
              >
                Remove
              </button>
            </li>
          ))}
        </ol>
      )}
      <button
        onClick={() => setNewDevice(!newDevice)}
        className="flex px-2 mx-auto my-1 text-center border rounded-lg border-warning hover:bg-warning hover:text-primary"
      >
        Add new
      </button>
      {newDevice && (
        <div className="flex flex-col items-center p-2 mx-4 my-2 text-center border rounded-lg border-warning justify-evenly">
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
    </div>
  );
};

export default DeviceList;
