import { AccountType } from "./type-account";
import { ItemMusicType } from "./type-music";

export interface InitialStateCommentSliceType {
    data: CommentType[];
    loading: boolean;
}

export interface CommentType {
    account: AccountType
    content: string;
    createdAt: string;
    edit_content: boolean;
    id_account: string;
    id_music: string;
    music: ItemMusicType
    updatedAt: string;
    _id: string;
}

export interface CreateCommentType {
    content: string;
    id_music: string;
}

export interface UpdateCommentType {
    content: string;
    _id: string;
}