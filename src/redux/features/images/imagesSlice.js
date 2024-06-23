import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

const api_key = import.meta.env.VITE_API_KEY
const base_url = import.meta.env.VITE_BASE_URL

// file paths
export const getImages = createAsyncThunk("getImages", async (id) => {
    const response = await axios.get(`${base_url}/movie/${id}/images?api_key=${api_key}`);
    let file_paths = response.data.backdrops.map(backdrop => backdrop.file_path);
    return file_paths
});

const initialState = {
    loading: false,
    file_paths: [],
    error: ""
}

export const imagesSlice = createSlice({
    name: "images",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getImages.pending, (state) => {
            state.loading = true
        }),
            builder.addCase(getImages.fulfilled, (state, action) => {
                state.loading = false
                state.file_paths = action.payload
            }),
            builder.addCase(getImages.rejected, (state, action) => {
                state.loading = false
                state.error = action.error.message
            })
    }
})

export default imagesSlice.reducer