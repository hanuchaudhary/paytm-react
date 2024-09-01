import React from "react";
import { Link } from "react-router-dom";

const Button = ({ value, onClick, to }) => {
  return (
    <Link
      to={to}
      onClick={onClick}
      className="border-2 bg-zinc-800 bg-opacity-30 cursor-pointer inline-block border-zinc-600 py-3 font-semibold text-md md:text-xl px-5 md:px-10"
    >
      {value}
    </Link>
  );
};

export default Button;
