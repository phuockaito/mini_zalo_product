import { ModalType } from "@/type";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialStateModal: ModalType = {
    title: "",
    data: {},
    type: "",
};

export const modalSlice = createSlice({
    name: "modal",
    initialState: initialStateModal,
    reducers: {
        openModal: (state: ModalType, action: PayloadAction<ModalType>) => {
            const { title, data, type } = action.payload;
            state.title = title;
            state.data = data;
            state.type = type;
        },
    },
});
const { actions, reducer } = modalSlice;
export const { openModal } = actions;
export default reducer;
