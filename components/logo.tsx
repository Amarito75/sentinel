import Link from "next/link";
import Image from "next/image";
import React from "react";

const Logo = () => {
  return (
    <Link href="/">
      <Image src="/pictures/logo.svg" alt="Logo" width={40} height={40} />
      <h1 className="text-2xl font-bold text-priary ml-4">BoilerNext</h1>
    </Link>
  );
};

export default Logo;
