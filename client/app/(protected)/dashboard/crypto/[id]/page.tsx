"use client";

import { useParams } from "next/navigation";
import React from "react";

const CryptoResult = () => {
  const { id } = useParams();

  return <div>CryptoResult</div>;
};

export default CryptoResult;
