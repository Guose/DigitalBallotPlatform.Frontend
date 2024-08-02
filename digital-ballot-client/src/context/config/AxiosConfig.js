import axios from 'axios'
import {useUser} from '../UserContext'

export const SetupAxiosInterceptors = () => {
  const { token } = useUser()

  axios.interceptors.request.use(
    (config) => {
      if (token) {
        config.headers.Authorization = `Bearer ${token}`
      }
      return config
    },
    (error) => Promise.reject(error)
  )
}