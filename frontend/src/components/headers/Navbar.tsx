import { Link } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import { useAppDispatch } from "../../redux/hooks";
import { logout } from '../../redux/auth/AuthSlice'
import { useNavigate } from "react-router-dom";


export default function Navbar(){
   const jwt = localStorage.getItem("jwt")
   const dispatch = useAppDispatch()
   const navigate = useNavigate()

   const logoutHandler = () => {
      dispatch(logout())
      navigate("/")
   }

   return(
      <div>
         <div className="flex flex-row justify-between px-5 py-3 items-center bg-slate-300 shadow-md">
         
            <Link to={"/"} className="font-bold cursor-pointer">
               DAY PLANNER
            </Link>
         
            <form className="w-[40%] flex">
               <input type="text" placeholder="Search bar..." className="outline-none rounded-s-xl px-5 py-3 w-full"/>
               <div className="rounded-e-2xl py-3 w-14 bg-slate-50 flex justify-center cursor-pointer items-center">
                  <FaSearch />
               </div>
               
            </form>
            
            <div className="flex space-x-4">
               <Link to={"/about"} className="hover:underline">About</Link>
               {
                  jwt?
                  <>
                     <Link to={"/profile"} className="hover:underline">Profile</Link>
                     <div onClick={() => logoutHandler()} className="hover:underline cursor-pointer">Signout</div>
                  </>

                  :<>
                     <Link to={"/sign-in"} className="hover:underline">Sign-in</Link>
                     <Link to={"/sign-up"} className="hover:underline">Sign-up</Link>
                  </>
               }
            </div>
         
         </div>    
      </div>

   )
}