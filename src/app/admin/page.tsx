"use client";
import { useState } from "react";
import { MmebersType } from "../finalRegister/page";

type team = {
  team: string;
  members: MmebersType[];
  score: number;
  registered: boolean;
};

export default function Admin() {
  const [teamSelect, setTeamSelect] = useState(false);
  const [teams, setTeams] = useState<team[]>([
    { team: "hello", members: [], score: 10, registered: false },
  ]);
  const [currentTeam, setCurrentTeam] = useState<team>();
  const [tabs, setTabs] = useState<number>(1);
  const rowsPerPage = 10;

  const handleNext = () => {
    if (tabs < Math.ceil(teams.length / rowsPerPage)) {
      setTabs(tabs + 1);
    }
  };

  const handlePrevious = () => {
    if (tabs > 1) {
      setTabs(tabs - 1);
    }
  };

  const startRow = (tabs - 1) * rowsPerPage;
  const endRow = startRow + rowsPerPage;
  const currentTeams = teams.slice(startRow, endRow);

  return !teamSelect ? (
    <div className="w-dvw h-dvh flex flex-col">
      <div className="p-4 md:p-16 border-b-2 border-white">
        <div className="text-4xl text-slate-100">Teams</div>
      </div>
      <div className="p-16 text-slate-100">
        <table className="table table-fixed w-full text-center">
          <thead className="bg-slate-700">
            <tr>
              <th className="border-2 border-slate-400">Team</th>
              <th className="border-2 border-slate-400">TeamLead</th>
              <th className="border-2 border-slate-400">members</th>
              <th className="border-2 border-slate-400">Score</th>
              <th className="border-2 border-slate-400">Registered</th>
            </tr>
          </thead>
          <tbody className="bg-slate-500">
            {currentTeams.map((team, index) => (
              <tr key={index}>
                <td
                  className="border-2 border-slate-400 border-t-0 hover:text-slate-950"
                  onClick={() => (setCurrentTeam(team), setTeamSelect(true))}
                >
                  {team.team}
                </td>
                <td className="border-2 border-slate-400 border-t-0 ">
                  {team.members.length > 0 ? team.members[0].email : null}
                </td>
                <td className="border-2 border-slate-400 border-t-0 ">
                  {team.members.length}
                </td>
                <td className="border-2 border-slate-400 border-t-0 ">
                  {team.score}
                </td>
                <td className="border-2 border-slate-400 border-t-0 ">
                  {team.registered ? "true" : "false"}
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot className="bg-slate-700">
            <tr>
              <td colSpan={5} className="border-2 border-slate-400">
                <div className="flex justify-between items-center">
                  <button
                    onClick={handlePrevious}
                    disabled={tabs === 1}
                    className="px-4 py-2 bg-slate-600 text-white disabled:opacity-50"
                  >
                    Previous
                  </button>
                  <span>
                    Page {tabs} of {Math.ceil(teams.length / rowsPerPage)}
                  </span>
                  <button
                    onClick={handleNext}
                    disabled={tabs === Math.ceil(teams.length / rowsPerPage)}
                    className="px-4 py-2 bg-slate-600 text-white disabled:opacity-50"
                  >
                    Next
                  </button>
                </div>
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  ) : (
    <div className="w-dvw h-dvh p-2 md:p-16">
      {" "}
      <h1 className=" pt-14 text-white text-xl">
        <span className="opacity-85  text-indigo-700">Team:&nbsp;</span>
        {currentTeam?.team}
      </h1>
      <div className=" mt-11 w-full grid grid-cols-1 lg:grid-cols-3 gap-5 ">
        {currentTeam?.members?.map((member, index) => (
          <div
            key={index}
            className=" bg-slate-900 border-2 border-slate-800 p-8 col-span-1 rounded-lg shadow-xl"
          >
            <div className=" w-full text-white font-sans flex items-center text-lg pt-3 border-t-2 border-indigo-700">
              <span className=" opacity-85"> name: &nbsp;</span> {member.name}
              {index == 0 && (
                <div className=" text-white font-sans text-sm pt-3">(lead)</div>
              )}
            </div>
            <div className=" w-full text-white font-sans text-lg pt-3">
              <span className=" opacity-85">email:</span> {member.email}
            </div>
            <div className=" w-full text-white font-sans text-lg pt-3">
              <span className=" opacity-85">ieeid:</span>{" "}
              {member.ieeeId === "" ? "null" : member.ieeeId}
            </div>
            <div className=" w-full text-white font-sans text-lg pt-3">
              <span className=" opacity-85">branch:</span> {member.branch}
            </div>
            <div className=" w-full text-white font-sans text-lg pt-3">
              <span className=" opacity-85">college:</span> {member.college}
            </div>
            <div className=" w-full text-white font-sans text-lg pt-3 pb-4 border-b-2 border-indigo-700">
              <span className=" opacity-85">country:</span> {member.country}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
