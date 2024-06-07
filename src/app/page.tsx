"use client"
import { useEffect, useState } from "react";
import Register from "@/app/signin/page";
import { HeroHighlight, Highlight } from "@/components/ui/hero-highlight";

export default function Home() {
  return (

    <main className=" bg-black re">
      <i>
        <img
          src="images/encide_logo-removebg-preview.png"
          className=" w-40 absolute z-30 right-2"
          style={{ top: "-3rem" }}
          alt=""
        />
      </i>
      <HeroHighlight className=" font-bold text-7xl px-5 flex flex-col gap-5">
        <div className="text-white  font-bold">
          <div className=" text-xl font-medium text-white">
            ENCIDE MACE in colaboration with IEEE XTREME region 10 presents
          </div>
          Xtreme Encode {process.env.NEXT_PUBLIC_API_KEY}
        </div>
        <Highlight>code,more code, repeat</Highlight>
        <a
          href="#REGISTER"
          className=" mt-6 bg-blue-600 text-white text-xl font-normal w-fit rounded-md p-2 px-4  hover:bg-blue-700"
        >
          register now {"->"}
        </a>
        <div className="font-mono w-full grid grid-cols-1 gap-5 place-items-center md:grid-cols-3 mt-16 text-slate-100">
          <div className=" text-sm font-normal max-w-96  col-span-1 border-slate-600 rounded-sm backdrop-blur p-4  border flex items-center justify-center">
            <p>
              <span className=" text-3xl text-blue-200 font-thin font-sans">
                XTREME ENCODE
              </span>{" "}
              is a thrilling coding competition conducted by IEEE Region 10 in
              collaboration with ENCIDE MACE, as part of IEEEXtreme 18.0. Teams
              of IEEE student members compete against each other to solve a set
              of programming problems over a period of 4 weeks.
            </p>
          </div>
          <div className=" text-sm font-normal max-w-96  col-span-1 border-slate-600 rounded-sm backdrop-blur p-4  border flex items-center justify-center">
            <p>
              <span className=" text-3xl text-blue-200 font-thin  font-sans">
                ENCIDE MACE
              </span>{" "}
              is a coding club for passionate learners to compete, create
              projects, and foster a vibrant coding community. The club helps
              students to sharpen their coding skills, build confidence, and
              prepare for future opportunities in the tech industry.
            </p>
          </div>
          <div className=" text-sm font-normal max-w-96  col-span-1 border-slate-600 rounded-sm backdrop-blur p-4  border flex items-center justify-center">
            <p>
              <span className=" text-3xl  text-blue-200 font-thin  font-sans">
                IEEE Xtreme
              </span>{" "}
              is a global challenge in which teams of IEEE Student members –
              advised and proctored by an IEEE member, and often supported by an
              IEEE Student Branch – compete in a 24-hour time span against each
              other to solve a set of programming problems that instills a
              passion for coding.
            </p>
          </div>
        </div>
      </HeroHighlight>
      <Register />
    </main>

  );
}
