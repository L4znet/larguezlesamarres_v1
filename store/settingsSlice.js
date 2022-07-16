import { createSlice } from "@reduxjs/toolkit"

const settingsSlice = createSlice({
    name: "settings",
    initialState: {
        leftHandMode: false
    },
    reducers: {
        toggleLeftHandMode(state){
           state.leftHandMode = !state.leftHandMode
        }
    }
})
export const { toggleLeftHandMode } = settingsSlice.actions

export default settingsSlice.reducer