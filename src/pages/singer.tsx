import { apiMusic } from '@/api';
import { Card, LoadingCard, WrapperPage } from '@/components'
import { handleSlug } from '@/constants';
import { useInfiniteQuery } from '@tanstack/react-query';
import React from 'react'
import { MdOutlineKeyboardArrowLeft } from 'react-icons/md'
import InfiniteScroll from 'react-infinite-scroll-component';
import { useNavigate, useParams } from 'react-router';

export const Singer = () => {
    const navigate = useNavigate();
    const { name } = useParams();

    const {
        data,
        fetchNextPage,
        status,
    }: any = useInfiniteQuery({
        queryKey: ['getSinger', handleSlug(name || "")],
        queryFn: async ({ pageParam }) => {
            const response: any = await apiMusic.getSinger(pageParam);
            return response;
        },
        initialPageParam: {
            _singer: handleSlug(name || ""),
            _page: 1,
            _limit: 10
        },
        getNextPageParam: (lastPage: any) => {
            return {
                _page: lastPage.pagination._page + 1,
                _limit: 10,
                _singer: handleSlug(name || "")
            };
        },
    });

    const articles = data?.pages.reduce((acc, page) => {
        return [...acc, ...page.data];
    }, []);

    if (status === "pending") {
        return (
            <WrapperPage>
                <LoadingCard />
            </WrapperPage>
        )
    };
    return (
        <WrapperPage>
            <div
                className="bg-[#17171f] sticky top-[-17px] left-[-5px] py-4 z-10 flex items-center justify-between"
            >
                <div
                    className="mr-2"
                    onClick={() => navigate("/")}
                >
                    <MdOutlineKeyboardArrowLeft color="#ffff" size={25} />
                </div>
                <p className="text-white relative text-lg">{name}</p>
                <p />
            </div>
            <InfiniteScroll
                dataLength={articles.length}
                next={fetchNextPage}
                hasMore={data.pages[0].pagination._total !== articles.length}
                loader={
                    <h4 className="text-white text-center mt-4 block mx-auto">Loading...</h4>
                }
                height={700}
                className="hidden-scroll"
            >
                <div className="grid grid-cols-1 gap-y-4 gap-x-2">
                    {articles.map((item) => <Card key={item._id} item={item} />)}
                </div>
            </InfiniteScroll>
        </WrapperPage>
    )
}
