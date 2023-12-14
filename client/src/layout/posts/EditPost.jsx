import React, { useEffect } from 'react';
import ModalBase from '../modal/ModalBase';
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
import * as Yup from "yup";
import { updatePostRequest } from '../../sagas/posts/postsSlice';
import { categoriesRequest } from '../../sagas/categories/categoriesSlice';
import LayoutAdminModel from '../adminLayout/LayoutAdminModel';
import { useNavigate } from "react-router-dom";

const schemaValidate = Yup.object({
    title: Yup.string().required("Vui lòng nhập tiêu đề!"),
    content: Yup.string().required("Vui lòng nhập nội dung!"),
    image: Yup.mixed(),
})

const EditPost = ({ data, show, onClick = () => { } }) => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { handleSubmit, setValue, formState: { errors }, control } =
        useForm({ resolver: yupResolver(schemaValidate), mode: 'onChange', })
    const { categories } = useSelector((state) => state.categories);
    const handleSetURL = (URL) => {
        navigate(`/detail/${URL}`, { replace: true })
    }
    const handleSubmits = (value) => {
        try {
            const post = { ...value }
            dispatch(updatePostRequest({ id: data._id, post, handleSetURL }))
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
            <LayoutAdminModel onClick={onClick} z={992}>
                <Heading isHeading>Chỉnh sửa bài viết </Heading>
                <form onSubmit={handleSubmit(handleSubmits)} className='mb-10 text-center'>
                    <div className='grid grid-cols-1 gap-y-10 pt-10 mb-10'>
                        <Field>
                            <Input control={control} errors={errors} value={data?.title} name='title'
                                placeholder='Nhập tiêu đề bài viết' type='text' >
                                <BookmarkIcon />
                            </Input>
                        </Field>
                        <Field>
                            <Select value={data?.category} data={categories} control={control}
                                name={'category'} />
                        </Field>
                        <div className='mb-10'>
                            <Label htmlFor={"image"}>Hình ảnh</Label>
                            <FileInput oldImage={data?.image}
                                control={control} name={'image'} errors={errors} lable={'Hình ảnh'} />
                        </div>
                        <div className=''>
                            <Field>
                                <Label htmlFor={'content'}>Nội dung</Label>
                                <Textarea value={data?.content} control={control} errors={errors} name={'content'} />
                            </Field>
                        </div>
                    </div>
                    <Button type='submit' className=' mx-auto'>Thêm bài viết</Button>
                </form>
            </LayoutAdminModel>
        </ModalBase>
    );
};

export default EditPost;