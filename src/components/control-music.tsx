import clsx from 'clsx';
import React from 'react'
import { IoPauseCircleOutline, IoPlayBackOutline, IoPlayCircleOutline, IoPlayForwardOutline } from 'react-icons/io5';
import { IconNextMusic, IconPreMusic, LazyImg } from '.'
import { useDrawer, useMusic } from '@/hooks';
import { handleSlug } from '@/constants';

export const ControlMusic = () => {
    const { storeMusic, handlePlayingAudio } = useMusic();
    const { playing_audio, audio, music } = storeMusic;
    const { toggleDrawer } = useDrawer();
    if (!music) return <></>;
    return (
        <div className="w-full z-50">
            <div className="flex gap-3 p-4">
                <div
                    className={clsx("w-10 h-10 rounded-full", playing_audio && "spin-2s")}
                    onClick={() => {
                        toggleDrawer({
                            open: true,
                            data: {
                                _id: music._id,
                                _category: handleSlug(music.category)
                            }
                        })
                    }}
                >
                    <LazyImg
                        src={music.image_music}
                        alt=""
                        className="rounded-full border border-[#ffff]"
                    />
                </div>
                <div className="flex items-center justify-between w-full flex-1 overflow-hidden gap-3">
                    <div className="overflow-hidden">
                        <p className="text-sm text-white font-bold truncate">{music.name_music}</p>
                        <p className="text-[#01aaed] truncate text-xs font-semibold">{music.name_singer}</p>
                    </div>
                    <div className="flex gap-3 items-center">
                        <IconPreMusic open={false} _id={music._id} size={17} />
                        {
                            playing_audio
                                ? <IoPauseCircleOutline
                                    color="#ff3465" size={27}
                                    onClick={() => {
                                        audio?.pause();
                                        handlePlayingAudio(false);
                                    }}
                                />
                                : <IoPlayCircleOutline
                                    color="#ff3465"
                                    size={27}
                                    onClick={() => {
                                        handlePlayingAudio(true);
                                        audio?.play();
                                    }}
                                />
                        }
                        <IconNextMusic open={false} _id={music._id} size={17} />
                    </div>
                </div>
            </div>
        </div>
    )
};
