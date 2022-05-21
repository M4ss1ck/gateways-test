import React from "react";

const Card: React.FC<{ data: string | number; name: string }> = ({
  data,
  name,
}) => {
  return (
    <div className="flex flex-row items-center justify-center px-2">
      <small className="text-center">{name}:</small>{" "}
      <h3 className="mx-2 text-center">{data}</h3>
    </div>
  );
};

export default Card;
