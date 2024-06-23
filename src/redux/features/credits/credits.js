import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

const api_key = import.meta.env.VITE_API_KEY
const base_url = import.meta.env.VITE_BASE_URL

// credits (cast & crew)
export const getCredits = createAsyncThunk("getCredits", async (id) => {
    const response = await axios.get(`${base_url}/movie/${id}/credits?api_key=${api_key}`)
    return response.data
})

const initialState = {
    loading: false,
    credits: {},
    error: ""
}

export const creditsSlice = createSlice({
    name: "credits",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getCredits.pending, (state) => {
            state.loading = true
        }),
            builder.addCase(getCredits.fulfilled, (state, action) => {
                state.loading = false
                state.credits = action.payload
            }),
            builder.addCase(getCredits.rejected, (state, action) => {
                state.loading = false
                state.error = action.error.message
            })
    }
})

export default creditsSlice.reducer