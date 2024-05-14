import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

import { api_key, base_url } from '../../../api/api'

// recommendations
export const getRecommendations = createAsyncThunk("getRecommendations", async (id) => {
    const response = await axios.get(`${base_url}/movie/${id}/recommendations?api_key=${api_key}`)
    const filtered_results = response.data.results.filter(recommendation => recommendation.backdrop_path !== null)
    if (filtered_results.length >= 8) {
        let new_filtered_results = []
        for (let i = 0; i < 8; i++) {
            new_filtered_results.push(filtered_results[i])
        }
        return new_filtered_results
    }
    else {
        return filtered_results
    }
})

const initialState = {
    loading: false,
    recommendations: [],
    error: ""
}

export const recommendationsSlice = createSlice({
    name: "recommendations",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getRecommendations.pending, (state) => {
            state.loading = true
        }),
            builder.addCase(getRecommendations.fulfilled, (state, action) => {
                state.loading = false
                state.recommendations = action.payload
            }),
            builder.addCase(getRecommendations.rejected, (state, action) => {
                state.loading = false
                state.error = action.error.message
            })
    }
})

export default recommendationsSlice.reducer