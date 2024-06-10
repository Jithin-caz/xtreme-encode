"use client"
import Loading from "@/app/loading"
import axios from "axios"
import { useEffect,useState } from "react"

export type MmebersType={  
name:string,
country:string,
ieeeId:string,
college:string,
branch:string,
contact:string,
email:string,
team:string
}
export default function FinalRegistration()
{
    const [members,setMembers]=useState<MmebersType[]>([])
    
    const [team,setTeamname]=useState("")
    const [isRegistered,setIsRegistered]=useState(false)
    const [loading,setLoading]=useState(true)
    const confirmRegistration=async()=>{
        setLoading(true)
        await axios.put('api/registerteam',{
            team:team.toLowerCase()
        }).then((res)=>{
            console.log("registration complete")
            setIsRegistered(true)
            setLoading(false)
        }).catch((err)=>console.log(err))
    }
    const getTeam2=async(teams:string)=>{
        const team=teams.toLowerCase()
        console.log(`team name is ${team}`)
        await axios.post('api/createteam',{
            team
        }).then((res)=>{
            console.log(res.data.team.members)
            setMembers(res.data.team.members)
            console.log(`registered is ${res.data.registered}`)
            setIsRegistered(res.data.team.registered)
            setLoading(false)
        }).catch((err)=>console.log(err))
    }
    const getTeam=async()=>{
        setLoading(true)
        const email=localStorage.getItem('email')
        console.log(`in final register email is ${email}`)
        await axios.get('api/fetchUser', {
            params: { email },
          }).then((res)=>{
            setTeamname(res.data.user.team)
            getTeam2(res.data.user.team)
        }
          ).catch((err)=>console.log(err))
     await axios.post('api/createteam',{
            team:team.toLowerCase()
        }).then((res)=>{
            console.log(res.data.team.members)
            setMembers(res.data.team.members)
            setIsRegistered(res.data.registered)
            setLoading(false)
        }).catch((err)=>console.log(err))
    }
    useEffect(()=>{
        getTeam()
    },[])

    return !loading?<section className=" bg-slate-950 p-10 py-8 pt-16 min-h-dvh text-indigo-700">
        { isRegistered?
            <h1 className=" text-center  text-4xl font-semibold   text-indigo-700">Registration complete</h1>:
            <h1 className=" text-2xl  text-indigo-700 font-semibold">Once registered changes cannot be reverted!! <br />If you wish to edit
            , go back to the previous page</h1>}

            <h1  className=" pt-14 text-white text-xl"><span className="opacity-85  text-indigo-700">team:&nbsp;</span>{team}</h1>
               
                <div className=" mt-11 w-full grid grid-cols-1 lg:grid-cols-3 gap-5 ">
                    {
                        members.map((member,index)=>
                        <div 
                        //@ts-ignore
                        key={member} className=" bg-slate-900 border-2 border-slate-800 p-8 col-span-1 rounded-lg shadow-xl">
                           
                            <div className=" w-full text-white font-sans flex items-center text-lg pt-3 border-t-2 border-indigo-700"><span className=" opacity-85"> name: &nbsp;</span>  {member.name}
                              {index==0 &&<div className=" text-white font-sans text-sm pt-3">(lead)</div>}</div>
                            <div className=" w-full text-white font-sans text-lg pt-3"><span className=" opacity-85">email:</span> {member.email}</div>
                            <div className=" w-full text-white font-sans text-lg pt-3"><span className=" opacity-85">ieeid:</span> {member.ieeeId===""?"null":member.ieeeId}</div>
                            <div className=" w-full text-white font-sans text-lg pt-3"><span className=" opacity-85">branch:</span> {member.branch}</div>
                            <div className=" w-full text-white font-sans text-lg pt-3"><span className=" opacity-85">college:</span> {member.college}</div>
                            <div className=" w-full text-white font-sans text-lg pt-3 pb-4 border-b-2 border-indigo-700"><span className=" opacity-85">country:</span> {member.country}</div>
                        </div>)
                    }
                </div>
                {!isRegistered&&<button onClick={confirmRegistration} className=" mt-12 bg-blue-800 p-4 px-3 rounded-sm text-white hover:bg-blue-900">
                    confirm registration</button>}
    </section>:<Loading/>
}