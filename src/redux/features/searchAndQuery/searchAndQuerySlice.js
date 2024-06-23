import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

const api_key = import.meta.env.VITE_API_KEY
const base_url = import.meta.env.VITE_BASE_URL

export const getSearchAndQuery = createAsyncThunk("getSearchAndQuery", async (input) => {
    let movies = []
    const response = await axios.get(`${base_url}/search/movie?query=${input}&api_key=${api_key}`)
    movies = [...movies, ...response.data.results]
    return movies
})

const initialState = {
    loading: false,
    movies: [],
    error: ""
}

export const searchAndQuerySlice = createSlice({
    name: "searchAndQuery",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getSearchAndQuery.pending, (state) => {
            state.loading = true
        }),
            builder.addCase(getSearchAndQuery.fulfilled, (state, action) => {
                state.loading = false
                state.movies = action.payload
            }),
            builder.addCase(getSearchAndQuery.rejected, (state, action) => {
                state.loading = false
                state.error = action.error.message
            })
    }
})

export default searchAndQuerySlice.reducer