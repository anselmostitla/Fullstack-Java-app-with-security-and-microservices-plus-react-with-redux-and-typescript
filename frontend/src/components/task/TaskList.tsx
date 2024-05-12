import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { updateTask, deleteTask, fetchTasks } from "../../redux/task/TaskSlice";
import TaskCard from "./TaskCard";
import { EditTaskType, TaskStatus } from "../../types/types";

type Props = {
  setDarken: React.Dispatch<React.SetStateAction<boolean>>;
  setItem: React.Dispatch<React.SetStateAction<string>>;
  filter: TaskStatus
}

export default function TaskList(props: Props) {
   const dispatch = useAppDispatch()
   let tasks = useAppSelector(state => state.task.tasks)

   if(props.filter !== TaskStatus.ALL){
    tasks = tasks.filter(task => task.status === props.filter)
   }

  const eliminateTask = (taskId: string) => {
    dispatch(deleteTask(taskId))
  }

  const handleUpdateTask = (task: EditTaskType) => {
    dispatch(updateTask(task))
  }

   useEffect(() => {
    dispatch(fetchTasks())
   },[dispatch])

  return (
    <div>
      { tasks
        .map((task, i) => (
          <TaskCard key={i}
            setDarken={props.setDarken} 
            setItem={props.setItem}
            task={task}
            handleUpdateTask={handleUpdateTask}
            deleteTask = {eliminateTask}
          />
        ))
      }
    </div>
  );
}