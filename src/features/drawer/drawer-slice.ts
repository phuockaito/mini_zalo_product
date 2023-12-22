import { DrawerType } from "@/type";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialStateDrawer: DrawerType = {
    data: {},
    open: false,
};

export const drawerSlice = createSlice({
    name: "drawer",
    initialState: initialStateDrawer,
    reducers: {
        openDrawer: (state: DrawerType, action: PayloadAction<DrawerType>) => {
            const { data, open } = action.payload;
            state.data = data;
            state.open = open;
        },
    },
});
const { actions, reducer } = drawerSlice;
export const { openDrawer } = actions;
export default reducer;
