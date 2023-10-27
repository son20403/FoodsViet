import React, { useEffect, useState } from 'react';
import { Button } from '../components/button';
import { CommentIcon, EmailIcon, LocationIcon, UserIcon } from '../components/Icon';

import ListPost from '../layout/posts/ListPost';

import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import useToggle from '../hooks/useToggle';
import { customersRequest } from '../sagas/customers/customersSlice';
import EditCustomer from '../layout/customers/EditCustomer';
import LoadingRequest from '../layout/loading/LoadingRequest';
import BannerCommon from '../layout/common/BannerCommon';
import { postsRequest } from '../sagas/posts/postsSlice';

const InfoUser = () => {
    const { slug } = useParams()
    const dispatch = useDispatch()
    const { customers, loading } = useSelector((state) => state.customers);
    const { token } = useSelector((state) => state.auth);
    const { handleToggle, toggle } = useToggle(false)
    const { posts, loading: loadingPost } = useSelector((state) => state.posts);
    const { infoAuth } = useSelector((state) => state.auth);
    const dataCustomer = customers.filter((cus) => cus.slug === slug)[0]
    const dataPostsByCustomer = posts.filter((post) => post.id_customer === dataCustomer?._id) || [1]
    const isAuth = dataCustomer?._id === infoAuth?._id
    useEffect(() => {
        dispatch(customersRequest())
        dispatch(postsRequest())
    }, []);

    return (
        <div className='bg-gray-50 relative'>
            <LoadingRequest show={loading}></LoadingRequest>
            <LoadingRequest show={loadingPost}></LoadingRequest>
            <div className='w-full h-auto flex flex-col gap-5 '>
                <BannerCommon className='py-16 bg-bottom' image={'../src/assets/image/banner-user.jpg'} />
                <div className='page-content relative h-[240px] md:h-[120px] lg:h-[150px] flex justify-between bg-white
                    rounded-xl flex-col items-center'>
                    <div className=' flex flex-col items-center md:flex-row w-full absolute bottom-0 left-1/2 
                    -translate-x-1/2 md:left-0 md:translate-x-0  md:items-stretch p-5 lg:p-10 gap-5'>
                        <div className='w-32 h-32 md:w-40 md:h-40 lg:w-52 lg:h-52 rounded-full overflow-hidden'>
                            <img src={dataCustomer?.image} className='w-full h-full object-cover '
                                alt="" />
                        </div>
                        <div className='flex-1 gap-y-5 mt-auto flex flex-col items-center md:flex-row 
                            md:items-stretch justify-between'>
                            <div className='text-center md:text-start'>
                                <h1 className='text-xl md:text-2xl font-medium font-quicksand uppercase'
                                >{dataCustomer?.full_name}</h1>
                                <span>@{dataCustomer?.user_name}</span>
                            </div>
                            <div className=' flex gap-x-5 items-center'>
                                {!isAuth &&
                                    <div className='p-2 bg-primary text-white text-2xl flex items-center justify-center
                                border-2 border-primary rounded-md'>
                                        <CommentIcon></CommentIcon>
                                    </div>
                                }
                                {/* <Button>Follow</Button> */}
                                {isAuth && <Button onClick={handleToggle} className='bg-transparent 
                                !text-primary font-medium border-primary'>
                                    Chỉnh sửa thông tin</Button>}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='my-5 page-content'>
                <div className='flex flex-col md:flex-row gap-5'>
                    <div className='md:w-1/3 w-full'>
                        <div className=' flex-auto h-auto bg-white rounded-xl p-5 flex
                        flex-col gap-y-5 md:gap-y-10'>
                            <h1 className='font-bold text-xl text-primary text-center md:text-start'>Thông tin cá nhân</h1>
                            <div className='text-base md:text-sm '>
                                <WrapInfo>
                                    <UserIcon /> <p>{dataCustomer?.full_name}</p>
                                </WrapInfo>
                                <WrapInfo>
                                    <EmailIcon /> <p className='w-[80%]'>{dataCustomer?.email || 'Chưa có'}</p>
                                </WrapInfo>
                                <WrapInfo>
                                    <LocationIcon /> <p>{dataCustomer?.address || 'Chưa có'}</p>
                                </WrapInfo>
                            </div>
                        </div>
                    </div>
                    <div className='flex-1 bg-white rounded-xl pt-5 md:p-5 flex flex-col gap-y-10'>
                        <h1 className='font-bold text-xl text-primary text-center md:text-start'>Danh sách bài viết</h1>
                        <ListPost data={dataPostsByCustomer} message={'Chưa có bài viết nào!'} className='!grid-cols-1 md:!grid-cols-1 lg:!grid-cols-2'>
                        </ListPost>
                    </div>
                </div>
            </div>
            <EditCustomer data={dataCustomer} show={toggle} onClick={handleToggle} ></EditCustomer>
        </div>
    );
};

export default InfoUser;

const WrapInfo = ({ children }) => {
    return (
        <div className='flex items-center gap-x-4 py-4 border-b last:border-0 break-words w-full'>
            {children}
        </div>
    )
}
