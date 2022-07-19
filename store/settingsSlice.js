import { createSlice } from "@reduxjs/toolkit"

const settingsSlice = createSlice({
    name: "settings",
    initialState: {
        leftHandMode: false,
        ownerTenantState:false
    },
    reducers: {
        toggleLeftHandMode(state){
           state.leftHandMode = !state.leftHandMode
        },
        toggleTenantOwner(state){
           state.ownerTenantState = !state.ownerTenantState
        }
    }
})
export const { toggleLeftHandMode, toggleTenantOwner } = settingsSlice.actions

export default settingsSlice.reducer