import {  useState } from 'react';
import {initialState, inputElements} from './constants'
import { IoCloseSharp } from "react-icons/io5";
import InputElement from './InputElement';
import { useNavigate } from 'react-router-dom';


import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { register } from '../../redux/auth/AuthSlice';

interface utility {
   formTitle: string
   handleModal?: (itemName:string) => void
}

export default function SignUpForm({formTitle, handleModal}:utility) {
   const dispatch = useAppDispatch()
   const auth = useAppSelector(state => state.auth)
   console.log("auth::: ", auth);
   const navigate = useNavigate()

   const [formData, setFormData] = useState(initialState);
   const [errorResponse, setErrorResponse] = useState("");
   
   

   const handleSubmit = async (e:React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      handleClose()
      const answer = await dispatch(register(formData))

      const message = answer.payload.message 

      if(message === "Register success"){
         setFormData(initialState)
         navigate("/sign-in")
      } else if(message === "Email already used"){
         setErrorResponse(message)
         setTimeout(() => {
            setErrorResponse("")
            setFormData(initialState)
         },5000)
      }
      else if(answer.payload.jwt.length === 0) {
         setErrorResponse("Something went wrong, please try again!")
         setTimeout(() => {
            setErrorResponse("")
         }, 9000)
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
            inputElements.map((el, i) => (
               <InputElement key={i}
                  element = {el.element}
                  type = {el.type}
                  name = {el.name}
                  formData={formData} 
                  setFormData={setFormData}
                  errorMessage={el.errorMessage}
                  required={el.required}
                  pattern={el.pattern}
                  options={el.options}
               />
            ))  
         }

         {
            errorResponse != "" && 
            <div className='text-red-500 flex justify-center'>{errorResponse}</div>
         }

         <button className="px-5 py-5 bg-green-300 rounded-md border w-[100%] flex mx-auto my-10 justify-center text-2xl font-bold text-white">
            {"SUBMIT"}
         </button>   



      </form>
      
    </div>
  );
}