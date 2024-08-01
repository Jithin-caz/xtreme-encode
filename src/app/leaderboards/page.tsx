'use client'

import { async } from "@firebase/util"
import axios from "axios"
import { useEffect,useState } from "react"
import Loading from "../loading"

export default function LeaderBoard(){
    const [teams, setTeams]=useState([])
    const getTeamScore=async()=>{
        await axios.get('/api/getTeams').then((response)=>{
            console.log(response.data.teams)
            setTeams(response.data.teams)
           
           
        })
    }
    useEffect(()=>{
        getTeamScore()
    },[])
    return teams.length>0?<section className=" overflow-clip min-h-dvh bg-gradient-to-br items-center from-slate-900 to-slate-800 flex flex-col p-3">
        <h1 className=" font-mono text-blue-50 text-4xl pt-7">Leaderboard</h1>
        <p className=" text-yellow-300 opacity-80 text-sm">team with same score are given same preference despite the different ranks</p>
        <div className=" w-full flex justify-center px-2">
        <table className=" mt-11 bg-slate-950 rounded-lg">
            <thead className=" sticky top-0 z-50 bg-white rounded-lg bg-opacity-90 shadow-inner backdrop-blur-sm">
                <tr>
                    <th className="px-5 py-3 text-slate-950 text-xl">Rank</th>
                    <th className="px-5 py-3 text-slate-950 text-xl">Teamname</th>
                    <th className="px-5 py-3 text-slate-950 text-xl">Score</th>
                </tr>
            </thead>
            <tbody className=" max-h-dvh overflow-scroll">
            {teams.map((team,index)=>
            //@ts-ignore
            team.score!=null&&
            <tr key={index}>
                <td  className="px-5 py-3 text-white text-center">
                    {index+1}
                </td>
                <td  className="px-5 py-3 text-white text-center">
                    {
                     //@ts-ignore
                    team.team
                }
                </td>
                <td  className="px-5 py-3 text-white text-center">
                {
                //@ts-ignore
                team.score}
                </td>
            </tr>)}
           
            </tbody>
        </table></div>
    </section>:<Loading/>
}