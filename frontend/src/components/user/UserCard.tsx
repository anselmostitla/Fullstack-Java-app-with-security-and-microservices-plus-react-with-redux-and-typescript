import type { User } from '../../redux/auth/AuthSlice'

import { useContext } from 'react';
import {TaskContext} from '../../context/TaskContext'

import { useAppDispatch } from '../../redux/hooks';
import { updateTask } from '../../redux/task/TaskSlice';
// {setDarken}:{setDarken:React.Dispatch<React.SetStateAction<boolean>>}
export default function UserCard({user, setDarken}: {user: User, setDarken:React.Dispatch<React.SetStateAction<boolean>>}) {

  const { taskToEdit } = useContext(TaskContext)
  const dispatch = useAppDispatch()

  const assignUser = async () => {
    // console.log("user.id: ", user.userId);
    const tempTask = JSON.parse(JSON.stringify(taskToEdit))
    tempTask.assignedUserId = user.userId
    // console.log("tempTask: ", tempTask);
    await dispatch(updateTask(tempTask))
    // console.log("answer: ", answer);
    setDarken(false)
  }

  return (
    <div className="w-full flex flex-row  p-3 space-x-5 items-center shadow-md">

      <div className="w-20 h-20 rounded-full border flex items-center">
        <img src="https://static.vecteezy.com/system/resources/previews/021/548/095/original/default-profile-picture-avatar-user-avatar-icon-person-icon-head-icon-profile-picture-icons-default-anonymous-user-male-and-female-businessman-photo-placeholder-social-network-avatar-portrait-free-vector.jpg" alt="user" />
      </div>

      <div>
        <div>{user?.email}</div>
        <div>{user?.name}</div>        
      </div>

      <div className="w-30">
         <button className=" bg-red-500 rounded-md border text-white font-semibold px-5 py-2" onClick={() => {assignUser()}}>
          Select
         </button>
      </div>

    </div>
  );
}
