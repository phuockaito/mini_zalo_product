import React from 'react'
import { Input } from 'antd';
import styled from 'styled-components';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { AiOutlineLoading } from "react-icons/ai";
import { FiSend } from "react-icons/fi";
import { useAccount, useComment } from '@/hooks';
import { useNavigate } from "react-router-dom";
import { PAGE_ROUTER } from '@/constants';

export const FormComment = ({ id_music }: { id_music: string }) => {
    const queryClient = useQueryClient();

    const navigate = useNavigate();
    const [comment, setComment] = React.useState<string>("");
    const [loading, setLoading] = React.useState(false);

    const { fetchCreateComment } = useComment();
    const { access_token } = useAccount();

    const { mutateAsync } = useMutation({
        mutationFn: async () => {
            return fetchCreateComment({ id_music, content: comment });
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["fetchGetComment", id_music] });
        },
    });

    const onSubmit = async () => {
        if (!comment) return;
        if (!access_token) return navigate(PAGE_ROUTER.PROFILE);
        try {
            setLoading(true);
            await mutateAsync();
            setLoading(false);
            setComment("");
        } catch (error) {
            console.log(error)
            setLoading(false);
        }
    }

    return (
        <div className="flex w-full bg-[#17171f] border-t border-[#7f7f9c] py-3">
            <div className="flex items-center w-full">
                <CsInput
                    value={comment}
                    onChange={event => setComment(event.target.value)}
                    placeholder="Viết bình luận..."
                    autoSize={{
                        minRows: 1,
                        maxRows: 2,
                    }}
                    bordered={false}
                />
                {
                    loading
                        ? <div
                            className="animate-spin mr-2"
                        >
                            <AiOutlineLoading color={comment ? "#ffff" : "#7f7f9c"} size={20} />
                        </div>
                        :
                        <div
                            className="mr-2"
                            onClick={onSubmit}
                        >
                            <FiSend color={comment ? "#ffff" : "#7f7f9c"} size={20} />
                        </div>
                }
            </div>
        </div>
    )
};

const CsInput = styled(Input.TextArea)`
    color: #ffff;
    &::placeholder {
        color: #7f7f9c;
    }
`