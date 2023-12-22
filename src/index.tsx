import { ConfigProvider } from "antd";
import React, { Suspense } from "react";
import { Route } from "react-router-dom";
import { Favorite, HomePage, PlayHistory, Profile, Search, Singer, Upload } from "./pages";
import viVn from "antd/locale/vi_VN";
import { Provider } from "react-redux";

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import "keen-slider/keen-slider.min.css"
import 'react-lazy-load-image-component/src/effects/blur.css';

import {
    App,
    ZMPRouter,
    AnimationRoutes,
    SnackbarProvider,
    Spinner,
} from "zmp-ui";

import { store } from "./store";
import { ContainerDrawer } from "./drawer";
import { NavMenu } from "./components";
import { PAGE_ROUTER } from "./constants";
import { useAccount, useMusic } from "./hooks";

export const MyApp = () => {
    const queryClient = new QueryClient();
    return (
        <SnackbarProvider>
            <ZMPRouter>
                <ConfigProvider
                    locale={viVn}
                    theme={{
                        components: {
                            Drawer: {
                            },
                        },
                    }}
                >
                    <Provider store={store}>
                        <QueryClientProvider client={queryClient}>
                            <RootMain />
                        </QueryClientProvider>
                    </Provider>
                </ConfigProvider>
            </ZMPRouter>
        </SnackbarProvider>
    );
};

const RootMain = () => {
    const { access_token, handleGetProfile } = useAccount();

    React.useEffect(() => {
        if (access_token) {
            handleGetProfile();
        }
    }, []);

    return (
        <App>
            <Suspense
                fallback={
                    <div className=" w-screen h-screen flex justify-center items-center">
                        <Spinner />
                    </div>
                }
            >
                <ContainerDrawer />
                <AnimationRoutes>
                    <Route index path={PAGE_ROUTER.HOME} element={<HomePage />} />
                    <Route index path={PAGE_ROUTER.FAVORITE} element={<Favorite />} />
                    <Route path={PAGE_ROUTER.PLAY_HISTORY} element={<PlayHistory />} />
                    <Route path={PAGE_ROUTER.PROFILE} element={<Profile />} />
                    <Route path={PAGE_ROUTER.UPLOAD} element={<Upload />} />
                    <Route path={PAGE_ROUTER.SEARCH} element={<Search />} />
                    <Route path={PAGE_ROUTER.SINGER} element={<Singer />} />
                </AnimationRoutes>
                <NavMenu />
            </Suspense>
        </App>
    )
}
