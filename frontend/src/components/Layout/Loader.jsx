import React from "react";

const Loader = () => {
  return (
    <div className="w-full h-screen flex items-center justify-center">
      <div className="w-[50px] h-[50px] border-4 border-[#ddd] border-t-[#3321c8] rounded-full animate-spin"></div>
    </div>
  );
};

export default Loader;
