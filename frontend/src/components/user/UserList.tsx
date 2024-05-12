import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { getUserList } from "../../redux/auth/AuthSlice";
import UserCard from './UserCard'

export default function UserList({setDarken}:{setDarken:React.Dispatch<React.SetStateAction<boolean>>}) {

   const dispatch = useAppDispatch()
   const users = useAppSelector(state => state.auth.users)

   useEffect(() => {
      dispatch(getUserList())
   },[dispatch])

  return (
    <div>
      {
         users.map((user,i) => (
            <UserCard key={i} 
               setDarken = {setDarken}
               user = {user}
            />
         ))
      }
      
    </div>
  );
}
