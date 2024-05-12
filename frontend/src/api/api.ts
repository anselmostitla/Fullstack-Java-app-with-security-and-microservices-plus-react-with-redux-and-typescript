import axios, { AxiosInstance } from 'axios'

export const BASE_URL = "http://localhost:5000/api/v1"

export const api = axios.create({
   baseURL: BASE_URL,
   headers: {
      "Content-Type":"application/json"
   }
})

export const setAuthHeader = (token:string | null, api:AxiosInstance ) => {
   if (token) {
      api.defaults.headers.common["Authorization"] = `Bearer ${token}`
   } else {
      delete api.defaults.headers.common['Authorization']
   }
}

