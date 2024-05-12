
import { useState } from "react"
import { formDataInitialState } from "./constants"

type FormType = typeof formDataInitialState

type Props = {
   element: string // input or textArea or select
   type: string
   name: string
   label: string
   formData: FormType | null | undefined
   setFormData: React.Dispatch<React.SetStateAction<FormType >>
   value?: FormType
   errorMessage: string
   required: boolean
   pattern?: string
   options?: {value:string, label:string}[]
}

export default function InputBox(props: Props) {

   const formData = JSON.parse(JSON.stringify(props.formData))
   
   let isEmpty = true
   if (formData[props.name]){
      isEmpty = formData[props.name].length === 0
   }
   

   const [isFocus, setIsFocus] = useState(false);
   const [isBlur, setisBlur] = useState(false);
   const [isValid, setIsValid] = useState(true);

   const handleChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement> | React.ChangeEvent<HTMLSelectElement>) => {
         const formDataTemp = JSON.parse(JSON.stringify(props.formData)) 
         
         const inputValue = e.target.value 

         formDataTemp[props.name] = inputValue
         props.setFormData(formDataTemp)       
   }

   const handleFocus = () => {
      setisBlur(false)
      setIsFocus(true)
      if(formData[props.name].match(props.pattern)){
         setIsValid(true)
      } else {
         setIsValid(false)
      }
   }

   const handleBlur = () => {
      setisBlur(true)
      setIsFocus(false)
      if(formData[props.name].match(props.pattern)){
         setIsValid(true)
      } else {
         setIsValid(false)
      }
   }

  return (
   <div className='py-3 flex justify-center'>
      <div className='w-[100%]'>

         <div className='relative'>
            {
            (isFocus || !isEmpty) && 
            <label className="text-sm absolute -top-3 left-2 bg-white px-1 text-slate-400">{props.label}</label>
            }

            {
               props.element==="input"?   
               <input 
                  type={props.type}
                  name={props.name} 
                  placeholder={(isFocus || !isEmpty)? "" : props.label} 
                  onChange={e => handleChange(e)}
                  className='outline-none border rounded-md px-3 py-3 w-full peer'
                  value={formData[props.name]}
                  pattern={props.pattern}
                  required = {props.required}
                  onBlur={() => handleBlur()}
                  onFocus = {() => handleFocus()}
               />

               : props.element==="textarea"?
               <textarea 
                  name={props.name}
                  placeholder={(isFocus || !isEmpty)? "" : props.label} 
                  onChange={e => handleChange(e)}
                  className='outline-none border rounded-md px-3 py-3 w-full'
                  value={formData[props.name]}
                  required = {props.required}
                  onBlur={() => handleBlur()}
                  onFocus = {() => handleFocus()}
               />

               : props.element==="select" &&
               <select 
                  name={props.name}
                  className={`outline-none border rounded-md px-3 py-3 w-full ${formData[props.name]!==""? "text-black": "text-gray-400" }`}
                  onChange={e => handleChange(e)}
                  required = {props.required}
                  // onBlur={() => handleBlur()}
                  // onFocus = {() => handleFocus()}
               >
                  {
                     props.options?.map((opt,i) => (
                        <option key={i} value={opt.value} className="text-black">{opt.label}</option>
                     ))
                  }
               </select>

               
            }

            {
               !isValid && isBlur && <span className="text-red-500 text-sm ">{props.errorMessage}</span> 
            }
         
         </div> 

      </div>
   </div>
  );
}