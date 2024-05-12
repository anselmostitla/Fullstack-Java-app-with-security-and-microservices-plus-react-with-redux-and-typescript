import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { api, setAuthHeader } from "../../api/api";
import { SubmissionType } from "../../types/types";

// type submission = {
//    submissionId: number,
//    taskId:number,
//    githubLink: string,
//    userId: number,
//    status: string,
//    submissionTime: Date
// }

// export type SubmissionType = {
//    submissionId: string
//    taskId: string
//    githubLink: string
//    userId: string
//    status: TaskStatus
//    submissionTime: string
// }

type initialStateType = {
   status: string
   submissions: SubmissionType[]
   error: string
}

const initialState:initialStateType = {
   status: "",
   submissions: [],
   error: ""
}

export const submitTask = createAsyncThunk("submissions/submitTask", 
   async({taskId, githubLink}:{taskId:string, githubLink:string}) => {
      setAuthHeader(localStorage.getItem("jwt"), api)

      try {
         const { data } = await api.post(`/submissions?taskId=${taskId}&githubLink=${githubLink}`,{})
         console.log("submited task: ", data);
         return data
      } catch (error) {
         console.log("catch error: ", error);
         throw Error(error as string)
      }
   }
)


export const fetchAllSubmissions = createAsyncThunk("submissions/fetchAllSubmissions", 
   async() => {
      setAuthHeader(localStorage.getItem("jwt"), api)
      try {
         const { data } = await api.get(`/submissions`)
         console.log("all submissions data: ", data);
         return data
      } catch (error) {
         console.log("catch error: ", error);
         throw Error(error as string)
      }
   }
)


export const fetchSubmissionsByTaskId = createAsyncThunk("submissions/fetchSubmissionsByTaskId", 
   async(taskId:string) => {
      setAuthHeader(localStorage.getItem("jwt"), api)
      try {
         const { data } = await api.get(`/submissions/tasks/${taskId}`)
         console.log("Submissions by taskId data: ", data);
         return data
      } catch (error) {
         console.log("catch error: ", error);
         throw Error(error as string)
      }
   }
)


export const acceptDeclineSubmission = createAsyncThunk("submissions/acceptDeclineSubmission", 
   async({submissionId, submissionStatus}:{submissionId:string, submissionStatus:boolean}) => {
      setAuthHeader(localStorage.getItem("jwt"), api)
      try {
         const { data } = await api.put(`/submissions/${submissionId}?status=${submissionStatus}`)
         console.log("acceptDeclineSubmission data: ", data);
         return data
      } catch (error) {
         console.log("catch error: ", error);
         throw Error(error as string)
      }
   }
)


export const submissionSlice = createSlice({
   name: "submission",
   initialState,
   reducers:{},
   extraReducers: (builder) => {
      builder
      .addCase(submitTask.pending, (state) => {
         state.status = 'loading'
      })
      .addCase(submitTask.fulfilled, (state, action: PayloadAction<SubmissionType>) => {
         state.status = "succeeded"
         state.submissions.push(action.payload)
      })
      .addCase(submitTask.rejected, (state) => {
         state.status = "failed"
         state.error = "submitTask.rejected"
      })

      // ------------ fetchAllSubmissions -----------------
      .addCase(fetchAllSubmissions.pending, (state) => {
         state.status = 'loading'
      })
      .addCase(fetchAllSubmissions.fulfilled, (state, action: PayloadAction<SubmissionType[]>) => {
         state.status = "succeeded"
         state.submissions = action.payload
      })
      .addCase(fetchAllSubmissions.rejected, (state) => {
         state.status = "failed"
         state.error = "fetchAllSubmissions.rejected"
      })

      // ------------ fetchSubmissionsByTaskId -----------------
      .addCase(fetchSubmissionsByTaskId.pending, (state) => {
         state.status = 'loading'
      })
      .addCase(fetchSubmissionsByTaskId.fulfilled, (state, action: PayloadAction<SubmissionType[]>) => {
         state.status = "succeeded"
         state.submissions = action.payload
      })
      .addCase(fetchSubmissionsByTaskId.rejected, (state) => {
         state.status = "failed"
         state.error = "fetchSubmissionsByTaskId.rejected"
      })

      // ------------ acceptDeclineSubmission -----------------
      .addCase(acceptDeclineSubmission.pending, (state) => {
         state.status = 'loading'
      })
      .addCase(acceptDeclineSubmission.fulfilled, (state, action: PayloadAction<SubmissionType>) => {
         state.status = "succeeded"
         state.submissions = state.submissions.map(sub => sub.submissionId === action.payload.submissionId? action.payload : sub)
      })
      .addCase(acceptDeclineSubmission.rejected, (state) => {
         state.status = "failed"
         state.error = "acceptDeclineSubmission.rejected"
      })
   }
})

export default submissionSlice.reducer