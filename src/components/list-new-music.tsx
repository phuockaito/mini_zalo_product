import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import React from 'react'
import { Card, LoadingCard } from '.';
import { useMusic } from '@/hooks'

export const ListNewMusic = () => {
    const { fetchNewMusic } = useMusic();
    const {
        data,
        status,
    }: any = useInfiniteQuery({
        queryKey: ['fetchNewMusic'],
        queryFn: async ({ pageParam }) => {
            const { payload }: any = await fetchNewMusic(pageParam);
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
            {articles.map((item) => <Card key={item._id} item={item} />)}
        </div>
    )
}
