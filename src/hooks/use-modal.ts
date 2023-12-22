import React from "react";

import { drawerStore, openDrawer } from "@/features";
import { DrawerType } from "@/type";
import { useAppDispatch, useAppSelector } from "./use-react-redux";

export const useDrawer = () => {
    const storeDrawer = useAppSelector(drawerStore);
    const dispatch = useAppDispatch();
    const toggleDrawer = React.useCallback((data: DrawerType) => dispatch(openDrawer(data)), [dispatch]);

    const handleCloseDrawer = () => {
        toggleDrawer({
            open: false,
        });
    };

    return {
        storeDrawer,
        toggleDrawer,
        handleCloseDrawer,
    };
};
