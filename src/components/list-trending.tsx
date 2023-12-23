import { useInfiniteQuery } from '@tanstack/react-query';
import React from 'react'
import { Card, LoadingCard } from '.';
import { useMusic } from '@/hooks'

export const ListTrending = () => {
    const { fetchGetTrendingMusic } = useMusic();
    const {
        data,
        status,
    }: any = useInfiniteQuery({
        queryKey: ['fetchGetTrendingMusic'],
        queryFn: async ({ pageParam }) => {
            const { payload }: any = await fetchGetTrendingMusic(pageParam);
            return payload;
        },
        initialPageParam: 1,
        getNextPageParam: (lastPage: any) => {
            return lastPage.pagination._page + 1;
        },
    });

    const articles = data?.pages.reduce((acc, page) => {
        return [...acc, ...page.data];
    }, []);

    if (status === "pending") {
        return (
            <LoadingCard />
        )
    };

    return (
        <div className="grid grid-cols-1 gap-y-4 gap-x-2">
            {articles.map((item, index) =>
                <div
                    key={item._id}
                    className="flex items-center gap-4 w-full flex-1"
                >
                    <p
                        className="text-white font-semibold text-2xl"
                    >
                        {index + 1 < 10 ? `0${index + 1}` : index + 1}
                    </p>
                    <Card item={item} />
                </div>
            )}
        </div>
    )
}
