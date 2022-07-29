import { createSlice } from "@reduxjs/toolkit"

const statesLoadSlice = createSlice({
    name: "statesLoad",
    initialState: {
        offerSent: false,
    },
    reducers: {
        toggleOfferSent(state){
            state.offerSent = !state.offerSent
        },
    }
})
export const { toggleOfferSent } = statesLoadSlice.actions

export default statesLoadSlice.reducer