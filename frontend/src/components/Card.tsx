import React from "react";

const Card: React.FC<{ data: string | number; name: string }> = ({
  data,
  name,
}) => {
  return (
    <div className="flex flex-col items-center justify-center p-2 m-2 border border-black rounded-lg">
      <h3 className="text-center">{data}</h3>
      <hr />
      <small className="text-center">{name}</small>
    </div>
  );
};

export default Card;
