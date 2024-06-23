import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

const api_key = import.meta.env.VITE_API_KEY
const base_url = import.meta.env.VITE_BASE_URL

// video
export const getVideo = createAsyncThunk("getVideo", async ({ id, language }) => {
    let response = await axios.get(`${base_url}/movie/${id}/videos?api_key=${api_key}&language=${language}`)

    // If there is no TR video, set language to EN (default language)
    if (response.data.results.length === 0) {
        response = await axios.get(`${base_url}/movie/${id}/videos?api_key=${api_key}&language=en-US`)
    }

    // Check for video types
    let video_types = ["Trailer", "Teaser", "Featurette", "Clip", "Behind the Scenes"]
    for (let video_type of video_types) {
        for (let i = 0; i < response.data.results.length; i++) {
            if (response.data.results[i].type === video_type && response.data.results[i].key) {
                return {
                    type: video_type,
                    key: response.data.results[i].key
                }
            }
        }
    }
    return null
})

const initialState = {
    loading: false,
    video: {},
    error: ""
}

export const videoSlice = createSlice({
    name: "video",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getVideo.pending, (state) => {
            state.loading = true
        }),
            builder.addCase(getVideo.fulfilled, (state, action) => {
                state.loading = false
                state.video = action.payload
            }),
            builder.addCase(getVideo.rejected, (state, action) => {
                state.loading = false
                state.error = action.error.message
            })
    }
})

export default videoSlice.reducer