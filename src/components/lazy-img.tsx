import clsx from 'clsx';
import React from 'react'
import { LazyLoadImage } from 'react-lazy-load-image-component';

interface LazyImgType {
    alt: string;
    src: string;
    className?: string;
}

export const LazyImg = ({ alt, src, className = "object-cover rounded-md" }: LazyImgType) => {
    return (
        <LazyLoadImage
            alt={alt}
            effect="blur"
            src={src}
            className={clsx("w-full h-full", className)}
        />
    )
}
