import clsx from 'clsx';
import React from 'react';
import { Link, useLocation } from 'react-router-dom';

import { defaultNavMenu, PAGE_ROUTER } from '@/constants';
import { ControlMusic } from '.';

export const NavMenu = () => {
    const { pathname } = useLocation();
    return (
        <div className="sticky bottom-0 w-full z-50 bg-[#17171f]">
            {pathname !== PAGE_ROUTER.PROFILE && <ControlMusic />}
            <div className="border-t-[2px] border-[#21212a]">
                <div
                    className="flex justify-between px-4 py-3"
                >
                    {
                        defaultNavMenu.map(({ herf, Icon, title }) => (
                            <Link
                                key={herf}
                                to={herf}
                                className="flex flex-col items-center gap-1"
                            >
                                <Icon size={25} className="ease-in-out duration-150 transition" color={herf === pathname ? "#ff3465" : "#ffff"} />
                                <p className={clsx(
                                    "font-semibold text-sm ease-in-out duration-150 transition"
                                    , herf === pathname ? "text-[#ff3465]" : "text-[#ffff]"
                                )}>{title}</p>
                            </Link>
                        ))
                    }
                </div>
            </div>
        </div>
    )
};
