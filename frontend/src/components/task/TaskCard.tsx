// react
import { useState } from "react";
import { PiDotsThreeCircleVerticalThin } from "react-icons/pi";
import { IoCloseSharp } from "react-icons/io5";

import { formDataInitialState } from '../createTaskForm/constants'

// context
import { TaskContext } from "../../context/TaskContext";
import { useContext } from "react";

// redux
import { useAppSelector } from "../../redux/hooks";
// import { submitTask } from '../../redux/submission/submissionSlice'

// Types
import type { EditTaskType } from "../../types/types";
type TaskType = typeof formDataInitialState 
type AppProps = {
   setDarken: React.Dispatch<React.SetStateAction<boolean>>;
   setItem: React.Dispatch<React.SetStateAction<string>>;
   task: TaskType
   handleUpdateTask: (task: EditTaskType) => void
   deleteTask: (taskId:string) => void
}


export default function TaskCard ({setDarken, setItem, task, handleUpdateTask, deleteTask}:AppProps){
   const {putSetTaskToEdit, setToggleLocalStorage} = useContext(TaskContext) // This will be deprecated...
   const { setCurrentTask} = useContext(TaskContext) 

   const role = useAppSelector(state => state.auth.user?.role)?.toString()
   console.log("TaskCard role: ", role);

   const auth = useAppSelector(state => state.auth)
   console.log("TaskCard auth: ", auth);


   const [openMenu, setOpenMenu] = useState(false);

   const handleEditTask = () => {
      setOpenMenu(false) 
      setDarken(true)
      setItem("edit")
      handleUpdateTask(task)
   }

   const handleSubmitTask = async() => {
      localStorage.setItem("background","semidark") 
      localStorage.setItem("formName", "submitTaskForm")
      setOpenMenu(false) 
      setToggleLocalStorage() 
   }

   return(
      <div className="border-2 border-purple-200 m-1 px-5 py-4 flex relative h-48 justify-between">

         <div className="flex space-x-5">
            <div className="min-w-32 h-40 border-2">
               {
                  task?.image?
                  <img className="w-full h-full" src={task.image} alt="main" />:""
               }
            </div>

            <div className="flex flex-col justify-between">

               <h1>{task?.title}</h1>
               <h2>{task?.description}</h2>
               <div className="flex flex-row justify-between">
                  <h3>{task?.deadline}</h3>
                  <h3>{task?.status}</h3>
               </div>
               
            </div>            
         </div>


         <div className="">
            <PiDotsThreeCircleVerticalThin className="w-7 h-7 float-right cursor-pointer" onClick={() => {setOpenMenu(true), putSetTaskToEdit(task), setCurrentTask(task)}}/>
            {
               openMenu && 
               <div className="bg-white border-2 border-red-200 pt-2 px-5 rounded-md absolute h-40 right-1 flex flex-col">
                  <div  className="flex justify-end -mr-2 cursor-pointer" onClick={() => setOpenMenu(false)}> <IoCloseSharp /> </div>
                  {
                     role === "ADMIN"?
                     <div className="justify-between  space-y-1">
                        <div onClick={() => {setOpenMenu(false), setDarken(true), setItem("assignUser")}} className="cursor-pointer hover:underline">Assign user</div>
                        <div onClick={() => {setOpenMenu(false), setDarken(true), setItem("seeSubmission")}} className="cursor-pointer hover:underline">See submissions</div>
                        <div onClick={() => handleEditTask()} className="cursor-pointer hover:underline">Edit</div>
                        <div onClick={() =>{setOpenMenu(false), setDarken(false), deleteTask(task.taskId)}} className="cursor-pointer hover:underline">Delete</div>  
                     </div>

                     :
                     <div className="justify-between  space-y-1">
                        {/* <div onClick={() => {setOpenMenu(false), setDarken(true), setItem("assignUser")}} className="cursor-pointer hover:underline">Assign to me</div> */}
                        {/* <div onClick={() => {setOpenMenu(false), setDarken(true), setItem("seeSubmission")}} className="cursor-pointer hover:underline">Submit</div> */}
                        <div onClick={() => handleSubmitTask()} className="cursor-pointer hover:underline">Submit</div>
                     </div>
                  }
                 
               </div>
            }
         </div>
         

      </div>
   )
}

// https://react-icons.github.io/react-icons/search/#q=close