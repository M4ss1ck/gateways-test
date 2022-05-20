import React, { useState } from "react";

const PeripheralForm = () => {
  const [uid, setUid] = useState("");
  const [vendor, setVendor] = useState("");

  return (
    <div className="flex flex-row items-center w-full p-2 my-2 text-center border border-black rounded-lg justify-evenly">
      <h3>Add peripheral device</h3>
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
  );
};

export default PeripheralForm;
