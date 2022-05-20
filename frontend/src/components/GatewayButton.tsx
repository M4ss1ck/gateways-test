import React, { useState } from "react";
import Card from "./Card";

const GatewayButton: React.FC<{ gateway: Gateway }> = ({ gateway }) => {
  const [showDetails, setShowDetails] = useState(false);
  const [details, setDetails] = useState<any>({});
  const gatewayDetails = async (id: string) => {
    setShowDetails(true);
    const url = `http://localhost:3001/gateway/${id}`;
    const response = await fetch(url);
    const result = await response.json();
    setDetails(result);
  };

  return (
    <>
      <li
        className="flex flex-row items-center justify-evenly"
        onClick={() => (gateway.id ? gatewayDetails(gateway.id) : null)}
      >
        <span className="w-1/4 text-center overflow-clip">{gateway.id}</span>
        <span className="w-1/4 text-center">{gateway.name}</span>
        <span className="w-1/4 text-center">{gateway.ip}</span>
        <span className="w-1/4 text-center">
          {gateway.peripherals ? gateway.peripherals.length : 0}
        </span>
      </li>
      {showDetails && Object.keys(details).length > 0 && (
        <div className="flex flex-row flex-wrap w-full">
          {Object.entries(details).map(([name, value]) => {
            return (
              name !== "peripherals" && (
                <Card key={name} name={name} data={value as string} />
              )
            );
          })}
        </div>
      )}
    </>
  );
};

export default GatewayButton;
