import React, { useState } from "react";
import Card from "./Card";
import DeviceList from "./DeviceList";

const GatewayButton: React.FC<{ gateway: Gateway }> = ({ gateway }) => {
  const [showDetails, setShowDetails] = useState(false);
  const [showRaw, setShowRaw] = useState(false);
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
          className="flex flex-col items-center justify-center w-full p-2 m-auto my-2 border rounded-lg cursor-pointer border-warning"
          onClick={() => (gateway.id ? gatewayDetails(gateway.id) : null)}
        >
          <span className="text-center">{gateway.name}</span>
        </li>
      ) : (
        Object.keys(details).length > 0 && (
          <>
            <li className="relative flex flex-col items-start w-full p-2 my-2 border rounded-lg border-warning">
              <button
                onClick={() => setShowDetails(false)}
                className="absolute top-0 right-0 px-2 translate-x-1/2 -translate-y-1/2 border rounded-md border-alert text-alert hover:text-dark hover:bg-alert bg-dark"
              >
                X
              </button>
              <button
                onClick={() => setShowRaw(!showRaw)}
                className="absolute top-0 px-2 -translate-y-1/2 border rounded-md right-8 border-warning text-warning hover:text-dark hover:bg-warning bg-dark"
              >
                {showRaw ? "Hide Raw" : "Raw"}
              </button>
              {showRaw ? (
                <pre className="w-full p-2 mx-auto overflow-x-auto text-xs text-left text-light bg-opacity-30 bg-primary">
                  {JSON.stringify(details, null, 2)}
                </pre>
              ) : (
                <React.Fragment>
                  {Object.entries(details).map(([name, value]) => {
                    return (
                      name !== "peripherals" && (
                        <Card key={name} name={name} data={value as string} />
                      )
                    );
                  })}
                  {gateway.peripherals && gateway.id ? (
                    <DeviceList
                      peripherals={gateway.peripherals}
                      id={gateway.id}
                    />
                  ) : null}
                </React.Fragment>
              )}
            </li>
          </>
        )
      )}
    </>
  );
};

export default GatewayButton;
