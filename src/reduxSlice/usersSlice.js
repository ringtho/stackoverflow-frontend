import { createSlice } from "@reduxjs/toolkit";


export const usersSlice = createSlice({
    name: 'user',
    initialState: {
        profile: {},
        user: {}
    },
    reducers: {
        setProfile: (state, action) => {
            state.profile = action.payload
        },
        setUser: (state, action) => {
            state.user = action.payload
        }
    }
})

export const { setUser, setProfile } = usersSlice.actions
export default usersSlice.reducer
