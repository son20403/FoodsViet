import React, { useEffect } from 'react';
import { Heading } from '../components/heading';
import ListCategory from '../layout/categories/ListCategory';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import PageWrap from '../layout/common/PageWrap';
import Section from '../layout/common/Section';
import Banner from '../layout/Banner';
import BannerCommon from '../layout/common/BannerCommon';
import LoadingRequest from '../layout/loading/LoadingRequest';
import { categoriesRequest } from '../sagas/categories/categoriesSlice';

const CategoryPage = () => {
    const { categories, loading } = useSelector((state) => state.categories);
    const { token } = useSelector((state) => state.auth);
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(categoriesRequest())
    }, [token]);
    return (
        <>
            <LoadingRequest show={loading}></LoadingRequest>
            <Section className='mb-10'>
                <BannerCommon image={'./src/assets/image/banner-category.jpg'} title={'Danh mục bài viết'} />
            </Section>
            <div className='page-content min-h-screen'>
                <div className='mb-10'>
                    <ListCategory data={categories}></ListCategory>
                </div>
            </div>
        </>
    );
};

export default CategoryPage;