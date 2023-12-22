import { apiAccount } from "@/api";
import { PayloadLoginType, PayloadRegisterType } from "@/type";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const asyncThunkPostLogin = createAsyncThunk("asyncThunkPostLogin", async (payload: PayloadLoginType, { rejectWithValue }) => {
    try {
        const response = await apiAccount.postLogin(payload);
        return response;
    } catch (error) {
        return rejectWithValue(error);
    }
});

export const asyncThunkPostRegister = createAsyncThunk("asyncThunkPostRegister", async (payload: PayloadRegisterType, { rejectWithValue }) => {
    try {
        const response = await apiAccount.postRegister(payload);
        return response;
    } catch (error) {
        return rejectWithValue(error);
    }
});

export const asyncThunkGetProfile = createAsyncThunk("asyncThunkGetProfile", async (_, { rejectWithValue }) => {
    try {
        const response = await apiAccount.getProfile();
        return response;
    } catch (error) {
        return rejectWithValue(error);
    }
});

export const asyncThunkGetFavoriteAccount = createAsyncThunk("asyncThunkGetFavoriteAccount", async (page: number, { rejectWithValue }) => {
    try {
        const response = await apiAccount.getFavoriteAccount(page);
        return response;
    } catch (error) {
        return rejectWithValue(error);
    }
});

export const asyncThunkGetUploadAccount = createAsyncThunk("asyncThunkGetUploadAccount", async (page: number, { rejectWithValue }) => {
    try {
        const response = await apiAccount.getUploadAccount(page);
        return response;
    } catch (error) {
        return rejectWithValue(error);
    }
});
