import React from 'react';
import { useDrawer, useMusic } from '@/hooks';
import { IoPlayForwardOutline } from 'react-icons/io5';
import { handleSlug } from '@/constants';

interface IconNextMusicType {
    _id: string;
    size: number;
    open?: boolean;
}

export const IconNextMusic = ({ _id, size, open = true }: IconNextMusicType) => {
    const { storeMusic } = useMusic();
    const { toggleDrawer } = useDrawer();

    const { category } = storeMusic;

    const handleNextMusic = () => {
        const lengthCategory = category.length - 1;
        const index = category.findIndex((item) => item._id === _id);
        const music = category[index === lengthCategory ? 0 : index + 1];
        toggleDrawer({
            open: open,
            data: {
                _id: music._id,
                _category: handleSlug(music.category)
            }
        })
    };

    return <IoPlayForwardOutline
        color="#ffff"
        size={size}
        onClick={handleNextMusic}
    />
}
