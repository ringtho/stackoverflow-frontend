import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL


export const registerUser = async (user) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    }
    const data = await axios.post(`${API_URL}/auth/signup`, user, config)
    return data
}