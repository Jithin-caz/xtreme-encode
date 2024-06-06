"use client";

import React from "react";
export default function Dash() {
  return (
    <div className="container py-16 px-48">
      <div className="text-3xl py-8">Welcome Name</div>
      <div className="border-b-2 border-white flex justify-between">
        <h2 className="text-2xl ">Team Name</h2>
        <button className=" bg-blue-700 px-4 m-1 border-2 border-slate-600 hover:bg-blue-400 duration-150 rounded-sm">
          + Add Member
        </button>
      </div>
      <div className="container"></div>
    </div>
  );
}
