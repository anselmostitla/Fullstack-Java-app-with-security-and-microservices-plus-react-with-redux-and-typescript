import {  useState } from 'react';
import {formDataInitialState, InputsProps} from './constants'
import { IoCloseSharp } from "react-icons/io5";
import InputBox from './InputBoxes';
// import { useNavigate } from 'react-router-dom';


import { useAppDispatch } from '../../redux/hooks';
import { createTask } from '../../redux/task/TaskSlice'

type utility = {
   formTitle: string
   handleModal?: (itemName:string) => void
}

export default function Form({formTitle, handleModal}:utility) {
   const dispatch = useAppDispatch()
   // const state = useAppSelector(state => state)

   // const navigate = useNavigate()

   const [formData, setFormData] = useState(formDataInitialState);
   // const [errorResponse, setErrorResponse] = useState("");
   
   

   const handleSubmit = async (e:React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      handleClose()
      console.log("handleSubmit - formData", formData);
      const answer = await dispatch(createTask(formData))
      console.log("answer: ", answer);

      if(answer.meta.requestStatus === "fulfilled"){
         setFormData(formDataInitialState)
      }
   }

   const handleClose = () => {
      if(handleModal!==undefined){
         handleModal("")
      }
   }

   

  return (
    <div className='py-3 flex flex-col w-full bg-white px-6 pt-8  relative'>

      {/* CANCEL BUTTON */}
      <div 
         className={` bg-slate-300 rounded-full w-7 h-7 justify-center items-center cursor-pointer right-6 ${handleModal===undefined? "invisible":"flex absolute"}`}
         onClick={() => handleClose()}
      >
         <IoCloseSharp className='cursor-pointer'/>
      </div>

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