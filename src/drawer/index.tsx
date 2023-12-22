import React from "react";
import { Drawer } from 'antd';
import { useLocation } from 'react-router-dom';

import { useDrawer } from "@/hooks";
import { DrawerPlayMusic } from "./components";
import { PAGE_ROUTER } from "@/constants";

export const ContainerDrawer = () => {
    const { storeDrawer } = useDrawer();
    const { open, data } = storeDrawer;
    const { pathname } = useLocation();

    return (
        <Drawer
            closeIcon={false}
            title={false}
            open={pathname === PAGE_ROUTER.PROFILE ? false : open}
        >
            <DrawerPlayMusic {...data} />
        </Drawer>
    )
};
