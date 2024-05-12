import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { BASE_URL, api, setAuthHeader } from "../../api/api";
import type { FormDataInfo as Register } from '../../components/signup/constants'
import type { FormType as Login} from '../../components/signin/constants'

export const login = createAsyncThunk("auth/login", 
   async(loginData: Login) => {
      try {
         const { data } = await api.post(`${BASE_URL}/signin`, loginData)
         localStorage.setItem("jwt", data.jwt)
         console.log("login response.data: ", data);
         return data
      } catch (error) {
         console.log("catch error in login: ", error);
         // throw Error(error.response.data.error)
      }
   }
)

export const register = createAsyncThunk("auth/register",
   async(registerData:Register) => {
      console.log("registerData: ", registerData);
      try {
         const {data} = await api.post(`${BASE_URL}/signup`, registerData)
         localStorage.setItem("jwt", data.jwt)
         console.log("register response.data: ", data);
         return data
      } catch (error) {
         console.log("catch error in register: ", error);
         throw Error(error as string)
      }
   }
)

export const logout = createAsyncThunk("auth/logout",
   () => {
      localStorage.clear()
   }
)

export const getUserProfile = createAsyncThunk("auth/getUserProfile", 
   async (jwt:string | null) => {
      if (jwt ===null) return
      setAuthHeader(jwt,api)
      try {
         const {data} = await api.get(`/users/profile`)
         return data
      } catch (error) {
         console.log("catch error in getUserProfile: ", error);
         // throw Error(error.response.data.error)
      }
   }
)

export const getUserList = createAsyncThunk("auth/getUserList", 
   async () => {
      setAuthHeader(localStorage.getItem("jwt"), api)
      try {
         const {data} = await api.get(`/users`)
         return data
      } catch (error) {
         console.log("catch error in getUserList", error);
         // throw Error(error.response.data.error)
      }
   }
)


enum Role {
   ADMIN = "ADMIN",
   USER = "USER"
}

export type User = {
   userId: string,
   email: string,
   pass: string,
   name: string,
   role: Role
}

type DataType = {
   jwt: string,
   message: string,
   status: boolean
}

type StateT = {
   loading: boolean,
   user: User | null,
   loggedIn: boolean,
   error: string,
   jwt:string,
   data: DataType,
   users: User[] 
}

const initialState:StateT = {
   user: {userId: "", email:"", pass:"", name:"", role:Role.USER},
   loading: false,
   loggedIn: false,
   error: "",
   jwt: "",
   data: {jwt:"", message:"", status:false},
   users: []
}


const authSlice = createSlice({
   name: "auth",
   initialState,
   reducers: {},
   extraReducers:(builder) => { 
      builder
         .addCase(login.pending, state => {
            state.loading = true,
            state.error = ""
         })
         .addCase(login.fulfilled, (state, action: PayloadAction<DataType>) => {
            state.loading = false
            state.data = action.payload
            state.loggedIn = true
         })
         .addCase(login.rejected, (state) => {
            state.loading = false
            state.error = "login.rejected"
         })
         .addCase(register.pending, state => {
            state.loading = true
            state.error = ""
         })
         .addCase(register.fulfilled, (state, action: PayloadAction<DataType>) => {
            state.loading = false
            state.data = action.payload
            state.loggedIn = true
            // console.log("register.fulfilled - action: ", action);
         })
         .addCase(register.rejected, (state) => {
            state.loading = false
            state.error = "register.rejected"
         })
         .addCase(getUserProfile.pending, state => {
            state.loading = true
            state.error = ""
         })
         .addCase(getUserProfile.fulfilled, (state, action:PayloadAction<User | null>) => {
            state.loading = false
            state.user = action.payload
            state.loggedIn = true
         })
         .addCase(getUserProfile.rejected, (state) => {
            state.loading = false
            state.error = "getUserProfile.rejected"
         })
         .addCase(logout.fulfilled, (state) => {
            state.user = null
            state.jwt = ""
            state.error = ""
            state.loggedIn = false
         })
         .addCase(getUserList.pending, (state) => {
            state.loading = true
            state.error = ""
         })
         .addCase(getUserList.fulfilled, (state, action: PayloadAction<User[]>) => {
            state.loading = false
            state.users = action.payload
            state.error = ""
         })
         .addCase(getUserList.rejected, (state) => {
            state.loading = false
            state.error = ""
         })

   }

})

// export const {} = authSlice.actions
export default authSlice.reducer