import { useQuery } from '@tanstack/react-query';
import React from 'react'
import { Card, LoadingCard } from '.';
import { useMusic } from '@/hooks'

export const ListBillion = () => {

    const { fetchMusicBillionMusic } = useMusic();
    const { data, isLoading }: any = useQuery({ queryKey: ['fetchMusicBillionMusic'], queryFn: () => fetchMusicBillionMusic() });

    if (isLoading) return (
        <LoadingCard />
    );

    return (
        <div className="grid grid-cols-1 gap-y-4 gap-x-2">
            {data?.payload?.data.map((item) => <Card key={item._id} item={item} />)}
        </div>
    )
}
