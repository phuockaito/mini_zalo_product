import { useInfiniteQuery } from '@tanstack/react-query';
import clsx from 'clsx';
import React from 'react'
import { CiSearch } from 'react-icons/ci';
import { FaAngleLeft } from 'react-icons/fa6'
import InfiniteScroll from 'react-infinite-scroll-component';
import { Card, LoadingCard, WrapperPage } from '.';
import { apiMusic } from '@/api';

interface SearchType {
    keyword: string;
    setOpenSearch: (open: boolean) => void;
    setKeyword: (keyword: string) => void;
    openSearch: boolean;
}

export const Search = ({
    keyword,
    setOpenSearch,
    openSearch,
    setKeyword
}: SearchType) => {
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
        enabled: openSearch,
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
        <div className="h-full">
            <div
                className="flex items-center py-4 border-b-[2px] px-4 border-[#21212a]"
            >
                <div
                    className="mr-2"
                    onClick={() => setOpenSearch(false)}
                >
                    <FaAngleLeft color="#ffff" size={23} />
                </div>
                <input
                    onChange={(event) => setKeyword(event.target.value)}
                    value={keyword}
                    name="search"
                    placeholder="Nhập tên bài hát, ca sĩ, thể loại..."
                    className="w-full text-sm bg-transparent focus:outline-none text-white"
                />
                <div className="ml-2">
                    <CiSearch color="#ffff" size={23} />
                </div>
            </div>
            {
                status === "pending" &&
                <WrapperPage>
                    <LoadingCard />
                </WrapperPage>
            }
            {
                status === "success" &&
                    articles.length > 0 ?
                    <InfiniteScroll
                        className={clsx("p-4", keyword && "pb-[8rem]")}
                        dataLength={articles.length}
                        next={fetchNextPage}
                        hasMore={data.pages[0].pagination._total !== articles.length}
                        loader={
                            <h4 className="text-white text-center mt-4 block mx-auto">Loading...</h4>
                        }
                        height={700}
                    >
                        <div
                            className="grid grid-cols-1 gap-y-4 gap-x-2"
                        >
                            {articles.map((item) => <Card key={item._id} item={item} />)}
                        </div>
                    </InfiniteScroll>
                    : <div className="flex items-center justify-center h-[80%]">
                        <p className="text-base text-white font-semibold">Không có dữ liệu</p>
                    </div>
            }
        </div>
    )
}
