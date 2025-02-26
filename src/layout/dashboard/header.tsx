import React from "react";

const Header = () => {
  return (
    <>
      <header className="bg-white border-b border-gray-200 py-2 sticky top-0 flex items-center justify-between md:px-14 px-2">
        <h2 className="font-bold dark:text-black">Logo</h2>
        <div className="flex gap-4 items-center">
          <div className="flex size-12 md:size-8 rounded-full bg-slate-800"></div>
        </div>
      </header>
    </>
  );
};

export default Header;
