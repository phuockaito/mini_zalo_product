import { useAccount } from '.';
import * as React from "react";

import {
    asyncThunkNewsMusic,
    asyncThunkGetTrendingMusic,
    asyncThunksCategoryMusic,
    asyncThunksCreatePlayHistoryMusic,
    asyncThunksMusic,
    asyncThunksPlayHistoryMusic,
    musicStore,
    onHashTag,
    onLoopAudio,
    onPlayingAudio,
    asyncThunkFavoriteMusic,
    asyncThunkMusicMillion,
    asyncThunkMusicBillion,
    onAudio,
    onPlayRandom,
} from "@/features";
import { useAppDispatch, useAppSelector } from "./use-react-redux";
import { ParamsUrl } from '@/type';

export const useMusic = () => {
    const dispatch = useAppDispatch();
    const storeMusic = useAppSelector(musicStore);
    const { access_token } = useAccount();

    const handleOnAudio = (audio: any) => dispatch(onAudio(audio));
    const handlePlayRandom = (random: boolean) => dispatch(onPlayRandom(random));
    const handleLoopAudio = React.useCallback((loop: boolean) => dispatch(onLoopAudio(loop)), [dispatch]);
    const handlePlayingAudio = React.useCallback((play: boolean) => dispatch(onPlayingAudio(play)), [dispatch]);
    const fetchNewMusic = React.useCallback((page: number) => dispatch(asyncThunkNewsMusic(page)), [dispatch]);
    const fetchFavoriteMusic = React.useCallback(() => dispatch(asyncThunkFavoriteMusic()), [dispatch]);
    const fetchMusicMillionMusic = React.useCallback(() => dispatch(asyncThunkMusicMillion()), [dispatch]);
    const fetchMusicBillionMusic = React.useCallback(() => dispatch(asyncThunkMusicBillion()), [dispatch]);
    const fetchGetTrendingMusic = React.useCallback((page: number) => dispatch(asyncThunkGetTrendingMusic(page)), [dispatch]);
    const fetchCategorysMusic = React.useCallback((params: ParamsUrl) => dispatch(asyncThunksCategoryMusic(params)), [dispatch]);
    const fetchGetMusic = React.useCallback((id: string) => dispatch(asyncThunksMusic(id)), [dispatch]);
    const handleCreatePlayHistoryMusic = React.useCallback((id: string) => access_token && dispatch(asyncThunksCreatePlayHistoryMusic(id)), [dispatch, access_token]);
    const handlePlayHistoryMusic = React.useCallback((page: number) => dispatch(asyncThunksPlayHistoryMusic(page)), [dispatch]);
    const handleHashTag = React.useCallback((name: string, index: number) => dispatch(onHashTag({ name, index })), [dispatch]);

    return {
        storeMusic,
        fetchNewMusic,
        fetchGetMusic,
        handleCreatePlayHistoryMusic,
        handlePlayHistoryMusic,
        fetchCategorysMusic,
        handlePlayingAudio,
        handleLoopAudio,
        handleHashTag,
        fetchGetTrendingMusic,
        fetchFavoriteMusic,
        fetchMusicBillionMusic,
        fetchMusicMillionMusic,
        handleOnAudio,
        handlePlayRandom
    };
};
