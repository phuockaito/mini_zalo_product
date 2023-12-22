export interface PayloadLoginType {
    email: string;
    password: string;
}

export interface PayloadRegisterType {
    email: string;
    password: string;
    userName: string;
}

export interface AccountType {
    _id: string;
    user_name: string;
    email: string;
    image: string;
    role: number;
    sum_comment?: number;
    sum_list_music?: number;
    sum_upload?: number;
    password?: string;
    updatedAt: string;
    createdAt: string;
}

export interface AccountResponse {
    data: AccountType;
    accessToken: string;
}

export interface InitialStateAccountSliceType {
    data: null | AccountType;
    loading: boolean;
    access_token: string | null;
}
