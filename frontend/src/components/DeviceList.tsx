import React, { useState } from "react";
import DeviceNew from "./DeviceNew";

const DeviceList: React.FC<{ peripherals: Peripheral[] }> = ({
  peripherals,
}) => {
  const [newDevice, setNewDevice] = useState(false);
  const [peripheralList, setPeripherals] = useState<Peripheral[]>([]);

  const removePeripheral = async (id: string) => {
    const url = `http://localhost:3001/device/${id}`;
    const options = {
      method: "DELETE",
    };
    const response = await fetch(url, options);
    const result = await response.json();
    console.log("borrando periférico");
  };

  return (
    <div className="w-full">
      <small className="px-2 mx-auto text-center">Peripheral devices:</small>
      {peripherals.length > 0 && (
        <ol className="px-2 mx-auto">
          {peripherals.map((peripheral) => (
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
        <DeviceNew
          peripherals={peripheralList}
          setPeripherals={setPeripherals}
        />
      )}
      {peripheralList.length > 0 && (
        <ol className="px-2 mx-auto">
          {peripheralList.map((peripheral) => (
            <li
              key={peripheral.id}
              className="flex flex-row flex-wrap items-center"
            >
              <span>{peripheral.dateCreated.toString()}</span> -{" "}
              {peripheral.uid} - <span>{peripheral.status}</span> -{" "}
              <span>{peripheral.vendor}</span>
              <button className="inline-flex px-2 mx-2 my-1 border rounded-lg border-alert hover:bg-alert ">
                Add
              </button>
            </li>
          ))}
        </ol>
      )}
    </div>
  );
};

export default DeviceList;
