'use client'
import axios, { HttpStatusCode } from 'axios'

const isBrowser = typeof window !== 'undefined'

const axiosConfig = axios.create({
  baseURL: process.env.API_URL,
})

if (isBrowser) {
  axiosConfig.interceptors.request.use(
    (config) => {
      const token = window.localStorage.getItem('token')
      if (token) {
        config.headers.Authorization = `Bearer ${token}`
      }
      return config
    },
    (error) => {
      return Promise.reject(error)
    },
  )
  axiosConfig.interceptors.response.use(
    (config) => {
      if (config.status === HttpStatusCode.Unauthorized) {
        window.localStorage.removeItem('token')
      }
      return config
    },
    (error) => {
      return Promise.reject(error)
    },
  )
}

export default axiosConfig
