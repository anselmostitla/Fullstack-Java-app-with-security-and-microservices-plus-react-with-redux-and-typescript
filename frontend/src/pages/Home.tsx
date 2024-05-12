// React
import { useEffect, useState } from 'react'
import { IoCloseSharp } from 'react-icons/io5'

// Components
import UserList from '../components/user/UserList'
import TaskList from '../components/task/TaskList'
import CreateTaskForm from '../components/createTaskForm/Form'
import EditTaskForm from '../components/editTaskForm/Form'
import SubmitTaskForm from '../components/taskForms/submitTaskForm/Form'
// import SubmissionCard from '../components/SubmissionCard'

// Some utils
import { MakeScreenDark } from '../components/SemidarkScreen'

// Types
import { TaskStatus } from '../types/types'

// Redux
import { useAppSelector } from '../redux/hooks'

// Context
import { TaskContext } from '../context/TaskContext'
import { useContext } from 'react'
import SubmissionList from '../components/submission/SubmissionList'


export default function Home() {
  const role = useAppSelector(state => state.auth.user?.role)
  const { toggleLocalStorage } = useContext(TaskContext)

  const CREATE_NEW_TASK = 'Create New Task'

  const menu = [
    {
      name: 'Home',
      value: TaskStatus.Home,
      role: ['ADMIN', 'USER'],
      open: false,
    },
    {
      name: 'DONE',
      value: TaskStatus.DONE,
      role: ['ADMIN', 'USER'],
      open: false,
    },
    { name: 'ASSIGNED', 
      value: TaskStatus.ASSIGNED, 
      role: ['ADMIN'], 
      open: false 
    },
    {
      name: 'NOT ASSIGNED',
      value: TaskStatus.PENDING,
      role: ['ADMIN'],
      open: false,
    },
    { name: CREATE_NEW_TASK, value: TaskStatus.CREATE_NEW_TASK, role: ['ADMIN'], open: false },
    {
      name: 'Notification',
      value: TaskStatus.NOTIFICATION,
      role: ['USER'],
      open: false,
    },
  ]

  const [activeMenu, setActiveMenu] = useState(TaskStatus.Home)
  const [darken, setDarken] = useState(false)
  const [createTask, setCreateTask] = useState(false)
  const [filterTask, setFilterTask] = useState(TaskStatus.ALL);

  const [item, setItem] = useState('')

  const handleMenu = (itemName: TaskStatus) => {

    setActiveMenu(itemName)

    if (itemName === TaskStatus.CREATE_NEW_TASK) {
      setCreateTask(true)
      setDarken(true)
    } else if (itemName === TaskStatus.Home) {
      setFilterTask(TaskStatus.ALL)
    } else {
      setFilterTask(itemName)
    }
  }

  const handleModal = (itemName: string) => {
    setDarken(false)

    if (itemName === '') {
      setCreateTask(false)
      setActiveMenu(TaskStatus.Home)
    }
  }

  useEffect(() => {
    // console.log("toggleLocalStorage: ",toggleLocalStorage.toString());
  },[toggleLocalStorage])

  return (
    <div className="flex flex-row min-h-screen relative">
      {/* LEFT PART -- sidebar -- */}
      <div className="mx-3 bg-slate-50 w-3/12 flex p-7 flex-col justify-between pb-10 my-2">
        <div className=" text-green-900 rounded-full w-32 h-32 font-semibold p-5 text-center items-center flex border-2 border-green-600 mx-auto cursor-pointer">
          Day Planner
        </div>

        {menu
          .filter((item) => item.role.includes(role as string))
          .map((item, i) => (
            <div
              key={i}
              onClick={() => handleMenu(item.value)}
              className={`w-full rounded-full px-5 py-3 border-2 border-green-600 mx-auto text-center cursor-pointer ${
                (activeMenu === item.value )
                  ? ' bg-green-400 border-green-500 text-white font-semibold'
                  : ''
              }`}
            >
              {item.name}
            </div>
          ))}
      </div>

      {/* RIGHT PART -- filtered tasks -- */}
      <div className="w-9/12 max-h-screen overflow-auto my-2">
        <TaskList setDarken={setDarken} setItem={setItem} filter={filterTask}/>
      </div>

      <div
        className={`${
          darken ? 'absolute' : 'hidden'
        } w-full h-full bg-neutral-500 opacity-50`}
      ></div>

      {/*MODALS OR POP-UPS*/}
      <div
        className={`${
          darken ? 'absolute' : 'hidden'
        } w-full h-full flex flex-col items-center pt-3`}
      >
        {
          item === 'assignUser' ? (
            <div
              className={`border-2 border-red-400 rounded-md bg-white w-[40%] h-[80%] flex flex-col overflow-auto `}
            >
              <div className="w-full  flex justify-end p-5">
                <div 
                  className="w-7 h-7 rounded-full bg-slate-300 flex items-center justify-center hover:cursor-pointer"
                  onClick={() => {setDarken(false)}}
                >
                  <IoCloseSharp />
                </div>
              </div>

              <UserList setDarken={setDarken}/>

            </div>
          ) 
          
          : item === 'seeSubmission' ? (
            <div className={`border-2 border-red-400 rounded-md w-[50%] mx-auto`}>
              {/* <SubmissionCard setDarken = {setDarken}/> */}
              <SubmissionList setDarken={setDarken}/>
            </div>
          ) 
           
          :  item === 'edit' ? (
            <div className="w-[40%]">
              <EditTaskForm
                formTitle={'Edit task'}
                // handleForms={handleForms}
                // setItem={setItem}
                handleModal = {handleModal}
              />
            </div>
          )

          :""

          // : item === 'delete' && 
          // <div className='w-full h-full bg-purple-300 '> del </div>
          
          
        }
      </div>

      {/* MODAL - [Create New Task] */}
      <div
        className={`${
          createTask ? 'absolute' : 'hidden'
        } w-full h-full flex flex-col items-center pt-3`}
      >
        <div className="w-[40%] ">
          <CreateTaskForm formTitle={'Create task'} handleModal={handleModal} />
        </div>
      </div>

      <MakeScreenDark />
      <div className={`${localStorage.getItem("formName") === "submitTaskForm"? "absolute": "hidden"} w-full h-full flex flex-col items-center pt-3`}>
        <div className="w-[40%] ">
          <SubmitTaskForm formTitle={'Submit Task'} closeButton={true}/>
        </div>
      </div>


      

    </div>
  )
}
