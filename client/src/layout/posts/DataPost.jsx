import React, { useEffect, useState } from 'react';
import IconWrap from '../../components/Icon/IconWrap';
import { CalendarIcon, CommentIcon, HeartIcon } from '../../components/Icon';
import useTimeSince from '../../hooks/useTimeSince';
import { useSelector } from 'react-redux';
import { Popover, PopoverContent, PopoverHandler } from '@material-tailwind/react';
import { Link } from 'react-router-dom';

const DataPost = ({ timestamps = 0, comments = 0, likes = [], className = '' }) => {
    const timeSince = useTimeSince()
    const { infoAuth } = useSelector((state) => state.auth)
    const countLikes = likes?.length || 0
    const { customers } = useSelector((state) => state.customers);
    const [listCus, setListCus] = useState([]);
    const isLiked = likes?.some((id) => id === infoAuth?._id)
    useEffect(() => {
        const extractedInfo = likes?.map(userId => {
            return customers.find(u => u._id === userId);
        });
        setListCus(extractedInfo)
    }, [likes, customers]);
    return (
        <div className={`${className} w-full mt-aut flex-wrap p-3  text-text-gray flex gap-2 lg:gap-5 justify-end 
        text-[12px] lg:text-base`}>
            <IconWrap><CalendarIcon /><p className="text-[11px] lg:text-xs">
                {timeSince(timestamps || Date.now())}</p></IconWrap>
            <IconWrap><CommentIcon /> <p className="text-[11px] lg:text-xs">{comments}</p></IconWrap>
            <Popover
                animate={{
                    mount: { scale: 1, x: 0 },
                    unmount: { scale: 0, x: 0 },
                }}
                placement="top"
            >
                <PopoverHandler>
                    <div className="cursor-pointer ">
                        <IconWrap><HeartIcon isLiked={isLiked} />
                            <p className="text-[11px] lg:text-xs">{countLikes}</p></IconWrap>
                    </div>
                </PopoverHandler>
                <PopoverContent>
                    <div className=' flex flex-col gap-y-3'>
                        {listCus?.map((cus) => {
                            const isAuth = infoAuth?._id === cus?._id
                            if (cus?._id) {
                                return (
                                    <Link to={`/info/${cus?.slug}`}
                                        className={`w-full block min-w-[150px] outline-none 
                                        ${isAuth && 'text-primary'}`}
                                        key={cus?._id + Date.now()}>{isAuth ? 'Bạn' : cus?.full_name}</Link>
                                )
                            }
                        })}
                    </div>
                </PopoverContent>
            </Popover>
        </div>
    );
};

export default DataPost;