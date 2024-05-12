import { ReactNode, createContext, useState } from "react";
import type { EditTaskType } from '../types/types'
import type { TaskType } from '../types/types'
import { formDataInitialState as taskEditInitialState } from "../components/editTaskForm/constants";

// type globalStorageType = typeof globalStorageDefaultValues

const globalStorageDefaultValues = {
   screen: ""
   // add more "key":"value" properties as needed...
}

const AccountContextDefaultValues = {
   taskToEdit : taskEditInitialState,
   putSetTaskToEdit: (task: EditTaskType) => {console.log(task);},

   currentTask: taskEditInitialState,
   setCurrentTask: (task: TaskType) => { console.log(task);},

   jwt: "",
   handleSetJwt: (jwt: string) => { console.log(jwt);},

   toggleLocalStorage: false,
   setToggleLocalStorage: () => {},

   globalStorage: globalStorageDefaultValues,
   setGlobalStorage: (key:string, value:string) => {console.log(key, value);}
}

export const TaskContext = createContext(AccountContextDefaultValues)

type Props = {
   children: ReactNode
}

export function TaskProvider({children}: Props){
   const [taskToEdit, setTaskToEdit] = useState(taskEditInitialState);
   const [jwt, setJwt] = useState("");
   const [currentTask, setCurrentTaskBefore] = useState(taskEditInitialState);
   const [toggleLocalStorage, settoggleLocalStorage] = useState(false);
   const [globalStorage, setglobalStorage] = useState(globalStorageDefaultValues);

   const putSetTaskToEdit = (task: EditTaskType) => {
      setTaskToEdit(task)
   }

   const handleSetJwt = (jwt: string) => {setJwt(jwt)}
   
   const setCurrentTask = (task: EditTaskType) => {
      setCurrentTaskBefore(task)
   }

   const setToggleLocalStorage = () => {
      settoggleLocalStorage(!toggleLocalStorage)
   }

   const setGlobalStorage = (key: string, value: string) => {
      setglobalStorage({...globalStorage, [key]: value})
   }

   const value = {
      taskToEdit, putSetTaskToEdit, 
      jwt, handleSetJwt,
      currentTask, setCurrentTask, 
      toggleLocalStorage, setToggleLocalStorage,
      globalStorage, setGlobalStorage
   }  

   return (
      <TaskContext.Provider value = {value} >
         {children}
      </TaskContext.Provider>
   )
}