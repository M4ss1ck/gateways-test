import React, { useState } from "react";
import Card from "./Card";
import DeviceList from "./DeviceList";

const GatewayButton: React.FC<{ gateway: Gateway }> = ({ gateway }) => {
  const [showDetails, setShowDetails] = useState(false);
  const [details, setDetails] = useState<Gateway | {}>({});

  const gatewayDetails = async (id: string) => {
    setShowDetails(true);
    const url = `http://localhost:3001/gateway/${id}`;
    const response = await fetch(url);
    const result = await response.json();
    setDetails(result);
  };

  return (
    <>
      {!showDetails ? (
        <li
          className="flex flex-col items-center justify-center p-2 m-auto my-2 border rounded-lg cursor-pointer border-warning"
          onClick={() => (gateway.id ? gatewayDetails(gateway.id) : null)}
        >
          <span className="text-center">{gateway.name}</span>
        </li>
      ) : (
        Object.keys(details).length > 0 && (
          <>
            <li className="relative flex flex-col items-start m-2 border rounded-lg border-warning">
              <button
                onClick={() => setShowDetails(false)}
                className="absolute top-0 right-0 px-2 translate-x-1/2 -translate-y-1/2 border rounded-md border-alert text-alert hover:text-light hover:bg-alert bg-dark"
              >
                X
              </button>
              {Object.entries(details).map(([name, value]) => {
                return (
                  name !== "peripherals" && (
                    <Card key={name} name={name} data={value as string} />
                  )
                );
              })}
              {gateway.peripherals && gateway.id ? (
                <DeviceList peripherals={gateway.peripherals} id={gateway.id} />
              ) : null}
            </li>
          </>
        )
      )}
    </>
  );
};

export default GatewayButton;
