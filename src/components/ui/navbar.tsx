/* eslint-disable @next/next/no-img-element */
"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
  return (
    <div className="grid grid-cols-2 text-white px-6 md:px-12 lg:px-24 py-4">
      <div className="col-span-1">
        <Image
          src="/images/encide_logo-removebg-preview.png"
          className=" w-32"
          alt=""
          width={200}
          height={100}
        />
      </div>
      <div className="col-span-1 flex justify-end gap-x-8">
        <span className=" hover:text-blue-300">
          <Link href="/">Home</Link>
        </span>
        <span className=" hover:text-blue-300">
          <Link href="/leaderboards">leaderboards</Link>
        </span>
      </div>
    </div>
  );
}
