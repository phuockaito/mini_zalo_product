import { AccountResponse, PayloadLoginType, PayloadRegisterType } from "@/type";
import { axiosClient } from "./axios-client";

export const apiAccount = {
    postLogin: (payload: PayloadLoginType): Promise<AccountResponse> => {
        const url = "account/login";
        return axiosClient.post(url, payload);
    },
    postRegister: (payload: PayloadRegisterType): Promise<AccountResponse> => {
        const url = "account/register";
        return axiosClient.post(url, payload);
    },
    getProfile: (): Promise<AccountResponse> => {
        const url = "account/profile";
        return axiosClient.get(url);
    },
    getFavoriteAccount: (page: number) => {
        const url = `favorite/get-authorization-token?_limit=20&_page=${page}`;
        return axiosClient.get(url);
    },
    getUploadAccount: (page: number) => {
        const url = `music/get-upload?_limit=20&_page=${page}`;
        return axiosClient.get(url);
    },
};
