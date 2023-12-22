import { apiMusic } from "@/api";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { ParamsUrl } from "@/type";

export const asyncThunkNewsMusic = createAsyncThunk("asyncThunkNewsMusic", async (page: number, { rejectWithValue }) => {
    try {
        const response = await apiMusic.getNewMusic(page);
        return response;
    } catch (error: any) {
        return rejectWithValue(error);
    }
});

export const asyncThunkMusicMillion = createAsyncThunk("asyncThunkMusicMillion", async (_, { rejectWithValue }) => {
    try {
        const response = await apiMusic.getTopMusicMillion();
        return response;
    } catch (error: any) {
        return rejectWithValue(error);
    }
});

export const asyncThunkMusicBillion = createAsyncThunk("asyncThunkMusicBillion", async (_, { rejectWithValue }) => {
    try {
        const response = await apiMusic.getTopMusicBillion();
        return response;
    } catch (error: any) {
        return rejectWithValue(error);
    }
});

export const asyncThunkFavoriteMusic = createAsyncThunk("asyncThunkFavoriteMusic", async (_, { rejectWithValue }) => {
    try {
        const response = await apiMusic.getFavoriteMusic();
        return response;
    } catch (error: any) {
        return rejectWithValue(error);
    }
});

export const asyncThunkGetTrendingMusic = createAsyncThunk("asyncThunkGetTrendingMusic", async (page: number, { rejectWithValue }) => {
    try {
        const response = await apiMusic.getTrendingMuisc(page);
        return response;
    } catch (error: any) {
        return rejectWithValue(error);
    }
});

export const asyncThunksMusic = createAsyncThunk("asyncThunksMusic", async (id: string, { rejectWithValue }) => {
    try {
        const response = await apiMusic.getMusic(id);
        return response;
    } catch (error: any) {
        return rejectWithValue(error);
    }
});

export const asyncThunksCreatePlayHistoryMusic = createAsyncThunk("asyncThunksCreatePlayHistoryMusic", async (id: string, { rejectWithValue }) => {
    try {
        const response = await apiMusic.createPlayHistoryMusic(id);
        return response;
    } catch (error: any) {
        return rejectWithValue(error);
    }
});

export const asyncThunksPlayHistoryMusic = createAsyncThunk("asyncThunksPlayHistoryMusic", async (page: number, { rejectWithValue }) => {
    try {
        const response = await apiMusic.playHistoryMusic(page);
        return response;
    } catch (error: any) {
        return rejectWithValue(error);
    }
});

export const asyncThunksCategoryMusic = createAsyncThunk("asyncThunksCategoryMusic", async (params: ParamsUrl, { rejectWithValue }) => {
    try {
        const response = await apiMusic.getCategory(params);
        return response;
    } catch (error: any) {
        return rejectWithValue(error);
    }
});
