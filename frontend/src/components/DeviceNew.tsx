import React, { useState } from "react";

const DeviceNew: React.FC<{
  peripherals: Peripheral[];
  setPeripherals: React.Dispatch<React.SetStateAction<Peripheral[]>>;
}> = ({ peripherals, setPeripherals }) => {
  const [uid, setUid] = useState("");
  const [vendor, setVendor] = useState("");
  const [status, setStatus] = useState<"online" | "offline">("offline");
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
  );
};

export default DeviceNew;
