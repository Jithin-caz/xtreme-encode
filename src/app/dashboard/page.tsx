"use client"
import Dash from "@/components/ui/dash";
import Navbar from "@/components/ui/navbar";
import Register from "@/components/ui/register";
import React, { useState } from "react";
import {useEffect} from 'react'

export default function Dashboard() {
  const [email,setEmail]=useState('')
useEffect(()=>{
  const email=localStorage.getItem('email')
  setEmail(email)
  console.log(`current email is ${email}`)
},[])
  return (
    
    <div className="text-white">
      <Navbar></Navbar>
      <Register></Register>
      <Dash></Dash>
    </div>
  );
}
