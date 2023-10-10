import { createSlice } from "@reduxjs/toolkit";


export const usersSlice = createSlice({
    name: 'user',
    initialState: {
        userInfo: {}
    },
    reducers: {
        setUser: (state, action) => {
            state.userInfo = action.payload
        }
    }
})

export const { setUser } = usersSlice.actions
export default usersSlice.reducer
