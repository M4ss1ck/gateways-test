import React from "react";

const DeviceList: React.FC<{ peripherals: Peripheral[] }> = ({
  peripherals,
}) => {
  return (
    <div>
      <h3 className="px-2 mx-auto text-center">Peripheral devices</h3>
      <button className="flex px-2 mx-auto my-1 text-center border rounded-lg border-warning hover:bg-warning">
        Add new
      </button>
      <ol className="px-2 mx-auto">
        {peripherals.map((peripheral) => (
          <li
            key={peripheral.id}
            className="flex flex-row flex-wrap items-center"
          >
            {peripheral.dateCreated.toString()} - {peripheral.uid} -{" "}
            {peripheral.status} - {peripheral.vendor}
            <button className="flex px-2 mx-2 my-1 border rounded-lg border-alert hover:bg-alert ">
              Remove
            </button>
          </li>
        ))}
      </ol>
    </div>
  );
};

export default DeviceList;
