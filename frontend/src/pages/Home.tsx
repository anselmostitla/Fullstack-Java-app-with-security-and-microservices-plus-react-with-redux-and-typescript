import { useState } from "react"


export default function Home(){

   const menu = [
      {name:"Home", value:"Home", role:["ROLE_ADMIN", "ROLE_CUSTOMER"]},
      {name:"DONE", value:"DONE", role:["ROLE_ADMIN", "ROLE_CUSTOMER"]},
      {name:"ASSIGNED", value:"ASSIGNED", role:["ROLE_ADMIN"]},
      {name:"NOT ASSIGNED", value:"PENDING", role:["ROLE_ADMIN"]},
      {name:"Create New Task", value:"", role:["ROLE_ADMIN"]},
      {name:"Notification", value:"NOTIFICATION", role:["ROLE_CUSTOMER"]},
   ]

   const role = "ROLE_ADMIN"

   const [activeMenu, setActiveMenu] = useState("Home");
   console.log("activeMenu: ", activeMenu);

   return(
      <div className="flex flex-row">
         <div className="min-h-screen bg-green-300 w-3/12 m-1 flex p-7 rounded-xl flex-col justify-between">
            <div className=" text-green-900 rounded-full w-32 h-32 font-semibold p-5 text-center items-center flex border-2 border-green-600 mx-auto cursor-pointer">
               Task Manager
            </div>

            {
               menu.filter((item) => item.role.includes(role))
               .map(
                  item => 
                     <div onClick={() => setActiveMenu(item.name)} 
                     className={`w-full rounded-full px-5 py-3 border-2 border-green-600 mx-auto text-center cursor-pointer ${activeMenu===item.name? " bg-green-400 border-green-500 text-white font-semibold": ""}`}>
                        {item.name}
                     </div>
               )
            }

         </div>
         <div className="bg-slate-50 w-9/12 m-1 border-2 rounded-xl">dentro</div>
      </div>
   )
}