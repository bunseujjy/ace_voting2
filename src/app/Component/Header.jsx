import Image from "next/image";
import React from "react";

const Header = () => {
  return (
    <div className="w-full h-full">
      <Image
        src="/banner.jpg"
        alt="Poster"
        width={1000}
        height={1000}
        className="w-full h-auto object-cover bg-center"
      />
    </div>
  );
};

export default Header;
