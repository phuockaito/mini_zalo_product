import { apiMusic } from '@/api';
import { Card, LoadingCard, WrapperPage } from '@/components'
import { useInfiniteQuery } from '@tanstack/react-query';
import React from 'react'
import { IoCloseOutline } from "react-icons/io5";
import { CiSearch } from 'react-icons/ci';
import { MdOutlineKeyboardArrowLeft } from "react-icons/md";
import { useNavigate } from "react-router";

export const Search = () => {
    const navigate = useNavigate();
    const [keyword, setKeyword] = React.useState("");

    const {
        data,
        fetchNextPage,
        status,
    }: any = useInfiniteQuery({
        queryKey: ['searchMusic', keyword],
        queryFn: async ({ pageParam }) => {
            const response = await apiMusic.getSearch(pageParam);
            return response;
        },
        initialPageParam: {
            query: keyword,
            _page: 1,
            _limit: 10
        },
        getNextPageParam: (lastPage: any) => {
            return {
                _page: lastPage.pagination._page + 1,
                _limit: 10,
                query: keyword
            };
        },
    });

    const articles = data?.pages.reduce((acc, page) => {
        return [...acc, ...page.data];
    }, []);


    return (
        <WrapperPage>
            <div
                className="bg-[#17171f] sticky top-[-17px] left-[-5px] py-4 z-10 flex"
            >
                <div
                    className="mr-2"
                    onClick={() => navigate("/")}
                >
                    <MdOutlineKeyboardArrowLeft color="#ffff" size={25} />
                </div>
                <input
                    onChange={(event) => setKeyword(event.target.value)}
                    value={keyword}
                    name="search"
                    placeholder="Nhập tên bài hát, ca sĩ, thể loại..."
                    className="w-full text-sm bg-transparent focus:outline-none text-white"
                />
                {
                    keyword
                        ? <IoCloseOutline onClick={() => setKeyword("")} color="#ffff" size={25} />
                        : <CiSearch color="#ffff" size={25} />
                }
            </div>
            <div className="h-full">
                {
                    status === "pending" &&
                    <WrapperPage>
                        <LoadingCard />
                    </WrapperPage>
                }
                {
                    status === "success" &&
                        articles.length > 0 ?
                        <div
                            className="grid grid-cols-1 gap-y-4 gap-x-2"
                        >
                            {articles.map((item) => <Card key={item._id} item={item} />)}
                        </div>
                        : <div className="flex items-center justify-center h-[80%]">
                            <p className="text-base text-white font-semibold">Không có dữ liệu</p>
                        </div>
                }
            </div>
        </WrapperPage >
    )
}
