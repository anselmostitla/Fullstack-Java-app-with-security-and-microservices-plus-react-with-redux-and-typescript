import { TaskContext } from "../context/TaskContext";
import { useContext } from "react";


export default function SemidarkScreen() {

   const handleBackground = () => {
      localStorage.setItem("background", "")
   }

  return (
   <div className={`${localStorage.getItem("background")==="semidark"? "bg-neutral-500 opacity-50 absolute":"hidden"} w-full h-full`}
      onClick={() => handleBackground()}
   >

   </div>
  );
}

// The disadvantage is that localStorage does not render when setting an item, for that reason it must be followed by the setToggleLocalStorage to render the appropiate component
export const MakeScreenDark = () => {
   const {setToggleLocalStorage } = useContext(TaskContext)

   const handleBackground = () => {
      localStorage.setItem("background", "")
      setToggleLocalStorage()
   }

   return(
      <div className={`${localStorage.getItem("background")==="semidark"? "bg-neutral-500 opacity-50 absolute":"hidden"} w-full h-full`}
      onClick={() => handleBackground()}
   >

   </div>
   )
}

// The disadvantage is that if you want to add an item or another property, you have to manually add it at the contex
export const SetScreenDark = () => {
   const { globalStorage, setGlobalStorage } = useContext(TaskContext)

   const screen = globalStorage["screen"]

   const handleBackground = () => {
      setGlobalStorage("screen", "")
   }

   return(
      <div className={`${screen==="semidark"? "bg-neutral-500 opacity-50 absolute":"hidden"} w-full h-full`}
      onClick={() => handleBackground()}
      >

      </div>
   )
}