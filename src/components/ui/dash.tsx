"use client";
import axios from "axios";
import React, { useState, useEffect } from "react";

type UserData = {
  name: string;
  country: string;
  ieeeId: string;
  college: string;
  branch: string;
  contact: string;
  email: string;
};

type UserData1 = UserData & {
  teamname: string;
};

const addTeammateToTeam = async (teamname: string, member: UserData) => {
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

const fetchUser = async (email: string) => {
  try {
    const response = await axios.get("/api/user", {
      params: { email },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching user:", error);
    throw error;
  }
};

const fetchTeam = async (teamname: string, mem: UserData) => {
  try {
    const response = await axios.post("/api/createteam", {
      teamname,
      members: [mem],
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching team:", error);
    throw error;
  }
};

const deleteUserFromTeam = async (email: string, teamname: string) => {
  try {
    const response = await axios.delete("/api/deleteuser", {
      data: { email, teamname },
    });
    return response.data;
  } catch (error) {
    console.error("Error deleting user:", error);
    throw error;
  }
};

export default function Dash({ userEmail }: { userEmail: any }) {
  const [addMember, setAddMember] = useState(false);
  const [userData, setUserData] = useState<UserData>({
    name: "",
    country: "",
    ieeeId: "",
    college: "",
    branch: "",
    contact: "",
    email: "",
  });

  const [currentUserData, setCurrentUserData] = useState<UserData1>({
    name: "",
    country: "",
    ieeeId: "",
    college: "",
    branch: "",
    contact: "",
    email: "",
    teamname: "",
  });

  const [teamMembers, setTeamMembers] = useState<UserData[] | null>(null);

  useEffect(() => {
    if (userEmail) {
      fetchUser(userEmail).then((data) => setCurrentUserData(data));
    }
  }, [userEmail]);

  useEffect(() => {
    fetchTeam(currentUserData.teamname, currentUserData).then((team) => {
      setTeamMembers(team.members);
    });
  }, [currentUserData]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const member = userData;
      const { name, email, ieeeId: IEEEID } = userData;
      const { teamname: team } = currentUserData;
      const isLead = false;
      const user = { name, email, IEEEID, isLead, team };

      console.log(user);
      console.log(member);

      await addTeammateToTeam(team, member);
      await createUser(user);

      setAddMember(false);
      setUserData({
        name: "",
        country: "",
        ieeeId: "",
        college: "",
        branch: "",
        contact: "",
        email: "",
      });

      fetchTeam(currentUserData.teamname, currentUserData).then((team) => {
        setTeamMembers(team.members);
      });
    } catch (error) {
      console.log("Failed to add to team.", error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleDelete = async (mem: UserData) => {
    try {
      const email = mem.email;
      const teamname = currentUserData.teamname;
      const response = await deleteUserFromTeam(email, teamname);
      console.log(response.message);

      fetchTeam(currentUserData.teamname, currentUserData).then((team) => {
        setTeamMembers(team.members);
      });
    } catch (error) {
      console.error("Failed to delete user:", error);
    }
  };

  return (
    <div className="container relative flex flex-col place-items-center place-content-center">
      <div className="py-16 px-48 w-full">
        <div className="text-3xl py-8">Welcome {currentUserData.name}</div>
        <div className="border-b-2 border-white flex justify-between mb-8">
          <h2 className="text-2xl ">{currentUserData.teamname}</h2>
          <button
            className=" bg-blue-700 px-4 m-1 border-2 border-slate-600 hover:bg-blue-400 duration-150 rounded-sm"
            onClick={() => setAddMember(true)}
          >
            + Add Member
          </button>
        </div>
        <div className="flex flex-col md:grid md:grid-cols-3 md:gap-x-4">
          <div className="cols-span-1 p-8 min-w-50 rounded-sm bg-slate-800">
            <div className="flex justify-between">
              <h3 className="text-2xl pb-4">Team Leader</h3>
            </div>
            <ul className="px-6">
              <li>Name: {currentUserData.name}</li>
              <li>Email: {currentUserData.email}</li>
              <li>College: {currentUserData.college}</li>
            </ul>
          </div>
          {teamMembers != null &&
            teamMembers.map((member, index) => (
              <div
                key={index}
                className="cols-span-1 p-8 min-w-50 rounded-sm bg-slate-800"
              >
                <div className="flex justify-between">
                  <h3 className="text-2xl pb-4">Team member {index + 1}</h3>
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
                      onClick={() => handleDelete(member)}
                    >
                      <path stroke="none" d="M0 0h24v24H0z" />
                      <circle cx="12" cy="12" r="9" />
                      <path d="M10 10l4 4m0 -4l-4 4" />
                    </svg>
                  </div>
                </div>
                <ul className="px-6">
                  <li>Name: {member.name}</li>
                  <li>Email: {member.email}</li>
                  <li>College: {member.college}</li>
                </ul>
              </div>
            ))}
        </div>
        <div className="flex flex-col place-items-center pt-16">
          <button className="w-1/4 min-w-24 bg-blue-700 py-2 rounded-sm">
            Register
          </button>
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
                <path stroke="none" d="M0 0h24v24H0z" />
                <line x1="18" y1="6" x2="6" y2="18" />
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
