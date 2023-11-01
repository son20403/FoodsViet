import React from 'react';
import ModalBase from '../../modal/ModalBase';
import { Heading } from '../../../components/heading';
import {
    IconButton,
    SpeedDial,
    SpeedDialHandler,
    SpeedDialContent,
    SpeedDialAction,
} from "@material-tailwind/react";
import { ArchiveBoxXMarkIcon, ArrowUpTrayIcon, ClockIcon, PencilSquareIcon, PlusIcon } from '@heroicons/react/24/outline';
import { icon } from '../../../ADMIN/routes';
import PostEditAdmin from './PostEditAdmin';
import useToggle from '../../../hooks/useToggle';
import LayoutEditAdmin from './LayoutEditAdmin';
import { useDispatch } from 'react-redux';
import { updateStatusRequest } from '../../../sagas/admin/adminSlice';

const PostDetailAdmin = ({ onClick, show, data, customers, categories }) => {
    const dispatch = useDispatch()
    const { handleToggle, toggle } = useToggle(false)
    const handleEditPost = () => {
        handleToggle()
    }
    const handleUpdateStatus = (status) => {
        const model = 'post'
        const id = data?._id
        dispatch(updateStatusRequest({ id, model, status }))
        onClick()
    }
    return (
        <>
            <ModalBase onClose={onClick} visible={show} >
                <LayoutEditAdmin onClick={onClick}>
                    <div className='w-full  py-32
                        lg:py-44  bg-cover bg-center h-auto overflow-hidden relative   md:min-h-[300px] rounded-sm'
                        style={{ backgroundImage: `url(${data?.image})` }}>
                        <div className='absolute inset-0 bg-black bg-opacity-60'>
                            <div className='page-content px-5 mt-3 lg:px-10 flex flex-col h-full text-white flex-1
                                justify-center items-center' >
                                <Heading isHeading className=' text-xl md:text-2xl font-normal text-center
                                lg:leading-normal leading-normal'>
                                    {data?.title}
                                </Heading>
                                <div className='text-white text-xs md:text-sm lg:text-sm uppercase opacity-80  mt-10 flex '>
                                    <div
                                        className='px-2 border-r last:border-none'>{customers?.full_name}</div>
                                    <div className='px-2 border-r last:border-none'>{data?.date} </div>
                                    <div
                                        className='px-2 border-r last:border-none'>{categories?.title}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className=' w-full  p-1 md:p-5  '>
                        <div className=' bg-white md:p-5 p-1 rounded-sm'>
                            <div className='mb-10 w-full max-w-[800px] m-auto'>
                                <img src={data?.image} alt="" className='w-full max-h-[400px] object-cover
                                    rounded-sm' />
                            </div>
                            <div className='text-xs leading-6 md:text-sm lg:text-base'>
                                <div dangerouslySetInnerHTML={{ __html: data?.content }}
                                    className='content_post !text-xs md' />
                            </div>
                        </div>
                    </div>
                    <div className='py-5 w-full flex items-center justify-end pr-5 sticky bottom-0'>
                        <div className='flex gap-5 items-center'>
                            {/* <div className='pr-5 border-r-2 border-primary'>
                                <Button size='sm' className='bg-primary' onClick={handleEditPost}>
                                    <PencilSquareIcon {...icon} /></Button>
                            </div>
                            <Button size='sm' color='green'><ArrowUpTrayIcon {...icon} /></Button>
                            <Button size='sm' color='yellow'><ClockIcon {...icon} /></Button>
                            <Button size='sm' color='red'><ArchiveBoxXMarkIcon {...icon} /></Button> */}
                            <SpeedDial>
                                <SpeedDialHandler>
                                    <IconButton size="lg" className="rounded-full border-white border">
                                        <PlusIcon className="h-5 w-5 transition-transform group-hover:rotate-45" />
                                    </IconButton>
                                </SpeedDialHandler>
                                <SpeedDialContent className="rounded-full border  border-blue-gray-50 bg-white 
                                shadow-xl shadow-black/10">
                                    <SpeedDialAction onClick={() => handleUpdateStatus('destroy')}
                                        className={`bg-red-500 text-white ${data?.status === 'destroy' ? "hidden" : ""}`}>
                                        <ArchiveBoxXMarkIcon {...icon} />
                                    </SpeedDialAction>
                                    <SpeedDialAction onClick={() => handleUpdateStatus('pending')}
                                        className={`bg-yellow-500 text-black ${data?.status === 'pending' ? "hidden" : ""}`}>
                                        <ClockIcon {...icon} />
                                    </SpeedDialAction>
                                    <SpeedDialAction onClick={() => handleUpdateStatus('approved')}
                                        className={`bg-green-500 text-white ${data?.status === 'approved' ? "hidden" : ""}`} >
                                        <ArrowUpTrayIcon {...icon} />
                                    </SpeedDialAction>
                                    <SpeedDialAction className='bg-primary text-white' onClick={handleEditPost}>
                                        <PencilSquareIcon {...icon} />
                                    </SpeedDialAction>
                                </SpeedDialContent>
                            </SpeedDial>
                        </div>
                    </div>
                </LayoutEditAdmin>
            </ModalBase>
            <PostEditAdmin data={data} show={toggle} onClick={handleToggle}></PostEditAdmin>
        </>
    );
};
export default PostDetailAdmin;