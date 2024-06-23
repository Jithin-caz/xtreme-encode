"use client";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
  team: string;
};

const addTeammateToTeam = async (teams: string, member: any) => {
  try {
    console.log("team in add to team is");
    console.log(teams);
    console.log("add teammate to team");
    console.log(member);
    const team = teams.toLowerCase();
    const response = await axios.put("/api/addteammate", { team, member });
    return response.data;
  } catch (error) {
    console.error("Error adding teammate to team:", error);
    throw error;
  }
};

const createUser = async (userData: any) => {
  try {
    const authemail = localStorage.getItem("email");
    const response = await axios.post("/api/createuser", {
      ...userData,
      authemail,
    });
    console.log(response);
    return response.data.acknowledged;
  } catch (error) {
    console.error("Error creating User:", error);
    throw error;
  }
};

const fetchUser = async (email: string) => {
  try {
    const response = await axios.get("/api/fetchUser", {
      params: { email },
    });
    console.log("in fetch user");
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching user:", error);
    throw error;
  }
};

const fetchTeam = async (teams: string, mem: UserData) => {
  try {
    const team = teams.toLowerCase();
    const response = await axios.post("/api/createteam", {
      team,
      members: [mem],
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching team:", error);
    throw error;
  }
};

const deleteUserFromTeam = async (email: string, teams: string) => {
  try {
    const team = teams.toLowerCase();
    const response = await axios.delete("/api/deleteuser", {
      data: { email, team },
    });
    return response.data;
  } catch (error) {
    console.error("Error deleting user:", error);
    throw error;
  }
};

export default function Dash() {
  const notifyerr = (msg: string) => {
    toast.error(msg, {
      position: "top-center",
    });
  };

  const notifsuccess = (msg: string) => {
    toast.success(msg, {
      position: "top-center",
    });
  };

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
    team: "",
  });

  const [teamMembers, setTeamMembers] = useState<UserData[] | null>(null);

  useEffect(() => {
    const email = localStorage.getItem("email");
    console.log("email in dash " + email);
    if (email)
      fetchUser(email).then((data) => {
        if (data.user) setCurrentUserData(data.user);
      });
  }, []);

  useEffect(() => {
    console.log("in dash //");
    console.log(currentUserData);
    fetchTeam(currentUserData.team.toLowerCase(), currentUserData).then(
      (team) => {
        console.log("team");

        team.message != "error!! required field team not found" &&
          setTeamMembers(team.team.members);
        console.log("team members are");
        console.log(teamMembers);
        console.log(team);
      }
    );
  }, [currentUserData]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const member = { ...userData, team: currentUserData.team };
      const { name, email, ieeeId: IEEEID } = userData;
      const team = currentUserData.team;
      const isLead = false;
      const user = { name, email, IEEEID, isLead, team: team };

      console.log(user);
      console.log(member);

      const teamRes = await addTeammateToTeam(team, member);

      if (teamRes.message === "teammate added successfully") {
        notifsuccess(teamRes.message);
        const res = await createUser(user);
      } else notifyerr(teamRes.message);

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

      fetchTeam(currentUserData.team, currentUserData).then((team) => {
        setTeamMembers(team.team.members);
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
      const team = currentUserData.team;
      const response = await deleteUserFromTeam(email, team);
      console.log(response.message);

      fetchTeam(currentUserData.team, currentUserData).then((team) => {
        setTeamMembers(team.team.members);
      });
    } catch (error) {
      console.error("Failed to delete user:", error);
    }
  };

  return (
    <div className="container relative flex flex-col place-items-center place-content-center">
      <ToastContainer />

      <div className="py-16 md:px-48 w-full">
        <div className="px-4 text-3xl py-8">Welcome {currentUserData.name}</div>
        <div className="px-4 border-b-2 border-white flex justify-between mb-8">
          <h2 className="text-2xl ">{currentUserData.team}</h2>
          <button
            className=" bg-blue-700 px-4 m-1 border-2 border-slate-600 hover:bg-blue-400 duration-150 rounded-sm"
            onClick={() => setAddMember(true)}
          >
            + Add Member
          </button>
        </div>

        <div className="px-4 flex flex-col md:grid md:grid-cols-3 md:gap-x-4 gap-y-4">
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
            teamMembers.map(
              (member, index) =>
                index != 0 && (
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
                )
            )}
        </div>
        <div className="flex flex-col place-items-center pt-16">
          <a
            href="/finalRegister"
            className="w-1/4 min-w-24 bg-blue-700 py-2 rounded-sm text-center hover:bg-blue-900"
          >
            Register
          </a>
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
