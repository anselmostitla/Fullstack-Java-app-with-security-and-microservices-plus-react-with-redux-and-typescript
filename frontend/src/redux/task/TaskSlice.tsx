import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { api, setAuthHeader } from "../../api/api";
import { formDataInitialState } from '../../components/createTaskForm/constants'

type TaskType = typeof formDataInitialState

export const fetchTasks = createAsyncThunk("task/fetchTasks", 
   async(status) => {
      setAuthHeader(localStorage.getItem("jwt"), api)
      try {
         const {data} = await api.get("/tasks", {
            params: {status}
         })
         // console.log("fetch tasks data: ", data);
         return data
      } catch (error) {
         console.log(error);
         return new Error("get tasks failed")
      }
   }
)

export const fetchUsersTasks = createAsyncThunk("task/fetchUsersTasks", 
   async(status) => {
      setAuthHeader(localStorage.getItem("jwt"), api)
      try {
         const {data} = await api.get("/tasks/users", {
            params: {status}
         })
         console.log("fetch users tasks data: ", data);
         
         return data
      } catch (error) {
         console.log(error);
      }
   }
)


export const fetchTasksById = createAsyncThunk("task/fetchTasksById", 
   async({taskId}:{taskId:number}) => {
      setAuthHeader(localStorage.getItem("jwt"), api)
      try {
         const {data} = await api.get(`/tasks/${taskId}`)
         console.log("fetch tasks by id data: ", data);
         return data
      } catch (error) {
         console.log(error);
      }
   }
)


export const createTask = createAsyncThunk("task/createTask",
   async(taskData:TaskType) => {
      setAuthHeader(localStorage.getItem("jwt"), api)
      try {
         const {data} = await api.post(`/tasks`, taskData)
         // console.log("created task data: ", data);
         return data
      } catch (error) {
         console.log(error);
      }
   }
)


export const updateTask = createAsyncThunk("task/updateTask",
   async(newTaskData:TaskType) => {
      setAuthHeader(localStorage.getItem("jwt"), api)
      try {
         const {data} = await api.put(`/tasks/${newTaskData.taskId}`, newTaskData)
         return data
      } catch (error) {
         console.log(error);
      }
   }
)


export const assignTaskToUser = createAsyncThunk("task/assignTaskToUser",
   async({taskId, userId}:{taskId:number, userId:number}) => {
      setAuthHeader(localStorage.getItem("jwt"), api)
      try {
         const {data} = await api.put(`/tasks/${taskId}/users/${userId}`)
         console.log("assigned task data: ", data);
         return data
      } catch (error) {
         console.log(error);
      }
   }
)


export const deleteTask = createAsyncThunk("task/deleteTask",
   async(taskId:string) => {
      setAuthHeader(localStorage.getItem("jwt"), api)
      try {
         await api.delete(`/tasks/${taskId}`)
         return taskId // it seems this is payload
      } catch (error) {
         console.log(error);
      }
   }
)


type initialStateType = {
   isLoading: boolean,
   tasks: TaskType[],
   isError:string,
   // taskDetails:null,
   usersTasks: TaskType[]
}

const initialState:initialStateType = {
   isLoading: false,
   tasks: [], // this is for admin
   isError: "",
   // taskDetails: null,
   usersTasks: []
}

export const taskSlice = createSlice({
   name: "task",
   initialState,
   reducers: {},
   extraReducers:(builder) => {
      builder
         // ----------------  FETCH ADMIN TASKS   ----------------
         .addCase(fetchTasks.pending, (state) => {
            state.isLoading = true
            state.isError = ""
         })
         .addCase(fetchTasks.fulfilled, (state, action:PayloadAction<TaskType[]>) => {
            state.isLoading = false
            state.tasks = action.payload
         })
         .addCase(fetchTasks.rejected, state => {
            state.isError = "fetchTasks.rejected"
         })
         // ----------------  FETCH USERS TASKS   ----------------
         .addCase(fetchUsersTasks.pending, (state) => {
            state.isLoading = true
            state.isError = ""
         })
         .addCase(fetchUsersTasks.fulfilled, (state, action:PayloadAction<TaskType[]>) => {
            state.isLoading = false
            state.usersTasks = action.payload
         })
         .addCase(fetchUsersTasks.rejected, state => {
            state.isError = "fetchUsersTasks.rejected"
         })

         // ----------------  CREATE TASK   ----------------
         .addCase(createTask.pending, (state) => {
            state.isLoading = true
            state.isError = ""
         })
         .addCase(createTask.fulfilled, (state, action:PayloadAction<TaskType>) => {
            state.isLoading = false
            state.tasks.push(action.payload)
         })
         .addCase(createTask.rejected, state => {
            state.isError = "createTask.rejected"
         })

         // ----------------  UPDATE TASK   ----------------
         .addCase(updateTask.pending, (state) => {
            state.isLoading = true
            state.isError = ""
         })
         .addCase(updateTask.fulfilled, (state, action:PayloadAction<TaskType>) => {
            const updatedTask = action.payload
            state.isLoading = false
            state.tasks = state.tasks.map(task => {
               let temp = JSON.parse(JSON.stringify(task))
               if (task.taskId === updatedTask.taskId){
                  temp = updatedTask
               }
               return temp
            })
         })
         .addCase(updateTask.rejected, state => {
            state.isError = "updateTask.rejected"
         })
         
         // ----------------  ASSIGN TASK TO USER   ----------------
         .addCase(assignTaskToUser.pending, (state) => {
            state.isLoading = true
            state.isError = ""
         })
         .addCase(assignTaskToUser.fulfilled, (state, action:PayloadAction<TaskType>) => {
            const assignedTask = action.payload
            state.isLoading = false
            state.tasks = state.tasks.map(task => task.taskId===assignedTask.taskId? {...task,...assignedTask}: task)
         })
         .addCase(assignTaskToUser.rejected, state => {
            state.isError = "assignTaskToUser.rejected"
         })
                  
         // ----------------  DELETE TASK   ----------------
         .addCase(deleteTask.pending, (state) => {
            state.isLoading = true
            state.isError = ""
         })
         .addCase(deleteTask.fulfilled, (state, action:PayloadAction<string | undefined>) => { 
            state.isLoading = false
            state.tasks = state.tasks.filter(task => task.taskId !== action.payload)
         })
         .addCase(deleteTask.rejected, state => {
            state.isError = "deleteTask.rejected"
         })
   }
})

export default taskSlice.reducer

// https://youtu.be/i6ZOtqGXeNs?si=RwlvYGZKR1RUxBX_&t=32926

