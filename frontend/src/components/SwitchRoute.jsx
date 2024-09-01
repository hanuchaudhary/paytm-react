import React from "react";
import { Link } from "react-router-dom";

const SwitchRoute = ({to , label , title}) => {
  return (
    <div>
      <p className="text-gray-400">
        {title}{" "}
        <Link to={to} className="text-blue-500 hover:underline">
          {label}
        </Link>
      </p>
    </div>
  );
};

export default SwitchRoute;
