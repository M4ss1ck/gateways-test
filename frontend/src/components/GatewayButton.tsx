import React, { useState } from "react";
import Card from "./Card";

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
          className="flex flex-col items-center justify-center p-2 m-auto my-2 border border-black rounded-lg cursor-pointer"
          onClick={() => (gateway.id ? gatewayDetails(gateway.id) : null)}
        >
          {/* <span className="text-center overflow-clip">ID: {gateway.id}</span> */}
          <span className="text-center">Name: {gateway.name}</span>
          <span className="text-center">IP: {gateway.ip}</span>
          {/* <span className="text-center">
            {gateway.peripherals ? gateway.peripherals.length : 0}
          </span> */}
        </li>
      ) : (
        Object.keys(details).length > 0 && (
          <div className="flex flex-col m-2 border border-black rounded-lg">
            {Object.entries(details).map(([name, value]) => {
              return name !== "peripherals" ? (
                <Card key={name} name={name} data={value as string} />
              ) : (
                <div key={name} className="w-full text-center">
                  <h3>Peripheral devices</h3>
                  <Card key={name} name={name} data={JSON.stringify(value)} />
                </div>
              );
            })}
          </div>
        )
      )}
    </>
  );
};

export default GatewayButton;
