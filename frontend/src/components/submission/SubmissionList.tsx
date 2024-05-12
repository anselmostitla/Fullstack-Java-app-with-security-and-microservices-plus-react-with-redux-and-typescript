import { useContext, useEffect } from "react"

import SubmissionCard from "./SubmissionCard"

import { useAppDispatch, useAppSelector } from "../../redux/hooks"
import { fetchSubmissionsByTaskId } from "../../redux/submission/submissionSlice"
import { IoCloseSharp } from "react-icons/io5"

import { TaskContext } from "../../context/TaskContext"


export default function SubmissionList({setDarken}:{setDarken:React.Dispatch<React.SetStateAction<boolean>>}) {
   const dispatch = useAppDispatch()
   const submissions = useAppSelector(state => state.submission.submissions)

   const { currentTask } = useContext(TaskContext)
   console.log("submissions: ", submissions);


   useEffect(() => {
      dispatch(fetchSubmissionsByTaskId(currentTask.taskId))
   },[dispatch, currentTask.taskId])

  return (
   <div className="flex justify-between p-5 bg-slate-100 relative">

      {/* CANCEL or CLOSE... BUTTON */}
      <div 
         className={` bg-slate-300 rounded-full w-7 h-7 justify-center items-center cursor-pointer right-6 flex absolute`}
         onClick={() => setDarken(false)}
      >
         <IoCloseSharp className='cursor-pointer'/>
      </div>

      {
         submissions.length !== 0?
         submissions.map((sub, i) => (
            <SubmissionCard key={i} submitedTask = {sub}/>
         ))

         : 
         <div>
            There are not submissions of this task yet.
         </div>
      }




   </div>
  )
}
