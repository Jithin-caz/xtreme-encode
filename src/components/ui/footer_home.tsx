"use client"
import React from 'react'
import Image from 'next/image'
export default function Footerhome()
{
    return (
        <footer className=' bg-gray-900 grid grid-cols-1 mt-1 md:grid-cols-5 py-5 shadow-inner relative gap-y-4'>
            <div className='flex gap-y-3 flex-col items-center justify-end col-span-1 md:col-span-5 lg:col-span-1 text-white font-bold pr-4 py-6 text-2xl border-b-2 lg:border-b-0 rounded-md border-gray-700'>
                Extreme Encode <br />
               <div className=' flex'>
               <Image
          src="/images/encide_logo-removebg-preview.png"
          className=" w-20"
          alt=""
          width={100}
          height={100}
        />
        <Image
          src="/images/white.png"
          className=" w-20"
          alt=""
          width={100}
          height={100}
        />
                </div> 
                <img src="" alt="" />
            </div>
            <div className='flex items-center col-span-1 md:col-span-2 py-6 lg:border-l-2 rounded-md border-gray-700 text-white px-5'>
                Developed by web team of ENCIDE MACE <br />
                ©Copyright ENCIDE MACE. All Rights Reserved.</div>
            <div className='col-span-1 px-5 md:col-span-2 flex gap-y-4 flex-col justify-center items-center md:border-l-2 rounded-md border-gray-700'>
                <div className=' flex w-full gap-x-2'>
                    <a  target='_blank' href='https://www.instagram.com/encide_official/'>
                <img width="25" height="25" 
                className=' opacity-75 hover:opacity-100'
                src="https://img.icons8.com/ios-filled/50/FFFFFF/instagram-new--v1.png"  alt="instagram-new--v1"/></a>
                  <a
                  target='_blank'
                  href='https://www.linkedin.com/search/results/all/?fetchDeterministicClustersOnly=true&heroEntityKey=urn%3Ali%3Aorganization%3A102619777&keywords=encide%20mace&origin=RICH_QUERY_SUGGESTION&position=0&searchId=fb247222-763e-4932-9c6c-d6dcd98cfbe6&sid=c)!&spellCorrectionEnabled=false'>
                <img width="25" height="25" 
                className=' opacity-75 hover:opacity-100'
                src="https://img.icons8.com/ios-filled/50/FFFFFF/linkedin.png"  alt="instagram-new--v1"/></a>
                </div>
                <div className=' flex w-full gap-x-2 text-white'>
                <img width="25" height="25" 
                className=' opacity-75 hover:opacity-100'
                src="https://img.icons8.com/ios-filled/50/FFFFFF/mail.png"  alt="instagram-new--v1"/> encide@mace.ac.in
                </div>
            </div>
        </footer>
    )
}