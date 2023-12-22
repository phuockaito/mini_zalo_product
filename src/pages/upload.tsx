import { useInfiniteQuery } from '@tanstack/react-query';
import React from 'react'
import InfiniteScroll from 'react-infinite-scroll-component';
import { Card, LoadingCard, WrapperPage } from '@/components';
import { useAccount } from '@/hooks';
import { ItemMusicType } from '@/type';

export const Upload = () => {
    const { access_token } = useAccount();
    const { handleGetUploadAccount } = useAccount();

    const {
        data,
        fetchNextPage,
        status,
    }: any = useInfiniteQuery({
        queryKey: ['handleGetUploadAccount'],
        queryFn: async ({ pageParam }) => {
            const { payload }: any = await handleGetUploadAccount(pageParam);
            return payload;
        },
        enabled: !!access_token,
        initialPageParam: 1,
        getNextPageParam: (lastPage: any) => {
            return lastPage.pagination._page + 1;
        },
    });

    if (!access_token) {
        return (
            <WrapperPage>
                <p className="text-white text-lg font-semibold flex items-center justify-center h-full">Vui lòng đăng nhập</p>
            </WrapperPage>
        )
    }

    const articles: ItemMusicType[] = data?.pages.reduce((acc: ItemMusicType[], page) => {
        return [...acc, ...page.data];
    }, []);


    if (status === "pending") {
        return (
            <WrapperPage>
                <LoadingCard />
            </WrapperPage>
        )
    };

    if (!articles.length) {
        return (
            <WrapperPage>
                <p className="text-white text-lg font-semibold flex items-center justify-center h-full">Không có dữ liệu</p>
            </WrapperPage>
        )
    }

    return (
        <WrapperPage>
            <InfiniteScroll
                dataLength={articles.length}
                next={fetchNextPage}
                hasMore={data.pages[0].pagination._total !== articles.length}
                loader={
                    <h4 className="text-white text-center mt-4 block mx-auto">Loading...</h4>
                }
                height={700}
                className="hidden-scroll"
            >
                <div className="grid grid-cols-1 gap-y-4 gap-x-2">
                    {articles.map((item: ItemMusicType) => <Card key={item._id} item={item} />)}
                </div>
            </InfiniteScroll>
        </WrapperPage>
    );
}
