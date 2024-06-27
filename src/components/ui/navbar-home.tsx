/* eslint-disable @next/next/no-img-element */
"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
  return (
    <div className=" absolute bg-transparent z-50 w-full grid grid-cols-2 text-white px-6 md:px-12 lg:px-24 py-4">
      <div className="col-span-1 flex w-24">
        <img src="/images/encide_logo-removebg-preview.png"
          className=" w-full" alt="" />
           <img src="/images/white.png"
          className=" w-full" alt="" />
        {/* <Image
          src="/images/encide_logo-removebg-preview.png"
          className=" w-40"
          alt=""
          width={200}
          height={50}
        /> */}
        {/* <Image
          src="/images/white.png"
          className=" w-32"
          alt=""
          width={160}
          height={80}
        /> */}
      </div>
      <div className="col-span-1 flex justify-end gap-x-8">
        <span className=" hover:text-blue-300">
          <Link href="/leaderboards" className=" flex flex-col items-center">
            <p className=" text-white opacity-0 sm:opacity-100 absolute pt-6 text-sm ">leaderboard</p>
            <img width="30" height="30" src="https://img.icons8.com/ios-filled/50/FFFFFF/leaderboard.png" alt="leaderboard"/></Link>
        </span>
      </div>
    </div>
  );
}
