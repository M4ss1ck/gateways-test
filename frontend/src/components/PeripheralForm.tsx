import React, { useState } from "react";

const PeripheralForm = () => {
  const [uid, setUid] = useState("");
  const [vendor, setVendor] = useState("");
  const [newDevice, setNewDevice] = useState(false);

  return newDevice ? (
    <div className="relative flex flex-col items-center justify-center p-2 m-2 text-center border border-black rounded-lg">
      <button
        className="absolute top-0 right-0 px-2 text-xl font-extrabold text-red-800 translate-x-1/2 -translate-y-1/2 bg-white border border-red-800 rounded-full"
        onClick={() => setNewDevice(!newDevice)}
      >
        X
      </button>
      <input
        id="uid"
        type="number"
        placeholder="UID"
        className="px-1 my-4 text-center"
        onChange={(e) => setUid(e.target.value)}
        value={uid}
      />
      <input
        id="vendor"
        type="text"
        placeholder="Vendor"
        className="px-1 my-4 text-center"
        onChange={(e) => setVendor(e.target.value)}
        value={vendor}
      />
      <span className="flex flex-row items-center justify-center">
        <input
          id="online"
          type="radio"
          name="status"
          className="px-2 mx-1 my-4"
        />{" "}
        online
      </span>
      <span className="flex flex-row items-center justify-center">
        <input
          id="offline"
          type="radio"
          name="status"
          className="px-2 mx-1 my-4"
        />{" "}
        offline
      </span>
      <button type="button" className="p-2 border border-black rounded-lg">
        Add
      </button>
    </div>
  ) : (
    <button
      className="p-2 my-2 border border-black rounded-lg"
      onClick={() => setNewDevice(!newDevice)}
    >
      Add device
    </button>
  );
};

export default PeripheralForm;
