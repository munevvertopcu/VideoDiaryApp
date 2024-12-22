import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import AsyncStorage from '@react-native-async-storage/async-storage';

const initialState = {
    videos: [],
    isLoading: false
}

export const loadVideos = createAsyncThunk('videos/loadVideos', async () => {
    const savedVideos = await AsyncStorage.getItem('videos');
    return savedVideos ? JSON.parse(savedVideos) : [];
});

export const saveVideos = createAsyncThunk('videos/saveVideos', async (video, { getState }) => {
    const currentVideos = getState().videos.videos;
    const updatedVideos = [...currentVideos, video];
    console.log(updatedVideos)
    await AsyncStorage.setItem('videos', JSON.stringify(updatedVideos));
    return video;
});

export const removeVideo = createAsyncThunk('videos/remove', async (videoId, { getState }) => {
    const { videos } = getState().videos;
    const updatedVideos = videos.filter((video) => video.uri !== videoId);
    await AsyncStorage.setItem('videos', JSON.stringify(updatedVideos));
    return updatedVideos;
});

const videoSlice = createSlice({
    name: 'videos',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(loadVideos.fulfilled, (state, action) => {
                state.isLoading = false;
                state.videos = action.payload;
            })
            .addCase(loadVideos.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(loadVideos.rejected, (state) => {
                state.isLoading = false;
            })
            .addCase(saveVideos.fulfilled, (state, action) => {
                state.videos = [...state.videos, action.payload]
            })
            .addCase(removeVideo.fulfilled, (state, action) => {
                state.videos = action.payload;
            });
    }
})

export const { selectVideo } = videoSlice.actions;
export default videoSlice.reducer;