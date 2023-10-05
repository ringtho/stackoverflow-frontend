import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL

const getHeaders = () => {
    return {
      headers: {
        'Content-Type': 'application/json',
    }}
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