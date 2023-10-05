import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL

const getHeaders = () => {
    return {
      headers: {
        'Content-Type': 'application/json',
    }}
}

const getAuthHeaders = () => {
   const { token } = JSON.parse(localStorage.getItem('stackUser'))
   return {
     headers: {
       'Content-Type': 'application/json',
       'Authorization': `Bearer ${token}`
    },
   } 
}
export const registerUser = async (user) => {
    const config = getHeaders()
    const data = await axios.post(`${API_URL}/auth/signup`, user, config)
    return data
}

export const loginUser = async (user) => {
    const config = getHeaders()
    const data = await axios.post(`${API_URL}/auth/login`, user, config)
    return data
}

export const addQuestion = async (question) => {
  const config = getAuthHeaders()
  const data = await axios.post(`${API_URL}/questions`, question, config)
  return data
}

export const getQuestions = async () => {
    const config = getAuthHeaders()
    const data = await axios.get(`${API_URL}/questions`, config)
    return data
}

export const getSingleQuestion = async (id) => {
    const config = getAuthHeaders()
    const data = await axios.get(`${API_URL}/questions/${id}`, config)
    return data
}