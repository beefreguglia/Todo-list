import { env } from '@bf-to-do/env'
import axios from 'axios'

import { getAuthTokenCookie } from './auth'

export const api = axios.create({
  baseURL: env.NEXT_PUBLIC_API_URL,
})

api.interceptors.request.use(
  (config) => {
    const token = getAuthTokenCookie(null)
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)
