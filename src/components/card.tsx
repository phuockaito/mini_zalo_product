import React from 'react'
import { CiHeart } from 'react-icons/ci';
import { LazyImg } from '.';
import { formatView, handleSlug } from '@/constants';
import { useDrawer } from '@/hooks';
import { ItemMusicType } from '@/type'
import { PiMusicNotesSimpleThin } from "react-icons/pi";
import { IoTimeOutline } from "react-icons/io5";

export const Card = ({ item }: { item: ItemMusicType }) => {
    const { toggleDrawer } = useDrawer();

    return (
        <div
            className="cursor-pointer flex gap-4"
            onClick={() => {
                toggleDrawer({
                    open: true,
                    data: {
                        _id: item._id,
                        _category: handleSlug(item.category)
                    }
                })
            }}
        >
            <div className="w-[70px] h-[70px]">
                <LazyImg
                    alt={item.name_music}
                    src={item.image_music}
                />
            </div>
            <div className="flex flex-col justify-between gap-1 flex-1 w-full">
                <p className="text-base text-white font-bold truncate">
                    {item.name_music}
                </p>
                <p className="text-[#01aaed] truncate text-[14px] font-semibold">
                    {item.name_singer}
                </p>
                <div className="grid grid-cols-3">
                    <div className="flex gap-1 items-center">
                        <CiHeart color="#ff3465" size={20} />
                        <span className="text-[#a5a6c4] text-[14px]">
                            {formatView(item.favorite)}
                        </span>
                    </div>
                    <div className="flex gap-1 items-center">
                        <PiMusicNotesSimpleThin color="#ff3465" size={20} />
                        <span className="text-[#a5a6c4] text-[14px]">{formatView(item.view)}</span>
                    </div>
                    <div className="flex gap-1 items-center">
                        <IoTimeOutline color="#ff3465" size={20} />
                        <span className="text-[#a5a6c4] text-[14px]">{item.time_format}</span>
                    </div>
                </div>
            </div>
        </div>
    )
}
