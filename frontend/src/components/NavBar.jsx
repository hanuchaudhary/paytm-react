import React, { useState } from "react";
const NavBar = () => {
  const [menu, setMenu] = useState(false);
  const toggleMenu = () => {
    setMenu((prev) => !prev);
  };

  return (
    <nav className=" bg-neutral-800 p-4 md:px-20 flex justify-between items-center">
      <div className="text-xl font-bold">PayNow</div>
      <div
        onClick={toggleMenu}
        className="flex relative cursor-pointer items-center"
      >
        <div className="bg-neutral-600 cursor-pointer text-white h-8 w-8 flex items-center justify-center rounded-full capitalize">
          {/* {name.charAt(0)} */}
        </div>
        {/* <span className="ml-2 capitalize">{name}</span> */}
        {menu && (
          <div className="absolute top-14 -left-5">
            <Button onClick={handleOnClick} to={"/signin"} value={"Logout"} />
          </div>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
