import Register from "@/components/page";
import { HeroHighlight, Highlight } from "@/components/ui/hero-highlight";

import Image from "next/image";

export default function Home() {
  return (
   <main className=" bg-black">
   
   <HeroHighlight className=" font-bold text-5xl px-5 flex flex-col gap-5">
    
    <div className="text-white  font-bold">
    <div className=" text-xl text-white">ENCIDE MACE presents</div>
      Xtreme Encode</div>
    <Highlight>
  code,more code, repeat
    </Highlight>
    <a href="#REGISTER" className=" mt-8 bg-blue-600 text-white text-lg font-normal w-fit rounded-md p-2  hover:bg-blue-700">register now {'->'}</a>
   </HeroHighlight>
   <Register/>
   </main>
  );
}
