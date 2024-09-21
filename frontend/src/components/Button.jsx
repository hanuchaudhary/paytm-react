import React from "react";
import { Link } from "react-router-dom";

const Button = ({ value, onClick, to }) => {
  return (
    <Link
      to={to}
      onClick={onClick}
      className="border-2 bg-neutral-800 cursor-pointer inline-block border-neutral-700 hover:border-neutral-600 hover:bg-neutral-700 duration-300 focus:scale-105 transition-transform py-3 font-semibold text-md md:text-xl px-5 md:px-10"
    >
      {value}
    </Link>
  );
};

export default Button;
