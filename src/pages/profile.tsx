import React from 'react'

import { Login, WrapperPage } from '@/components'
import { useAccount } from '@/hooks'

import { VscSignOut } from "react-icons/vsc";
import moment from 'moment';


export const Profile = () => {
    const { storeAccount, handleLogout } = useAccount();
    const { access_token, data } = storeAccount;

    if (!access_token) return <Login />;
    if (!data) {
        return (
            <WrapperPage>
                <p className="text-white">Loading...</p>
            </WrapperPage>
        )
    }
    return (
        <WrapperPage>
            <div className="">
                <div className="flex justify-center flex-col items-center">
                    <div className="w-16 h-16">
                        <img className="w-full h-full" src={data.image} alt={data.email} />
                    </div>
                    <p className="text-white text-lg font-bold">{data.user_name}</p>
                </div>
                <div className="mt-8 flex flex-col gap-4">
                    <div className="flex gap-2 justify-between items-center">
                        <p className="text-[#a5a6c4] font-bold text-base">Email</p>
                        <p className="text-[#a5a6c4] text-base">{data.email}</p>
                    </div>
                    <div className="flex gap-2 justify-between items-center">
                        <p className="text-[#a5a6c4] font-bold text-base">Danh sách bài hát</p>
                        <p className="text-[#a5a6c4] text-base">{data.sum_list_music}</p>
                    </div>
                    <div className="flex gap-2 justify-between items-center">
                        <p className="text-[#a5a6c4] font-bold text-base">Bài hát tải lên</p>
                        <p className="text-[#a5a6c4] text-base">{data.sum_upload}</p>
                    </div>
                    <div className="flex gap-2 justify-between items-center">
                        <p className="text-[#a5a6c4] font-bold text-base">Ngày tạo</p>
                        <p className="text-[#a5a6c4] text-base">{moment(data.createdAt).format("DD-MM-YYYY HH:mm")}</p>
                    </div>
                    <div className="flex gap-2 justify-between items-center">
                        <p className="text-[#a5a6c4] font-bold text-base">Đăng xuất</p>
                        <VscSignOut color="#ff3465" size={22} onClick={handleLogout} />
                    </div>
                </div>
            </div>
        </WrapperPage>
    )
};