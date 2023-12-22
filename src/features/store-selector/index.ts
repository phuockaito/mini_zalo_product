import { RootState } from "@/store";
export const musicStore = (state: RootState) => state.storeMusic;
export const accountStore = (state: RootState) => state.storeAccount;
export const modalStore = (state: RootState) => state.storeModal;
export const drawerStore = (state: RootState) => state.storeDrawer;
export const commentStore = (state: RootState) => state.storeComment;
