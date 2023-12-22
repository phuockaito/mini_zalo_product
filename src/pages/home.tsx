import React from "react";
import { useKeenSlider } from "keen-slider/react"
import clsx from "clsx";
import { CiSearch } from "react-icons/ci";

import { LazyImg, ListBillion, ListFavorite, ListMillion, ListNewMusic, ListTrending, Search, WrapperPage } from "@/components";
import { useMusic } from "@/hooks";
import { dataBaner, dataHashTag, dataSinger, handleSlug } from "@/constants";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";

export const HomePage: React.FunctionComponent = () => {

    const navigate = useNavigate();
    const { handleHashTag, storeMusic } = useMusic();
    const { hash_tag, hash_tag_index } = storeMusic;

    const ListTab = [ListTrending, ListNewMusic, ListFavorite, ListMillion, ListBillion];
    const CheckInfoTab = ListTab[hash_tag_index];


    const [ref] = useKeenSlider<HTMLDivElement>({
        slides: {
            perView: 3,
            spacing: 5,
        },
    });

    return (
        <WrapperPage>
            <div className="flex items-center py-4">
                <CiSearch color="#ffff" size={23} className="mr-2" />
                <input
                    onFocus={() => navigate("/search")}
                    placeholder="Nhập tên bài hát, ca sĩ, thể loại..."
                    className="w-full text-sm bg-transparent focus:outline-none text-white"
                />
            </div>
            <Baner />
            <div className="bg-[#17171f] sticky top-[-17px] left-[-5px] py-4 z-10">
                <div ref={ref} className="keen-slider">
                    {
                        dataHashTag.map((item, index) => (
                            <div
                                key={index}
                                className="keen-slider__slide cursor-pointer"
                                onClick={() => handleHashTag(handleSlug(item), index)}
                            >
                                <p className={clsx(
                                    "font-bold text-lg text-center",
                                    handleSlug(item) === hash_tag ? "text-[#ff3465]" : "text-[#ffff]"
                                )}>{item}</p>
                            </div>
                        ))
                    }
                </div>
            </div>
            <CheckInfoTab />
            <BannerSinger />
        </WrapperPage>
    );
};


const Baner = () => {
    const [ref] = useKeenSlider<HTMLDivElement>({
        loop: true,
    },
        [
            (slider) => {
                let timeout
                let mouseOver = false
                function clearNextTimeout() {
                    clearTimeout(timeout)
                }
                function nextTimeout() {
                    clearTimeout(timeout)
                    if (mouseOver) return
                    timeout = setTimeout(() => {
                        slider.next()
                    }, 2000)
                }
                slider.on("created", () => {
                    slider.container.addEventListener("mouseover", () => {
                        mouseOver = true
                        clearNextTimeout()
                    })
                    slider.container.addEventListener("mouseout", () => {
                        mouseOver = false
                        nextTimeout()
                    })
                    nextTimeout()
                })
                slider.on("dragStarted", clearNextTimeout)
                slider.on("animationEnded", nextTimeout)
                slider.on("updated", nextTimeout)
            },
        ]);
    return (
        <div >
            <div ref={ref} className="keen-slider">
                {
                    dataBaner.map((item) => (
                        <div
                            key={item}
                            className="keen-slider__slide"
                        >
                            <LazyImg
                                alt={item}
                                src={item}
                            />
                        </div>
                    ))
                }
            </div>
        </div>
    )
};

const BannerSinger = () => {

    const [ref] = useKeenSlider<HTMLDivElement>({
        slides: {
            perView: 4,
            spacing: 15,
        },
    });

    return (
        <div className="mt-4">
            <div ref={ref} className="keen-slider">
                {dataSinger.map((item) => (
                    <div
                        className="keen-slider__slide"
                        key={item.img}
                    >
                        <Link to={`singer/${item.name}`}>
                            <img
                                className="object-cover rounded-full w-full h-full"
                                alt={item.name}
                                src={item.img}
                            />
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    )
};