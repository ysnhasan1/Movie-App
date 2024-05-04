import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

import { api_key, base_url } from '../../../api/api'

// movie
export const getMovie = createAsyncThunk("getMovie", async ({ id, language }) => {
    const response = await axios.get(`${base_url}/movie/${id}?api_key=${api_key}&language=${language}`)
    return response.data
})

const initialState = {
    loading: false,
    movie: {},
    error: ""
}

export const movieSlice = createSlice({
    name: "movie",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getMovie.pending, (state) => {
            state.loading = true
        }),
            builder.addCase(getMovie.fulfilled, (state, action) => {
                state.loading = false
                state.movie = action.payload
            }),
            builder.addCase(getMovie.rejected, (state, action) => {
                state.loading = false
                state.error = action.error.message
            })
    }
})

export default movieSlice.reducer