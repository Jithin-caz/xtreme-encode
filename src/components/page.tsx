"use client"

import { useState } from "react"

export default function Register()
{
    const [signup,setSignup]=useState(true)
    return <div className=" grid grid-cols-1 lg:grid-cols-2 h-lvh" id="REGISTER">
        <div className=" bg-white" style={{ background:'url("https://i.pinimg.com/736x/4e/99/61/4e996161b1ff9177cd41ce737c8e00ca.jpg")',backgroundPosition:'center' }}>
            <div className=" w-full bg-opacity-55 bg-black text-white font-semibold text-5xl h-full flex justify-center items-center gap-0">
                <div className=" py-5 flex flex-col"><p className=" text-center">Ready for battle?</p> 
                <span className=" h-0.5 w-full bg-white"></span></div> </div> </div> 
        <div className=" bg-slate-950 p-3">
        <form action="" className='pb-8 p-3 border-2 border-slate-700 text-white bg-transparent grid gap-3 shadow-2xl rounded-lg mt-5 '>
            <h1 className=" pt-5 text-2xl font-semibold">{signup? 'Signup':'login'}</h1>
           {signup&&<input required placeholder='name'  className='ease-in-out duration-500 focus:text-lg outline-none w-full mt-4 p-2 py-4  bg-transparent  border-b-2 border-slate-800 hover:border-white' type="text" name="" id="" />} 
        <input required placeholder='email' className='ease-in-out duration-500 focus:text-lg outline-none w-full p-2 py-4 mt-4 bg-transparent border-b-2  border-slate-800 hover:border-white' type="email" name="" id="" />
       <input required placeholder='password' className='ease-in-out duration-500 focus:text-lg outline-none w-full mt-4 p-2 py-4  bg-transparent  border-b-2  border-slate-800 hover:border-white' type="password" name="" id="" />
       <input required placeholder='confirm password' className='ease-in-out duration-500 focus:text-lg outline-none w-full mt-4 p-2 py-4  bg-transparent  border-b-2  border-slate-800 hover:border-white' type="text" name="" id="" />
       <button className=' rounded-md max-w-28 mt-6 h-14 bg-slate-800 hover:bg-slate-900 ease-in-out duration-500  text-lg font-semibold hover:text-2xl p-2 px-3 text-white' type="submit">submit</button>
      <div className=" pt-4 flex"><p className=" opacity-60">{signup? 'already register?':'new here?'} </p><button className=" text-white pl-1" onClick={()=>setSignup(!signup)}>{!signup? 'Signup':'login'}</button></div> 
      <div className=" w-full flex  justify-center items-center pt-8 ">
        <button className=" w-fit flex justify-center items-center bg-slate-800 rounded-md p-2 overflow-clip group relative">
        <i className=" pr-2 group-hover:translate-x-12 transition ease-in-out duration-700"><img className=" w-8" src="https://img.icons8.com/color/48/google-logo.png" alt="" /></i><p className="group-hover:translate-y-40 transition ease-in-out duration-700">sign in with google</p><p className=" -translate-y-9 group-hover:translate-y-0 transition ease-in-out duration-700 absolute right-10">lets go!!</p> </button></div></form>
        </div>
    </div>
}