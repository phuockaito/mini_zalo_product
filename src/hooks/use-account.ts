import { asyncThunkGetFavoriteAccount, asyncThunkGetUploadAccount } from '@/features/account/patch-api';
import { accountStore, asyncThunkGetProfile, asyncThunkPostLogin, asyncThunkPostRegister, onLogout } from "@/features";
import { PayloadLoginType, PayloadRegisterType } from "@/type";
import * as React from "react";
import { useAppDispatch, useAppSelector } from "./use-react-redux";

export const useAccount = () => {
    const dispatch = useAppDispatch();
    const storeAccount = useAppSelector(accountStore);
    const { access_token } = storeAccount;
    const handlePostLogin = React.useCallback((payload: PayloadLoginType) => dispatch(asyncThunkPostLogin(payload)), [dispatch]);
    const handlePostRegister = React.useCallback((payload: PayloadRegisterType) => dispatch(asyncThunkPostRegister(payload)), [dispatch]);
    const handleLogout = React.useCallback(() => dispatch(onLogout()), [dispatch]);
    const handleGetProfile = React.useCallback(() => dispatch(asyncThunkGetProfile()), [dispatch]);
    const handleGetFavoriteAccount = React.useCallback((page) => dispatch(asyncThunkGetFavoriteAccount(page)), [dispatch]);
    const handleGetUploadAccount = React.useCallback((page) => dispatch(asyncThunkGetUploadAccount(page)), [dispatch]);

    return {
        storeAccount,
        access_token,
        handlePostLogin,
        handleLogout,
        handlePostRegister,
        handleGetProfile,
        handleGetFavoriteAccount,
        handleGetUploadAccount
    };
};
