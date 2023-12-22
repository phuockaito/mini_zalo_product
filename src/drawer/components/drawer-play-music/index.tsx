import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Slider, Drawer } from "antd";
import { saveAs } from "file-saver";

import { useAccount, useDrawer, useMusic } from '@/hooks';
import { Duration, IconNextMusic, IconPreMusic } from '@/components';

import { FaHeart } from "react-icons/fa";
import { IoPlayCircleOutline } from "react-icons/io5";
import { CiHeart } from 'react-icons/ci';
import { AiOutlineRetweet } from "react-icons/ai";
import { FaRandom } from "react-icons/fa";
import { IoPauseCircleOutline } from "react-icons/io5";
import { CiBoxList } from "react-icons/ci";
import { BsDownload, BsThreeDots } from "react-icons/bs";
import { FaAngleLeft } from "react-icons/fa6";
import { TfiComment } from "react-icons/tfi";

import { ListMusic } from './list-music';
import { ListComment } from './list-comment';
import { FormComment } from './form-comment';
import { handleSlug, PAGE_ROUTER } from '@/constants';
import clsx from 'clsx';
import { apiMusic } from '@/api';

export const DrawerPlayMusic = ({ _id, _category }) => {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const { toggleDrawer } = useDrawer();
  const [duration, setDuration] = React.useState<number>(0);
  const [currentTime, setCurrentTime] = React.useState<number>(0);
  const audioRef = React.useRef<any>(null);
  const [openList, setOpenList] = React.useState<boolean>(false);
  const [openComment, setOpenComment] = React.useState<boolean>(false);
  const [favorite, setFavorite] = React.useState<any>([]);

  const { handleCloseDrawer } = useDrawer();
  const { access_token, storeAccount } = useAccount();

  const {
    fetchCategorysMusic,
    fetchGetMusic,
    handleCreatePlayHistoryMusic,
    handlePlayingAudio,
    handleLoopAudio,
    handleOnAudio,
    handlePlayRandom,
    storeMusic
  } = useMusic();
  const { music, loop_audio, playing_audio, play_random, category } = storeMusic;

  React.useEffect(() => {
    if (_id) {
      fetchGetMusic(_id);
      handleCreatePlayHistoryMusic(_id);
      fetchCategorysMusic({ category: _category })
    }
  }, [_id]);

  const handleTimeSliderChange = React.useCallback(
    (position: any) => {
      audioRef.current.currentTime = position;
      setCurrentTime(position);
    },
    []
  );

  const handleLoadedData = React.useCallback(() => {
    setDuration(audioRef.current.duration);
    handleOnAudio(audioRef.current);
  }, []);

  const onTimeUpdate = React.useCallback(() => {
    if (audioRef.current.currentTime === audioRef.current.duration) {
      if (loop_audio) {
        handlePlayingAudio(true);
      }
      else {
        if (play_random) {
          const index = Math.floor(Math.random() * category.length);
          const indexMusic = category[index];
          toggleDrawer({
            open: true,
            data: {
              _id: indexMusic._id,
              _category: handleSlug(indexMusic.category)
            }
          });
        } else {
          handlePlayingAudio(false);
        }
      }
    }
    setCurrentTime(audioRef.current.currentTime);
  }, [play_random, loop_audio, audioRef]);

  const handleFavorite = async () => {
    if (!access_token) return navigate(PAGE_ROUTER.PROFILE);
    try {
      const { account_favorite }: any = await apiMusic.createFavoriteMusic(_id);
      setFavorite(account_favorite);
    } catch (error) {
      console.log(error)
    }
  };

  const checkFavorite = React.useMemo(() => {
    if (music && storeAccount.data) {
      const account = favorite.find(item => item._id === storeAccount.data?._id);
      return !!account;
    }
    return false;
  }, [music, favorite, storeAccount.data]);

  React.useEffect(() => {
    if (music) {
      setFavorite(music.account_favorite);
    }
  }, [music]);

  if (!music) return <Loading />

  return (
    <>
      <audio
        src={music.src_music}
        controls
        loop={loop_audio}
        autoPlay={playing_audio}
        ref={audioRef}
        onTimeUpdate={onTimeUpdate}
        hidden
        onLoadedData={handleLoadedData}
      />
      <ListMusic
        openList={openList}
        setOpenList={setOpenList}
        category={_category}
      />
      <Drawer
        closeIcon={false}
        title={false}
        open={pathname === PAGE_ROUTER.PROFILE ? false : openComment}
      >
        <div className="flex items-center justify-between bg-[#17171f] w-full top-0 p-4 sticky z-50">
          <FaAngleLeft onClick={() => setOpenComment(false)} color="#ffff" size={20} />
          <p
            className="text-white relative text-lg right-6"
          >
            Bình luận
          </p>
          <p />
        </div>
        <ListComment _id={_id} />
        <div className="sticky bottom-0">
          <FormComment id_music={_id} />
        </div>
      </Drawer >
      <div className="p-4 relative h-full grid">
        <div className="flex items-center justify-between h-7 overflow-hidden">
          <div
            onClick={handleCloseDrawer}
          >
            <FaAngleLeft color="#ffff" size={20} />
          </div>
          <p
            className="text-white relative overflow-hidden truncate text-lg"
          >
            {music.name_music}
          </p>
          <CiBoxList color="#ffff" size={25} onClick={() => setOpenList(!openList)} />
        </div>
        <div className="grid place-content-center place-self-end w-full gap-8">
          <div
            className={clsx("w-[280px] h-[280px]", playing_audio && "spin-2s")}
          >
            <img
              src={music.image_music}
              alt={music.image_music}
              className="object-cover w-full h-full rounded-full border-[2px] border-[#ffff]"
            />
          </div>
          <div className="flex items-center justify-center flex-col">
            <p className="text-white text-xl font-semibold text-center">{music.name_music}</p>
            <p className="text-slate-200 text-base">{music.name_singer}</p>
          </div>
          <div className="flex items-center justify-center gap-10">
            <BsDownload
              color="#ffff"
              size={22}
              onClick={() => saveAs(music.src_music, `${music.name_music}.mp3`)}
            />
            <div
              onClick={handleFavorite}
            >
              {
                checkFavorite ?
                  <FaHeart
                    color="#ff3465" size={25}
                  />
                  : <CiHeart
                    color="#ffff" size={30}
                  />
              }
            </div>
            <TfiComment color="#ffff" size={22} onClick={() => setOpenComment(!openComment)} />
          </div>
        </div>
        <div className="place-self-end w-full mb-6">
          <Slider
            max={duration}
            min={0}
            value={currentTime}
            onChange={handleTimeSliderChange}
            tooltip={{
              open: false
            }}
            railStyle={{
              background: "#21212a",
            }}
            trackStyle={{
              background: "linear-gradient(90deg,#008aff,#00ffe7)",
            }}
            handleStyle={{
              background: "linear-gradient(90deg,#008aff,#00ffe7)",
            }}
          />
          <div className="flex justify-between mt-1">
            <Duration seconds={currentTime} className="text-white rounded" />
            <Duration seconds={duration} className="text-white rounded" />
          </div>
          <div className="flex items-center justify-center gap-8">
            <FaRandom
              color={play_random ? "#ff3465" : "#ffff"}
              size={22}
              onClick={() => handlePlayRandom(!play_random)}
            />
            <IconPreMusic
              _id={_id}
              size={28}
            />
            {
              playing_audio
                ? <IoPauseCircleOutline
                  color="#ff3465" size={50}
                  onClick={() => {
                    audioRef.current.pause();
                    handlePlayingAudio(false);
                  }}
                />
                : <IoPlayCircleOutline
                  color="#ff3465"
                  size={50}
                  onClick={() => {
                    handlePlayingAudio(true);
                    audioRef.current.play();
                  }}
                />
            }
            <IconNextMusic _id={_id} size={28} />
            <AiOutlineRetweet
              color={loop_audio ? "#ff3465" : "#ffff"}
              size={25}
              onClick={() => handleLoopAudio(!loop_audio)}
            />
          </div>
        </div>
      </div>
    </>
  )
};

const Loading = () => {
  return (
    <div className="p-5 h-full">
      <div className="animate-pulse flex flex-col h-full justify-between">
        <div className="h-4 bg-slate-200 rounded col-span-2 mb-9" />
        <div>
          <div className="rounded-full bg-slate-200 w-[280px] h-[280px] m-auto" />
          <div className="flex flex-col gap-2 mt-7 justify-center items-center">
            <div className="h-2 bg-slate-200 rounded w-24" />
            <div className="h-2 bg-slate-200 rounded w-32" />
          </div>
        </div>
        <div className="flex flex-col gap-2 mt-5 justify-center items-center">
          <div className="h-2 bg-slate-200 rounded w-24" />
          <div className="h-2 bg-slate-200 rounded w-32" />
        </div>
      </div>
    </div>
  )
};