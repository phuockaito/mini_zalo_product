export interface InitialStateMusicSliceType {
    new_music: ItemMusicType[];
    trending: ItemMusicType[];
    category: ItemMusicType[];
    favorite: ItemMusicType[];
    billion: ItemMusicType[];
    million: ItemMusicType[];
    audio: any;
    loading: boolean;
    category_loading: boolean;
    play_history_loading: boolean;
    play_random: boolean;
    music: ItemMusicType | null;
    play_history: ItemPlayHistory[];
    loop_audio: boolean;
    playing_audio: boolean;
    hash_tag: string;
    hash_tag_index: number;
}

export interface ItemPlayHistory {
    createdAt: string;
    id_account: string;
    id_music: string;
    music: ItemMusicType;
    updatedAt: string;
    _id: string;
}
export interface ItemMusicType {
    _id: string;
    id_account: string;
    name_singer: string;
    slug_name_singer: string;
    src_music: string;
    link_mv: string;
    image_music: string;
    time_format: string;
    seconds: number;
    name_music: string;
    slug_name_music: string;
    category: string;
    slug_category: string;
    sum_comment: number;
    view: number;
    subscribe: string;
    slug_subscribe: string;
    favorite: number;
    account_favorite: any[];
    createdAt: Date;
    updatedAt: Date;
}
