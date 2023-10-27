import React from 'react';
import IconWrap from '../../components/Icon/IconWrap';
import { CalendarIcon, CommentIcon, HeartIcon } from '../../components/Icon';
import useTimeSince from '../../hooks/useTimeSince';
import { useSelector } from 'react-redux';

const DataPost = ({ timestamps = 0, comments = 0, likes = [], className = '' }) => {
    const timeSince = useTimeSince()
    const { infoAuth } = useSelector((state) => state.auth)
    const countLikes = likes?.length || 0
    const isLiked = likes?.some((id) => id === infoAuth?._id)
    return (
        <div className={`${className} w-full mt-aut flex-wrap p-3  text-text-gray flex gap-2 lg:gap-5 justify-end 
        text-[12px] lg:text-base`}>
            <IconWrap><CalendarIcon /><p className="text-[11px] lg:text-xs">
                {timeSince(timestamps || Date.now())}</p></IconWrap>
            <IconWrap><CommentIcon /> <p className="text-[11px] lg:text-xs">{comments}</p></IconWrap>
            <IconWrap><HeartIcon isLiked={isLiked} /> <p className="text-[11px] lg:text-xs">{countLikes}</p></IconWrap>
        </div>
    );
};

export default DataPost;