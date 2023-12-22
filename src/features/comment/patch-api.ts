import { apiComment } from "@/api";
import { CreateCommentType, ParamsUrl, UpdateCommentType } from "@/type";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const asyncThunkGetComment = createAsyncThunk("asyncThunkGetComment", async (params: ParamsUrl, { rejectWithValue }) => {
    try {
        const response = await apiComment.getComment(params);
        return response;
    } catch (error: any) {
        return rejectWithValue(error);
    }
});

export const asyncThunkCreateComment = createAsyncThunk("asyncThunkCreateComment", async (data: CreateCommentType, { rejectWithValue }) => {
    try {
        const response = await apiComment.createComment(data);
        return response;
    } catch (error: any) {
        return rejectWithValue(error);
    }
});

export const asyncThunkDeleteComment = createAsyncThunk("asyncThunkDeleteComment", async (id: string, { rejectWithValue }) => {
    try {
        const response = await apiComment.deleteComment(id);
        return response;
    } catch (error: any) {
        return rejectWithValue(error);
    }
});

export const asyncThunkUpdateComment = createAsyncThunk("asyncThunkUpdateComment", async (data: UpdateCommentType, { rejectWithValue }) => {
    try {
        const response = await apiComment.updateComment(data);
        return response;
    } catch (error: any) {
        return rejectWithValue(error);
    }
});
