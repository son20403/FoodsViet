import React from 'react';

import { Link } from 'react-router-dom';
import Overlay from './common/Overlay';
import { useDispatch, useSelector } from 'react-redux';
import { closeNotification } from '../sagas/global/globalSlice';
import { Avatar, Badge } from '@material-tailwind/react';
import { ChatBubbleLeftRightIcon, ChatBubbleOvalLeftEllipsisIcon, HeartIcon } from '@heroicons/react/24/solid';

const Notification = () => {
    const { showNotification } = useSelector((state) => state.global)
    const { notifications } = useSelector((state) => state.notification)
    const dispatch = useDispatch()
    const handleClose = () => {
        dispatch(closeNotification())
    }
    return (
        <>
            <Overlay show={showNotification} onClick={handleClose}></Overlay>
            <div className={`flex-1 absolute text-black bg-white-cream flex top-full w-full   gap-2  p-5
            transition-all overflow-hidden
                flex-col  text-sm z-[10] right-0 shadow-soft border-t border-primary 
                md:max-w-[500px] max-h-[500px] overflow-y-auto  overscroll-none
                ${showNotification ? 'top-full' : 'invisible opacity-0'}`}>
                {
                    notifications?.length > 0 ? notifications.map((notify) => (
                        <ItemNotifiction key={notify?._id} notify={notify}></ItemNotifiction>
                    )) : <div className='text-center'>Không có thông báo nào</div>

                }
            </div>
        </>
    );
};
const ItemNotifiction = ({ notify }) => {
    const { customers } = useSelector((state) => state.customers)
    const { posts } = useSelector((state) => state.posts)
    const infoCusSend = customers?.filter((cus) => cus._id === notify?.id_sender)[0]
    const infoPost = posts?.filter((post) => post._id === notify?.id_post)[0]
    const className = 'h-5 w-5 text-white'
    return (
        <Link
            to={`/detail/${infoPost?.slug}#${notify?.id_comment}`}
            className={`px-5 py-3 rounded-lg flex gap-x-5 items-center transition-all
        ${notify?.status ? 'bg-blue-200/30' : ''}
        `}>
            <div>
                <Badge
                    content={notify?.typeNotify === 'comment' ?
                        <ChatBubbleOvalLeftEllipsisIcon className={className} />
                        : notify?.typeNotify === 'reply' ? <ChatBubbleLeftRightIcon className={className} /> :
                            <HeartIcon className={className} />}
                    className={`${notify?.typeNotify === 'comment'
                        ? 'bg-green-400 '
                        : notify?.typeNotify === 'reply'
                            ? 'bg-blue-400'
                            : 'bg-red-400'} border-2 
                    border-white shadow-lg shadow-black/20`}
                    placement="bottom-end"
                >
                    <Avatar size='lg' className='border shadow-2xl' src={infoCusSend?.image}></Avatar>
                </Badge>
            </div>
            <div className='flex-1'>
                <span className='font-bold'>{infoCusSend?.full_name} </span>
                {notify?.typeNotify === 'comment' ? (
                    <span>đã bình luận bài viết của bạn</span>
                ) : notify?.typeNotify === 'reply'
                    ? <span>đã trả lời bình luận của bạn trong bài viết
                        <span className='font-bold text-primary'> {infoPost?.title}</span></span>
                    : <span>đã thích bài viết <span className='font-bold text-primary'>{infoPost?.title}</span></span>}
            </div>

        </Link>
    )
}

export default Notification;