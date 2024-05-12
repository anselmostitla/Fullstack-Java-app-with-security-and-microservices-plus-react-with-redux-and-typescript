import {  useContext, useState } from 'react';
import {formDataInitialState, InputsProps} from './constants'
import { IoCloseSharp } from "react-icons/io5";
import InputBox from './InputBoxes';


import { useAppDispatch } from '../../../redux/hooks';
import { submitTask } from '../../../redux/submission/submissionSlice';

import { TaskContext } from '../../../context/TaskContext';

type utility = {
   formTitle: string
   closeButton?: boolean
}

export default function Form({formTitle, closeButton}:utility) {
   const dispatch = useAppDispatch()

   const { currentTask, setToggleLocalStorage } = useContext(TaskContext)

   // NOTE: It seems that state variable load first than context variables
   const [formData, setFormData] = useState(formDataInitialState);

   const handleSubmit = async (e:React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      handleCloseButton()
      await dispatch(submitTask({taskId:currentTask.taskId, githubLink:formData.githubLink}))
      setFormData(formDataInitialState)
   }

   const handleCloseButton = () => {
      localStorage.setItem("formName", "")
      localStorage.setItem("background", "")
      setToggleLocalStorage()
   }

  return (
    <div className='py-3 flex flex-col w-full bg-white px-6 pt-8  relative'>

      {/* CANCEL BUTTON */}
      <div 
         className={` bg-slate-300 rounded-full w-7 h-7 justify-center items-center cursor-pointer right-6 ${closeButton===false? "invisible":"flex absolute"}`}
         onClick={() => handleCloseButton()}
      >
         <IoCloseSharp className='cursor-pointer'/>
      </div>

      {/* FORM TITLE */}
      <div className='text-blue-700 text-2xl font-bold uppercase text-center pt-3'>{formTitle}</div>
      
      <form onSubmit={(e) => handleSubmit(e)} className='pt-12'>
         {
            InputsProps.map((el, i) => (
               <InputBox key={i}
                  element = {el.element}
                  type = {el.type}
                  name = {el.name}
                  label = {el.label}
                  formData={formData} 
                  setFormData={setFormData}
                  errorMessage={el.errorMessage}
                  required={el.required}
                  pattern={el.pattern}
                  options={el.options}
               />
            ))  
         }

         {/* {
            errorResponse != "" && 
            <div className='text-red-500 flex justify-center'>{errorResponse}</div>
         } */}

         <button className="px-5 py-5 bg-green-300 rounded-md border w-[100%] flex mx-auto my-10 justify-center text-2xl font-bold text-white uppercase">
            {formTitle}
         </button>   



      </form>
      
    </div>
  );
}