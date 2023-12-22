import {
    accountSlice,
    modalSlice,
    musicSlice,
    CommentSlice,
    drawerSlice
} from "@/features";

export const reducer = {
    storeMusic: musicSlice.reducer,
    storeAccount: accountSlice.reducer,
    storeModal: modalSlice.reducer,
    storeComment: CommentSlice.reducer,
    storeDrawer: drawerSlice.reducer
};
