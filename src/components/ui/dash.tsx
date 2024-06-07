"use client";
import axios from "axios";

import React, { useState } from "react";
type userData = {
  name: string;
  country: string;
  ieeeId: string;
  college: string;
  branch: string;
  contact: string;
  email: string;
};

const addTeammateToTeam = async (teamname: any, member: any) => {
  try {
    const response = await axios.put("/api/addteammate", { teamname, member });
    return response.data;
  } catch (error) {
    console.error("Error adding teammate to team:", error);
    throw error;
  }
};

const createUser = async (userData: any) => {
  try {
    const response = await axios.post("/api/createuser", userData);
    return response.data;
  } catch (error) {
    console.error("Error creating User:", error);
    throw error;
  }
};

export default function Dash() {
  const [addMember, setAddMember] = useState(false);
  const [userData, setUserData] = useState<userData>({
    name: "",
    country: "",
    ieeeId: "",
    college: "",
    branch: "",
    contact: "",
    email: "",
  });
  const teamname = "qqq2";
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const member = userData;
      const name = userData.name;
      const email = userData.name + "admin@gmail.com";
      const IEEEID = userData.ieeeId;
      const team = teamname;
      const isLead = false;
      const user = { name, email, IEEEID, isLead, team };
      console.log(user);
      console.log(member);
      const response = await addTeammateToTeam(teamname, member);
      const userResponse = await createUser(user);
      console.log(userResponse.message);
      console.log(response.message);
    } catch (error) {
      console.log("Failed to add to team.");
    }
  };

  const [teamMember1, setTeamMember1] = useState<userData | null>({
    name: "",
    country: "",
    ieeeId: "",
    college: "",
    branch: "",
    contact: "",
    email: "",
  });
  const [teamMember2, setTeamMember2] = useState<userData | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  return (
    <div className="container relative flex flex-col place-items-center place-content-center">
      <div className="py-16 px-48 w-full">
        <div className="text-3xl py-8">Welcome Name</div>
        <div className="border-b-2 border-white flex justify-between mb-8">
          <h2 className="text-2xl ">Team Name</h2>
          <button
            className=" bg-blue-700 px-4 m-1 border-2 border-slate-600 hover:bg-blue-400 duration-150 rounded-sm"
            onClick={() => setAddMember(true)}
          >
            + Add Member
          </button>
        </div>
        <div className="flex flex-col md:grid md:grid-cols-3 md:gap-x-4">
          <div className="cols-span-1 p-8 min-w-50  rounded-sm bg-slate-800">
            <div className="flex justify-between">
              <h3 className="text-2xl pb-4">Team Leader</h3>
            </div>
            <ul className="px-6">
              <li>Name : </li>
              <li>Email : </li>
              <li>College : </li>
            </ul>
          </div>
          {teamMember1 !== null ? (
            <div className="cols-span-1 p-8 min-w-50 rounded-sm bg-slate-800">
              <div className="flex justify-between">
                <h3 className="text-2xl pb-4">Team member 1</h3>
                <div>
                  <svg
                    className="h-6 w-6 text-red-500"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    strokeWidth="2"
                    stroke="currentColor"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path stroke="none" d="M0 0h24v24H0z" />
                    <circle cx="12" cy="12" r="9" />
                    <path d="M10 10l4 4m0 -4l-4 4" />
                  </svg>
                </div>
              </div>
              <ul className="px-6">
                <li>Name: {teamMember1.name}</li>
                <li>Email: {teamMember1.email}</li>
                <li>College: {teamMember1.college}</li>
              </ul>
            </div>
          ) : null}
          {teamMember2 !== null ? (
            <div className="cols-span-1 p-8 min-w-50 rounded-sm bg-slate-800">
              <div className="flex justify-between">
                <h3 className="text-2xl pb-4">Team member 1</h3>
                <div>
                  <svg
                    className="h-6 w-6 text-red-500"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    strokeWidth="2"
                    stroke="currentColor"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path stroke="none" d="M0 0h24v24H0z" />
                    <circle cx="12" cy="12" r="9" />
                    <path d="M10 10l4 4m0 -4l-4 4" />
                  </svg>
                </div>
              </div>
              <ul className="px-6">
                <li>Name: {teamMember2.name}</li>
                <li>Email: {teamMember2.email}</li>
                <li>College: {teamMember2.college}</li>
              </ul>
            </div>
          ) : null}
        </div>
      </div>
      {addMember && (
        <div className="form absolute w-1/2 bg-slate-900 px-16 py-8 shadow-gray-800 shadow-lg rounded">
          <div className="flex justify-between">
            <div className="text-xl pb-8">Enter Team member detail</div>
            <div className="p-1">
              <svg
                className="h-6 w-6 text-gray-300 hover:text-red-500"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                stroke-width="2"
                stroke="currentColor"
                fill="none"
                stroke-linecap="round"
                stroke-linejoin="round"
                onClick={() => setAddMember(false)}
              >
                {" "}
                <path stroke="none" d="M0 0h24v24H0z" />{" "}
                <line x1="18" y1="6" x2="6" y2="18" />{" "}
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </div>
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
            <div className="flex flex-col pb-8">
              <input
                type="text"
                name="email"
                required
                placeholder="Email"
                value={userData.email}
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
            <div className="flex flex-col place-items-center">
              <button
                type="submit"
                className="w-1/4 min-w-24 bg-blue-700 py-2 rounded-sm"
              >
                Add member
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
