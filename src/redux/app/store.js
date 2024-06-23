import { configureStore } from '@reduxjs/toolkit'
import navigationBarSlice from '../features/navigationBar/navigationBarSlice'
import moviesSlice from '../features/movies/moviesSlice'
import movieSlice from '../features/movie/movieSlice'
import videoSlice from '../features/video/videoSlice'
import credits from '../features/credits/credits'
import imagesSlice from '../features/images/imagesSlice'
import recommendationsSlice from '../features/recommendations/recommendationsSlice'
import searchAndQuerySlice from '../features/searchAndQuery/searchAndQuerySlice'

export const store = configureStore({
    reducer: {
        navigationBarReducer: navigationBarSlice,
        moviesReducer: moviesSlice,
        movieReducer: movieSlice,
        videoReducer: videoSlice,
        creditsReducer: credits,
        imagesReducer: imagesSlice,
        recommendationsReducer: recommendationsSlice,
        searchAndQueryReducer: searchAndQuerySlice
    }
})