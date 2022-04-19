import axios from 'axios'

import { SERVER_BASE_URL } from 'lib/utils/constant'

const UserAPI = {
  current: async () => {
    const user: any = window.localStorage.getItem('user')
    const token = user?.token
    try {
      const response = await axios.get(`/user`, {
        headers: {
          Authorization: `Token ${encodeURIComponent(token)}`,
        },
      })
      return response
    } catch (error) {
      return error.response
    }
  },
  login: async (email: string, password: string) => {
    try {
      const response = await axios.post(
        `${SERVER_BASE_URL}/users/login`,
        JSON.stringify({ user: { email, password } }),
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      )
      return response
    } catch (error) {
      return error.response
    }
  },
  register: async (username: string, email: string, password: string) => {
    try {
      const response = await axios.post(
        `${SERVER_BASE_URL}/users`,
        JSON.stringify({ user: { username, email, password } }),
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      )
      return response
    } catch (error) {
      return error.response
    }
  },
  save: async (user: string) => {
    try {
      const response = await axios.put(
        `${SERVER_BASE_URL}/user`,
        JSON.stringify({ user }),
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      )
      return response
    } catch (error) {
      return error.response
    }
  },
  follow: async (username: string) => {
    const user: any = JSON.parse(window.localStorage.getItem('user') as string)
    const token = user?.token
    try {
      const response = await axios.post(
        `${SERVER_BASE_URL}/profiles/${username}/follow`,
        {},
        {
          headers: {
            Authorization: `Token ${encodeURIComponent(token)}`,
          },
        },
      )
      return response
    } catch (error) {
      return error.response
    }
  },
  unfollow: async (username: any) => {
    const user: any = JSON.parse(window.localStorage.getItem('user') as string)
    const token = user?.token
    try {
      const response = await axios.delete(
        `${SERVER_BASE_URL}/profiles/${username}/follow`,
        {
          headers: {
            Authorization: `Token ${encodeURIComponent(token)}`,
          },
        },
      )
      return response
    } catch (error) {
      return error.response
    }
  },
  get: async (username: any) =>
    axios.get(`${SERVER_BASE_URL}/profiles/${username}`),
}

export default UserAPI
