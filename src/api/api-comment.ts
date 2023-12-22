import { CommentType, CreateCommentType, ParamsUrl, UpdateCommentType } from "@/type";
import { axiosClient } from "./axios-client";

export const apiComment = {
    getComment: (params: ParamsUrl): Promise<{ data: CommentType[] }> => {
        const url = "comment/get-by-id-music";
        return axiosClient.get(url, { params });
    },
    createComment: (data: CreateCommentType): Promise<{ data: CommentType }> => {
        const url = "comment/create";
        return axiosClient.post(url, data);
    },
    deleteComment: (id: string): Promise<{ id: string }> => {
        const url = `comment/delete-by-id?_id=${id}`;
        return axiosClient.delete(url);
    },
    updateComment: (data: UpdateCommentType): Promise<{ id: string, data: CommentType }> => {
        const url = "comment/update-comment-by-id";
        return axiosClient.put(url, data);
    },
}