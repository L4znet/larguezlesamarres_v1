import { createSlice } from "@reduxjs/toolkit"

const statesLoadSlice = createSlice({
    name: "statesLoad",
    initialState: {
        offerSent: false,
        favoriteAdded: false,
    },
    reducers: {
        toggleOfferSent(state){
            state.offerSent = !state.offerSent
        },
        toggleFavoriteAdded(state){
            state.favoriteAdded = !state.favoriteAdded
        },
    }
})
export const { toggleOfferSent, toggleFavoriteAdded } = statesLoadSlice.actions

export default statesLoadSlice.reducer