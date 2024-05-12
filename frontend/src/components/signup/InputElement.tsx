
import { useState } from "react"
import { FormDataInfo, OptionsI } from "./constants"


interface Props {
   element: string // input or textArea or select
   type: string
   name: string
   formData: FormDataInfo | null | undefined
   setFormData: React.Dispatch<React.SetStateAction<FormDataInfo >>
   errorMessage: string
   required: boolean
   pattern?: string
   options?: OptionsI[]
}

export default function InputElement(props: Props) {

   const formData = JSON.parse(JSON.stringify(props.formData))
   const isEmpty = formData[props.name].length === 0

   const [isFocus, setIsFocus] = useState(false);
   const [isBlur, setisBlur] = useState(false);
   const [isValid, setIsValid] = useState(true);

   

   const handleChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement> | React.ChangeEvent<HTMLSelectElement>) => {
         const formDataTemp = JSON.parse(JSON.stringify(props.formData))
         formDataTemp[props.name] = e.target.value 
         props.setFormData(formDataTemp)       
   }

   const capitalize = (word:string) => {
      return word.slice(0,1).toUpperCase() + word.slice(1,word.length)
   }

   const separator = (word:string) => {
      let newWord = word
      for(const letter of word){
         if(letter == letter.toUpperCase()){
            newWord = newWord.replace(letter, " "+ letter.toLowerCase())
         }
      }
      return capitalize(newWord)
   }

   const handleFocus = () => {
      setisBlur(false)
      setIsFocus(true)
      console.log("formData[props.name].match(props.pattern): ", formData[props.name].match(props.pattern));
      if(formData[props.name].match(props.pattern)){
         setIsValid(true)
      } else {
         setIsValid(false)
      }

   }

   const handleBlur = () => {
      setisBlur(true)
      setIsFocus(false)
      console.log("formData[props.name].match(props.pattern): ", formData[props.name].match(props.pattern));
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
            <label className="text-sm absolute -top-3 left-2 bg-white px-1 text-slate-400">{separator(props.name)}</label>
            }

            {
               props.element==="input"?   
               <input 
                  type={props.type}
                  name={props.name} 
                  placeholder={(isFocus || !isEmpty)? "" : separator(props.name)} 
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
                  placeholder={(isFocus || !isEmpty)? "" : separator(props.name)} 
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
                  {/* <option className="text-gray-400" value="">Role</option> */}
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