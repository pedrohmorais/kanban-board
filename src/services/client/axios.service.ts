'use client'
import axios from 'axios'

// Verifica se o código está rodando no frontend do Next.js
const isBrowser = typeof window !== 'undefined'

// Cria uma instância do Axios
const axiosConfig = axios.create({
  baseURL: '//localhost:3000/api',
})

// Adiciona o interceptor apenas no frontend
if (isBrowser) {
  axiosConfig.interceptors.request.use(
    (config) => {
      const token = window.localStorage.getItem('seu_token') // Substitua 'seu_token' pelo nome da chave onde seu token JWT é armazenado
      if (token) {
        config.headers.Authorization = `Bearer ${token}`
      }
      return config
    },
    (error) => {
      return Promise.reject(error)
    },
  )
}

export default axiosConfig
