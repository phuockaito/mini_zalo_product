import React from 'react';
import { Drawer } from 'antd';
import InfiniteScroll from 'react-infinite-scroll-component';

import { FaAngleLeft } from 'react-icons/fa6';
import { useDrawer, useMusic } from '@/hooks';
import { useInfiniteQuery } from '@tanstack/react-query';
import { LoadingCard, WrapperPage } from '@/components';
import { apiMusic } from '@/api';
import { handleSlug } from '@/constants';

interface ListMusicType {
    openList: boolean;
    setOpenList: (e: boolean) => void;
    category: string;
}

export const ListMusic = ({
    openList,
    setOpenList,
    category
}: ListMusicType) => {

    const { toggleDrawer } = useDrawer();

    const {
        data,
        fetchNextPage,
        status,
    } = useInfiniteQuery({
        queryKey: ['fetchCategorysMusic', category],
        queryFn: async ({ pageParam }) => {
            const response = await apiMusic.getCategory(pageParam);
            return response;
        },
        enabled: !!category && openList,
        initialPageParam: {
            category: category,
            _page: 1,
            _limit: 10
        },
        getNextPageParam: (lastPage: any) => {
            return {
                _page: lastPage.pagination._page + 1,
                _limit: 10,
                category: category
            };
        },
    });

    const articles = data?.pages.reduce((acc, page) => {
        return [...acc, ...page.data];
    }, []);

    return (
        <Drawer
            closeIcon={false}
            title={false}
            open={openList}
        >
            <div>
                <div className="flex items-center justify-between bg-[#17171f] w-full top-0 py-4 sticky z-50 px-4">
                    <FaAngleLeft onClick={() => setOpenList(false)} color="#ffff" size={20} />
                    <p
                        className="relative text-lg text-white right-6"
                    >
                        Danh sách gợi ý
                    </p>
                    <p />
                </div>
                {
                    status === "pending" &&
                    <WrapperPage>
                        <LoadingCard />
                    </WrapperPage>
                }
                {
                    status === "success" &&
                    <InfiniteScroll
                        dataLength={articles.length}
                        next={fetchNextPage}
                        hasMore={data.pages[0].pagination._total !== articles.length}
                        loader={
                            <h4 className="block mx-auto mt-4 text-center text-white">Loading...</h4>
                        }
                        height={700}
                        className="px-4 pb-4 hidden-scroll"
                    >
                        <div
                            className="flex flex-col gap-4"
                        >
                            {
                                articles.map((item) => (
                                    <div
                                        className="flex gap-4"
                                        key={item._id}
                                        onClick={() => {
                                            toggleDrawer({
                                                open: true,
                                                data: {
                                                    _id: item._id,
                                                    _category: handleSlug(item.category)
                                                }
                                            });
                                            setOpenList(false);
                                        }}
                                    >
                                        <div
                                            className="w-16 h-16"
                                        >
                                            <img
                                                src={item.image_music}
                                                alt={item.image_music}
                                                className="object-cover w-full h-full rounded-lg"
                                            />
                                        </div>
                                        <div className="flex justify-between flex-1 w-full gap-4 overflow-hidden">
                                            <div className="flex flex-col overflow-hidden">
                                                <p className="overflow-hidden text-lg font-bold text-white truncate">{item.name_music}</p>
                                                <p className="overflow-hidden text-base text-white truncate">{item.name_singer}</p>
                                            </div>
                                            <p className="text-base text-white">{item.time_format}</p>
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                    </InfiniteScroll>
                }
            </div>
        </Drawer>
    )
}
