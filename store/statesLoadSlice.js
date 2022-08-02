import { createSlice } from "@reduxjs/toolkit"

const statesLoadSlice = createSlice({
    name: "statesLoad",
    initialState: {
        offerSent: false,
        favoriteAdded: false,
        myOffersLoaded:false,
    },
    reducers: {
        toggleOfferSent(state){
            state.offerSent = !state.offerSent
        },
        toggleFavoriteAdded(state){
            state.favoriteAdded = !state.favoriteAdded
        },
        toggleMyOffersLoaded(state){
            state.myOffersLoaded = !state.myOffersLoaded
        },
    }
})
export const { toggleOfferSent, toggleFavoriteAdded, toggleMyOffersLoaded } = statesLoadSlice.actions

export default statesLoadSlice.reducer