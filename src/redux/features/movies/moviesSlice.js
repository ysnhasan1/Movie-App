import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

const api_key = import.meta.env.VITE_API_KEY
const base_url = import.meta.env.VITE_BASE_URL

export const getMovies = createAsyncThunk("getMovies", async ({ endpoint, language }) => {

    let movies = []
    let total_pages

    if (endpoint === "upcoming" || endpoint === "now_playing") {
        total_pages = 5
    } else {
        total_pages = 15
    }

    for (let current_page = 1; current_page <= total_pages; current_page++) {
        const response = await axios.get(`${base_url}/movie/${endpoint}?api_key=${api_key}&language=${language}&page=${current_page}`)
        movies = [...movies, ...response.data.results]
    }

    const key = 'title'
    const unique_movies = [...new Map(movies.map(item => [item[key], item])).values()]
    return unique_movies
})

const initialState = {
    loading: false,
    movies: [],
    error: ""
}

export const moviesSlice = createSlice({
    name: "movies",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getMovies.pending, (state) => {
            state.loading = true
        }),
            builder.addCase(getMovies.fulfilled, (state, action) => {
                state.loading = false
                state.movies = action.payload
            }),
            builder.addCase(getMovies.rejected, (state, action) => {
                state.loading = false
                state.error = action.error.message
            })
    }
})

export default moviesSlice.reducer