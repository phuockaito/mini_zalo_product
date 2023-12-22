import { ParamsUrl } from '@/type/common';
import { ItemMusicType, ItemPlayHistory } from "@/type";
import { axiosClient } from "./axios-client";

export const apiMusic = {
    getNewMusic: (page: number): Promise<{ data: ItemMusicType[] }> => {
        const url = `music/new-music?_page=${page}&_limit=20`;
        return axiosClient.get(url);
    },
    getTopMusicMillion: (): Promise<{ data: ItemMusicType[] }> => {
        const url = "music/top-views?_type=million";
        return axiosClient.get(url);
    },
    getTopMusicBillion: (): Promise<{ data: ItemMusicType[] }> => {
        const url = "music/top-views?_type=billion";
        return axiosClient.get(url);
    },
    getFavoriteMusic: (): Promise<{ data: ItemMusicType[] }> => {
        const url = "music/favorite?_limit=40";
        return axiosClient.get(url);
    },
    createFavoriteMusic: (id: string): Promise<{ data: ItemMusicType[] }> => {
        const url = "favorite/create";
        return axiosClient.post(url, { idMusic: id });
    },
    getMusic: (id: string): Promise<{ data: ItemMusicType }> => {
        const url = `/music/get-by-id?_id=${id}`;
        return axiosClient.get(url);
    },
    createPlayHistoryMusic: (id: string) => {
        const url = "play-history/create";
        return axiosClient.post(url, {
            idMusic: id
        });
    },
    playHistoryMusic: (page: number): Promise<{ data: ItemPlayHistory[] }> => {
        const url = `play-history/get-by-token?_page=${page}&_limit=20`;
        return axiosClient.get(url);
    },
    getCategory: (params: ParamsUrl): Promise<{ data: ItemMusicType[] }> => {
        const url = "music/get-category";
        return axiosClient.get(url, { params });
    },
    getTrendingMuisc: (page: number): Promise<{ data: ItemMusicType[] }> => {
        const url = `music/trending?_page=${page}&_limit=20`;
        return axiosClient.get(url);
    },
    getSearch: (params: ParamsUrl): Promise<{ data: ItemMusicType }> => {
        const url = "/search";
        return axiosClient.get(url, { params });
    },
    getSinger: (params: ParamsUrl): Promise<{ data: ItemMusicType }> => {
        const url = "/music/get-singer-name";
        return axiosClient.get(url, { params });
    },
};
