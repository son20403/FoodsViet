import React, { useEffect } from 'react';
import ListPost from '../layout/posts/ListPost';
import { useDispatch, useSelector } from 'react-redux';
import BannerCommon from '../layout/common/BannerCommon';
import _ from 'lodash';
import { useParams } from 'react-router-dom';
import LoadingRequest from '../layout/loading/LoadingRequest';
import { categoriesRequest } from '../sagas/categories/categoriesSlice';
import useSetTitle from '../hooks/useSetTitle';


const ListPostsByCategory = () => {
    const dispatch = useDispatch()
    const { slug } = useParams()
    const { posts, loading } = useSelector((state) => state.posts)
    const { categories } = useSelector((state) => state.categories)
    const dataCategory = categories?.filter((cate) => cate?.slug === slug)[0];
    useSetTitle(dataCategory?.title || 'Danh sách bài viết theo loại')
    const listPosts = posts?.filter((post) => post?.category === dataCategory?._id)
    useEffect(() => {
        dispatch(categoriesRequest())
    }, []);
    return (
        <>
            <LoadingRequest show={loading}></LoadingRequest>
            <BannerCommon image={'../src/assets/image/banner-post.jpg'} title='Danh Sách Bài Viết' />
            <div className='page-content'>
                <div className='my-10'>
                    <ListPost message={'Không có dữ liệu!'} data={listPosts}></ListPost>
                </div>
            </div>
        </>
    );
};

export default ListPostsByCategory;