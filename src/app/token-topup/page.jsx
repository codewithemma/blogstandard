"use client";
import { url } from "@/utils/api";
import React from "react";

const TokenTopup = () => {
  const handleClick = async () => {
    const response = await fetch(`${url}/api/addtoken`, {
      method: "POST",
      // headers: {
      //   "content-type": "application/json",
      // },
    });
  };
  return (
    <div>
      <h1>this is the token topup</h1>
      <button className="btn" onClick={handleClick}>
        Add tokens
      </button>
    </div>
  );
};

export default TokenTopup;
