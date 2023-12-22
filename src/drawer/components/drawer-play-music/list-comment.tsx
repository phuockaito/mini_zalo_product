import React from 'react';
import moment from 'moment';
import { Dropdown } from 'antd';

import { useAccount, useComment } from '@/hooks';
import { BsThreeDotsVertical } from "react-icons/bs";
import { useInfiniteQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import InfiniteScroll from 'react-infinite-scroll-component';


interface ListCommentType {
    _id: string;
}

export const ListComment = ({ _id }: ListCommentType) => {
    const { handleDeleteComment, fetchGetComment } = useComment();
    const { storeAccount } = useAccount();
    const queryClient = useQueryClient();

    const { mutate } = useMutation({
        mutationFn: async (_id: string) => {
            return handleDeleteComment(_id);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["fetchGetComment", _id] });
        },
    });

    const {
        data,
        fetchNextPage,
        status,
    }: any = useInfiniteQuery({
        queryKey: ['fetchGetComment', _id],
        queryFn: async ({ pageParam }) => {
            const { payload }: any = await fetchGetComment(pageParam);
            return payload;
        },
        initialPageParam: {
            _id: _id,
            _page: 1,
            _limit: 10
        },
        getNextPageParam: (lastPage: any) => {
            return {
                _page: lastPage.pagination._page + 1,
                _limit: 10,
                _id
            };
        },
    });

    const articles = data?.pages.reduce((acc, page) => {
        return [...acc, ...page.data];
    }, []);

    if (status === "pending") {
        return (
            <div className="flex h-full justify-center items-center">
                <p className="text-white">Loading...</p>
            </div>
        )
    };

    return (
        <>
            {
                articles.length > 0 ?
                    <InfiniteScroll
                        dataLength={articles.length}
                        next={fetchNextPage}
                        hasMore={data.pages[0].pagination._total !== articles.length}
                        loader={
                            <h4 className="text-white text-center mt-4 block mx-auto">Loading...</h4>
                        }
                        height={593}
                        className="hidden-scroll pb-4 px-4"
                    >
                        <div className="flex flex-col gap-4">
                            {
                                articles.map((item) => (
                                    <div
                                        key={item._id}
                                        className="flex gap-4"
                                    >
                                        <div className="relative w-10 h-10">
                                            <img
                                                className="w-full h-full"
                                                src={item.account.image}
                                                alt={item.account.email}
                                            />
                                        </div>
                                        <div className="w-full flex-1">
                                            <div className="flex justify-between items-center">
                                                <div className="flex gap-2 items-center">
                                                    <p className="text-white font-bold text-lg">{item.account.user_name}</p>
                                                    <div className="flex gap-2 items-center">
                                                        <div className="w-1 h-1 bg-[#7f7f9c] rounded-full" />
                                                        <p className="text-[#7f7f9c] text-base">{moment(item.createdAt).fromNow()}</p>
                                                    </div>
                                                </div>
                                                {
                                                    storeAccount.data && storeAccount.data._id === item.id_account &&
                                                    <Dropdown
                                                        placement="bottomRight"
                                                        menu={{
                                                            items: [
                                                                {
                                                                    key: '1',
                                                                    label: (
                                                                        <p
                                                                            onClick={() => mutate(item._id)}
                                                                        // onClick={() => handleDeleteComment(item._id)}
                                                                        >Xoá</p>
                                                                    ),
                                                                },
                                                            ]
                                                        }}
                                                    >
                                                        <BsThreeDotsVertical color="#ffff" size={18} />
                                                    </Dropdown>
                                                }
                                            </div>
                                            <div
                                                className="text-[#7f7f9c] break-all text-base mt-1"
                                                dangerouslySetInnerHTML={{ __html: item.content.replace(/(\r\n|\n|\r)/gm, "<br />") }}
                                            />
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                    </InfiniteScroll>
                    :
                    <div className="flex justify-center items-center h-full">
                        <p className="text-[#7f7f9c] text-lg">Chưa có bình luận nào</p>
                    </div>
            }
        </>
    )
}
