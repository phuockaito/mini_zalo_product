import { defaultHashTag } from '@/constants/index';
import { InitialStateMusicSliceType } from "@/type";
import { ActionReducerMapBuilder, createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
    asyncThunkNewsMusic,
    asyncThunksMusic,
    asyncThunksCategoryMusic,
    asyncThunksPlayHistoryMusic,
    asyncThunkGetTrendingMusic,
    asyncThunkFavoriteMusic,
    asyncThunkMusicMillion,
    asyncThunkMusicBillion
} from "./patch-api";

const initialState: InitialStateMusicSliceType = {
    new_music: [],
    million: [],
    billion: [],
    trending: [],
    favorite: [],
    category: [],
    audio: null,
    loading: true,
    category_loading: true,
    play_random: false,
    music: null,
    play_history: [],
    play_history_loading: true,
    playing_audio: true,
    loop_audio: false,
    hash_tag: defaultHashTag,
    hash_tag_index: 0,
};

export const musicSlice = createSlice({
    name: "musicSlice",
    initialState,
    reducers: {
        onAudio: (state, action: any) => {
            state.audio = action.payload;
        },
        onLoopAudio: (state, action: PayloadAction<boolean>) => {
            state.loop_audio = action.payload;
        },
        onPlayingAudio: (state, action: PayloadAction<boolean>) => {
            state.playing_audio = action.payload;
        },
        onHashTag: (state, action: PayloadAction<{ index: number, name: string }>) => {
            state.hash_tag = action.payload.name;
            state.hash_tag_index = action.payload.index;
        },
        onPlayRandom: (state, action: PayloadAction<boolean>) => {
            state.play_random = action.payload;
        }
    },
    extraReducers(builder: ActionReducerMapBuilder<InitialStateMusicSliceType>) {
        builder
            .addCase(asyncThunkNewsMusic.pending, (state) => {
                state.loading = true;
            })
            .addCase(asyncThunkNewsMusic.fulfilled, (state, action) => {
                state.loading = false;
                state.new_music = action.payload.data;
            })
            .addCase(asyncThunkNewsMusic.rejected, (state) => {
                state.loading = false;
                state.new_music = [];
            });
        builder
            .addCase(asyncThunksMusic.fulfilled, (state, action) => {
                state.music = action.payload.data;
            })
        builder
            .addCase(asyncThunksCategoryMusic.pending, (state) => {
                state.category_loading = true;
            })
            .addCase(asyncThunksCategoryMusic.fulfilled, (state, action) => {
                state.category_loading = false;
                state.category = action.payload.data;
            })
            .addCase(asyncThunksCategoryMusic.rejected, (state) => {
                state.category_loading = false;
            })
        builder
            .addCase(asyncThunksPlayHistoryMusic.pending, (state) => {
                state.play_history_loading = true;
            })
            .addCase(asyncThunksPlayHistoryMusic.fulfilled, (state, action) => {
                state.play_history_loading = false;
                state.play_history = action.payload.data;
            })
            .addCase(asyncThunksPlayHistoryMusic.rejected, (state) => {
                state.play_history_loading = false;
            })
        builder
            .addCase(asyncThunkGetTrendingMusic.fulfilled, (state, action) => {
                state.trending = action.payload.data;
            })
        builder
            .addCase(asyncThunkFavoriteMusic.fulfilled, (state, action) => {
                state.trending = action.payload.data;
            })
        builder
            .addCase(asyncThunkMusicBillion.fulfilled, (state, action) => {
                state.billion = action.payload.data;
            })
        builder
            .addCase(asyncThunkMusicMillion.fulfilled, (state, action) => {
                state.million = action.payload.data;
            })
    },
});

const { reducer, actions } = musicSlice;
export const { onLoopAudio, onPlayingAudio, onHashTag, onAudio, onPlayRandom } = actions;

export default reducer;
