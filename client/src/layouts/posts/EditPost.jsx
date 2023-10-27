import React, { useEffect } from 'react';
import ModalBase from '../modal/ModalBase';
import PageWrap from '../common/PageWrap';
import { Heading } from '../../components/heading';
import { Field } from '../../components/field';
import { BookmarkIcon } from '../../components/Icon';
import { Label } from '../../components/label';
import { Textarea } from '../../components/textarea';
import { FileInput, Input } from '../../components/input';
import { Select } from '../../components/select';
import { Button } from '../../components/button';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { setLoadingCustomer, updateCustomerRequest } from '../../sagas/customers/customersSlice';
import { setNotifyGlobal } from '../../sagas/global/globalSlice';
import * as Yup from "yup";
import { getDate } from '../../hooks/useGetTime';
import { createPostsRequest, updatePostRequest } from '../../sagas/posts/postsSlice';
import { categoriesRequest } from '../../sagas/categories/categoriesSlice';

const schemaValidate = Yup.object({
    title: Yup.string().required("Vui lòng nhập tiêu đề!"),
    content: Yup.string().required("Vui lòng nhập nội dung!"),
    image: Yup.mixed(),
})

const EditPost = ({ data, show, onClick = () => { } }) => {
    const dispatch = useDispatch()
    const { handleSubmit, setValue, formState: { errors }, control } =
        useForm({ resolver: yupResolver(schemaValidate), mode: 'onBlur', })
    const { categories } = useSelector((state) => state.categories)
    const handleSubmits = (value) => {
        try {
            const post = { ...value }
            dispatch(updatePostRequest({ id: data._id, post, slug: data.slug }))
            dispatch(setNotifyGlobal(''));
            onClick()
            resetImageField()
        } catch (error) {
            console.error('Có lỗi xảy ra:', error);
        }
    }

    const resetImageField = () => {
        setValue('image', '');
    };
    useEffect(() => {
        dispatch(categoriesRequest())
    }, []);
    return (
        <ModalBase onClose={onClick} visible={show}>
            <div className='absolute top-10  left-1/2 -translate-x-1/2   page-content mt-5'>
                <div className='content transition-all  w-full z-[8] p-10 bg-white  rounded-lg'>
                    <Heading isHeading>Chỉnh sửa bài viết </Heading>
                    <form onSubmit={handleSubmit(handleSubmits)} className='mb-10 text-center'>
                        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-10 pt-10 mb-10'>
                            <Field>
                                <Input control={control} errors={errors} value={data?.title} name='title'
                                    placeholder='Nhập tiêu đề bài viết' type='text' >
                                    <BookmarkIcon />
                                </Input>
                            </Field>
                            <Field>
                                <Select value={data?.category} data={categories} control={control} name={'category'} />
                            </Field>
                            <div className=' col-span-1 md:col-span-2 mb-10'>
                                <Label htmlFor={"image"}>Hình ảnh</Label>
                                <FileInput oldImage={data?.image}
                                    control={control} name={'image'} errors={errors} lable={'Hình ảnh'} />
                            </div>
                            <div className=' col-span-1 md:col-span-2'>
                                <Field>
                                    <Label htmlFor={'content'}>Nội dung</Label>
                                    <Textarea value={data?.content} control={control} errors={errors} name={'content'} />
                                </Field>
                            </div>
                        </div>
                        <Button type='submit' className=' mx-auto'>Thêm bài viết</Button>
                    </form>
                </div>
            </div>
        </ModalBase>
    );
};

export default EditPost;