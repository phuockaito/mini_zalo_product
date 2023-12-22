import React from 'react';
import { Page } from 'zmp-ui';
import { FaAngleLeft, } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import clsx from 'clsx';


interface WrapperPagePrpos {
    children?: React.ReactNode;
    goBack?: boolean;
    pageTitle?: string;
    onClickGoBack?: any,
    IconClose?: any,
    classNameTitle?: string
}

export const WrapperPage = ({
    children,
    goBack,
    pageTitle,
    onClickGoBack,
    IconClose = FaAngleLeft,
    classNameTitle
}: WrapperPagePrpos) => {
    const navigate = useNavigate();

    return (
        <Page className="bg-[#17171f] relative p-4">
            {
                goBack &&
                <div className={clsx("flex items-center", classNameTitle)}>
                    <div
                        onClick={() => {
                            if (onClickGoBack) {
                                onClickGoBack()
                            } else {
                                navigate(-1)
                            }
                        }}
                    >
                        <IconClose color="#ffff" size={20} />
                    </div>
                    <div
                        className="flex items-center justify-center w-full"
                    >
                        <p
                            className="text-white relative right-2 text-lg">
                            {pageTitle}
                        </p>
                    </div>
                </div>
            }
            {children}
        </Page>
    )
}
