import React from 'react';

interface LoadingCardType {
    item?: number;
    className?: string;
}

export const LoadingCard = ({ item = 8, className = "grid grid-cols-1 gap-4" }: LoadingCardType) => {
    return (
        <div className={className}>
            {
                [...Array(item)].map((_, index) => (
                    <div className="animate-pulse flex gap-4" key={index.toString()}>
                        <div className="flex items-center justify-center">
                            <div className="rounded bg-slate-700 w-[70px] h-[70px]" />
                        </div>
                        <div className="flex flex-col mt-2 gap-2">
                            <div className="h-2 bg-slate-700 rounded w-32" />
                            <div className="h-2 bg-slate-700 rounded w-44" />
                            <div className="h-2 bg-slate-700 rounded w-24" />
                            <div className="h-2 bg-slate-700 rounded w-12" />
                        </div>
                    </div>
                ))
            }
        </div>
    )
}
