import React from 'react';
import { useDrawer, useMusic } from '@/hooks';
import { IoPlayBackOutline } from 'react-icons/io5';
import { handleSlug } from '@/constants';

interface IconPreMusicType {
    _id: string;
    size: number;
    open?: boolean;
}

export const IconPreMusic = ({ _id, size, open = true }: IconPreMusicType) => {
    const { storeMusic } = useMusic();
    const { toggleDrawer } = useDrawer();

    const { category } = storeMusic;

    const handlePreMusic = () => {
        const lengthCategory = category.length - 1;
        const index = category.findIndex((item) => item._id === _id);
        const nusic = category[index === 0 ? lengthCategory : index - 1];
        toggleDrawer({
            open: open,
            data: {
                _id: nusic._id,
                _category: handleSlug(nusic.category)
            }
        })
    };

    return <IoPlayBackOutline
        color="#ffff"
        size={size}
        onClick={handlePreMusic}
    />
}
