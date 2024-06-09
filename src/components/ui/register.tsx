"use client";
import React, { useState } from "react";
import axios from "axios";

const instructions = [
  "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dignissimos saepe pariatur hic nihil odio. Quod.",
  "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dignissimos saepe pariatur hic nihil odio. Quod.",
  "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dignissimos saepe pariatur hic nihil odio. Quod.",
  "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dignissimos saepe pariatur hic nihil odio. Quod.",
  "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dignissimos saepe pariatur hic nihil odio. Quod.",
];

type UserData = {
  name: string;
  country: string;
  ieeeId: string;
  college: string;
  branch: string;
  contact: string;
  team: string;
  email:string
};

const createTeam = async (teamData: any) => {
  try {
    const response = await axios.post("/api/createteam", teamData);
    return response.data;
  } catch (error) {
    console.error("Error creating team:", error);
    throw error;
  }
};
const createUser = async (userData: any) => {
  try {
    const authemail=localStorage.getItem('email')
    const response = await axios.post("/api/createuser", {...userData,authemail});
    return response.data;
  } catch (error) {
    console.error("Error creating User:", error);
    throw error;
  }
};

export default function Register({ userEmail,state,onStateChange }: { userEmail: any,state:boolean,onStateChange:(newState:boolean)=>void}) {
 
  const [userData, setUserData] = useState<UserData>({
    name: "",
    country: "",
    ieeeId: "",
    college: "",
    branch: "",
    contact: "",
    team: "",
    email:userEmail
  });
  const [message, setMessage] = useState("");


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const teamname = userData.team;
      const members = [userData];
      const name = userData.name;
      const email = userEmail;
      const IEEEID = userData.ieeeId;
      const team = userData.team;
      const isLead = true;
      const user = { name, email, IEEEID, isLead, team };
      console.log(user);
      console.log(members);
      const teamData = { team:teamname, members };
      const response = await createTeam(teamData);
      const userResponse = await createUser(user);
      onStateChange(true)
      console.log(userResponse.message);
      console.log(response.message);
    } catch (error) {
      setMessage("Failed to create team.");
    }
  };

  return (
    <div className="flex flex-col-reverse place-items-center lg:place-items-stretch px-16 lg:px-48 py-12 lg:grid lg:grid-cols-3">
      <div className="lg:col-span-2">
        <div className="form px-16 lg:pl-8 lg:pr-4 lg:mr-4 lg:border-r-2 lg:border-slate-300">
          <div className="font-thin text-2xl pb-8">
            <h2>Enter Your Details</h2>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col pb-8">
              <input
                type="text"
                name="name"
                required
                placeholder="Name"
                value={userData.name}
                onChange={handleChange}
                className="bg-transparent border-b-2 border-slate-400 focus:border-y-2 focus:border-blue-400 duration-200"
              />
            </div>
            <div className="grid grid-cols-2 pb-8 gap-x-2">
              <input
                type="text"
                name="country"
                required
                placeholder="Country"
                value={userData.country}
                onChange={handleChange}
                className="bg-transparent border-b-2 border-slate-400 focus:border-y-2 focus:border-blue-400 duration-200 col-span-1"
              />
              <input
                type="text"
                name="ieeeId"
                required
                placeholder="IEEE ID"
                value={userData.ieeeId}
                onChange={handleChange}
                className="bg-transparent border-b-2 border-slate-400 focus:border-y-2 focus:border-blue-400 duration-200 col-span-1"
              />
            </div>
            <div className="flex flex-col pb-8">
              <input
                type="text"
                name="college"
                required
                placeholder="College"
                value={userData.college}
                onChange={handleChange}
                className="bg-transparent border-b-2 border-slate-400 focus:border-y-2 focus:border-blue-400 duration-200"
              />
            </div>
            <div className="flex flex-col pb-8">
              <input
                type="text"
                name="branch"
                required
                placeholder="IEEE Student Branch"
                value={userData.branch}
                onChange={handleChange}
                className="bg-transparent border-b-2 border-slate-400 focus:border-y-2 focus:border-blue-400 duration-200"
              />
            </div>
            <div className="flex flex-col pb-8 gap-x-4">
              <input
                type="tel"
                required
                name="contact"
                placeholder="Contact No."
                value={userData.contact}
                onChange={handleChange}
                className="bg-transparent border-b-2 border-slate-400 focus:border-y-2 focus:border-blue-400 duration-200"
              />
            </div>
            <div className="flex flex-col pb-8">
              <input
                type="text"
                name="team"
                required
                placeholder="Team Name"
                value={userData.team}
                onChange={handleChange}
                className="bg-transparent border-b-2 border-slate-400 focus:border-y-2 focus:border-blue-400 duration-200"
              />
            </div>
            <div className="flex flex-col place-items-center">
              <button
                type="submit"
                className="w-1/4 min-w-24 bg-blue-700 py-2 rounded-sm"
              >
                Continue
              </button>
            </div>
          </form>
          {message && <p className="pt-4 text-center">{message}</p>}
        </div>
      </div>
      <div className="lg:col-span-1 bg-slate-800 rounded-sm p-8 mb-8">
        <h2 className="text-2xl pb-4">Instructions</h2>
        <ol className="font-mono text-sm">
          {instructions.map((i, index) => (
            <li key={index} className="pb-2">
              {index + 1}. {i}
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}
