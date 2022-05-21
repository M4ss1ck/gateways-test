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
            <li
              className="flex flex-col items-start m-2 border rounded-lg border-warning"
              onClick={() => setShowDetails(false)}
            >
              {Object.entries(details).map(([name, value]) => {
                return (
                  name !== "peripherals" && (
                    <Card key={name} name={name} data={value as string} />
                  )
                );
              })}
            </li>
            {gateway.peripherals && gateway.peripherals.length > 0 ? (
              <li>
                <DeviceList peripherals={gateway.peripherals} />
              </li>
            ) : null}
          </>
        )
      )}
    </>
  );
};

export default GatewayButton;
