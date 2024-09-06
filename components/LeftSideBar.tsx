import React from 'react'
import { Reveal } from './Reveal'

function LeftSideBar() {
  return (
    <div className=' text-white  border-neutral-800 w-[320px]  absolute z-50 mt-[160px]  left-7'>
        <h2 className=' font-bold  text-xl  text-center'>Players</h2>
        <div className='flex  px-4 flex-col gap-4 mt-5 max-h-[400px] overflow-y-scroll'>
        <User/>
        <User/>
        <User/> <User/> <User/> <User/>
      
        </div>
       
    </div>
  )
}
function User(){
    return <div className=' font-medium '>
        <div> 🧞‍♀️ Pratim</div>
    </div>
}
export default LeftSideBar