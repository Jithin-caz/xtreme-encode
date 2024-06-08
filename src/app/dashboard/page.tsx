"use client"
import Dash from "@/components/ui/dash";
import Navbar from "@/components/ui/navbar";
import Register from "@/components/ui/register";
import {useSelector,Provider} from 'react-redux'
import {useEffect} from 'react'
import store from "@/redux/store";
export default function Dashboard() {

  
  return (
    
    <div className="text-white">
      <Navbar></Navbar>
      <Register></Register>
      <Dash></Dash>
    </div>
  );
}
