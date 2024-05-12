import { formDataInitialState as editTaskInitialState} from '../components/editTaskForm/constants'
import type { User } from '../redux/auth/AuthSlice'

// Types related to user
export type { User }

// Types related to submission
export type SubmissionType = {
   submissionId: string
   taskId: string
   githubLink: string
   userId: string
   status: TaskStatus
   submissionTime: string
}


// Types related to task
export type EditTaskType = typeof editTaskInitialState

export enum TaskStatus {
   ALL = "ALL",
   Home = "Home",
   PENDING = "PENDING",
   ASSIGNED = "ASSIGNED",
   DONE = "DONE",
   NOTIFICATION = "NOTIFICATION",
   CREATE_NEW_TASK = "CREATE_NEW_TASK",
}

export type TaskType = {
   taskId:string,
   title:string,
   description: string,
   image:string,
   deadline: string,
   status: TaskStatus,
   assignedUserId: string
}






