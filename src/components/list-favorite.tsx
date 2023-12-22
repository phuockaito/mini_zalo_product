import { useQuery } from '@tanstack/react-query';
import React from 'react'
import { Card, LoadingCard } from '.';
import { useMusic } from '@/hooks'

export const ListFavorite = () => {

    const { fetchFavoriteMusic } = useMusic();
    const { data, isLoading }: any = useQuery({ queryKey: ['fetchFavoriteMusic'], queryFn: () => fetchFavoriteMusic() });

    if (isLoading) return (
        <LoadingCard />
    );

    return (
        <div className="grid grid-cols-1 gap-y-4 gap-x-2">
            {data?.payload?.data.map((item) => <Card key={item._id} item={item} />)}
        </div>
    )
}
