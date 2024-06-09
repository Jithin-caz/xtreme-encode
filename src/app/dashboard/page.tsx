"use client";
import Dash from "@/components/ui/dash";
import FinalRegistration from "@/app/finalRegister/page";
import Navbar from "@/components/ui/navbar";
import Register from "@/components/ui/register";
import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import Loading from "../loading";


const fetchUser = async (email: string) => {
  try {
    const response = await axios.get("/api/fetchUser", {
      params: { email },
    });
    console.log('in fetch user')
    console.log(response.data)
    return response.data;
  } catch (error) {
    console.error("Error fetching user:", error);
    throw error;
  }
};


export default function Dashboard() {
  const [email, setEmail] = useState<string | null>("");
  const [userExist , setUserExist] = useState(false)
  const [teamRegistedred,setTeamRegistered]=useState(false)
  const [loading,setLoading]=useState(false)
const fetchTeam=async(teamname:string)=>{
  await axios.post('api/createteam',{
    teamname
}).then((res)=>{
   
    setTeamRegistered(res.data.team.registered)
}).catch((err)=>console.log(err))
}
  useEffect(() => {
    setLoading(false)
    const emailfetch = localStorage.getItem("email");
    setEmail(emailfetch);
    if(emailfetch)
      fetchUser(emailfetch).then((data) => {
        if(data.message=="User found")
        {
         fetchTeam(data.user.team)
          setUserExist(true)
        }
        else
          setUserExist(false)
        setLoading(true)
    });  
    console.log(`current email is ${emailfetch}`);
  }, [userExist]);

  const handleChange=(newState:boolean)=>{setUserExist(newState)}
  return (
    loading?
    <div className="text-white">
      <Navbar></Navbar>
      {!userExist && <Register state={userExist} onStateChange={handleChange} userEmail={email}></Register>} 
      {userExist&&!teamRegistedred && <Dash></Dash>}  
      {teamRegistedred && <FinalRegistration/>}  
</div>:<Loading/>
  );
}
