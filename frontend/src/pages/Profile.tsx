import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { getUserProfile } from '../redux/auth/AuthSlice'

export default function Profile() {

  const dispatch = useAppDispatch()
  const auth = useAppSelector(state => state.auth)


  useEffect(()=> {
    dispatch(getUserProfile(localStorage.getItem("jwt")))
  },[dispatch])


  return (
    <div className="min-h-screen">
      <div className="flex justify-center p-5">
        <div>
          <div><span className="font-bold">Email: </span> {auth.user?.email}</div>
          <div><span className="font-bold">Name: </span> {auth.user?.name}</div>
          <div><span className="font-bold">Role: </span>  {auth.user?.role}</div>         
        </div>
     
      </div>

    </div>
  );
}

