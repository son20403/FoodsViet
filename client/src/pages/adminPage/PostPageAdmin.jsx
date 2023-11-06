import React from 'react';
import {
    Card,
    CardHeader,
    CardBody,
    Typography,
} from "@material-tailwind/react";
import PostItemAdmin from '../../layout/adminLayout/posts/PostItemAdmin';
import { useDispatch, useSelector } from 'react-redux';
import LoadingRequest from '../../layout/loading/LoadingRequest';
import { getPostsAdminRequest } from '../../sagas/admin/adminSlice';
import { ArrowPathIcon } from '@heroicons/react/24/outline';
import { icon } from '../../ADMIN/routes';
import PostDetailAdmin from '../../layout/adminLayout/posts/PostDetailAdmin';
import { toggleDetaiPost } from '../../sagas/global/globalSlice';
import PostEditAdmin from '../../layout/adminLayout/posts/PostEditAdmin';

const PostPageAdmin = () => {
    const { posts, loading } = useSelector((state) => state.admin)
    const dispatch = useDispatch()
    const handLoad = () => {
        dispatch(getPostsAdminRequest())
    }
    return (
        <div>
            <LoadingRequest show={loading}></LoadingRequest>
            <div className="mt-12 mb-8 flex flex-col gap-12 relative">
                <Card>
                    <CardHeader variant="gradient"
                        className='z-10 mb-8 p-6  bg-primary flex items-center justify-between' >
                        <Typography variant="h6" color="white">
                            Danh sách bài viết
                        </Typography>
                        <span onClick={handLoad} className='text-white cursor-pointer'><ArrowPathIcon {...icon} /></span>
                    </CardHeader>
                    <CardBody className="overflow-x-scroll px-0 pt-0 pb-2 mt-0">
                        <table className="w-full min-w-[840px] table-auto">
                            <thead>
                                <tr>
                                    {["Bài viết", "tác giả", "tình trạng", "thời gian", ""].map((el, index) => (
                                        <th
                                            key={index}
                                            className="border-b border-blue-gray-50 py-3 px-5 text-left
                                            last:sticky last:right-0 bg-white last:shadow-inner last:md:shadow-none
                                            "
                                        >
                                            <Typography
                                                variant="small"
                                                className="text-[11px] font-bold uppercase text-blue-gray-400"
                                            >
                                                {el}
                                            </Typography>
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {posts && posts?.length > 0 && posts?.map(
                                    (data, key) => (
                                        <PostItemAdmin key={data?._id} data={data} />)
                                )}
                            </tbody>
                        </table>
                    </CardBody>
                </Card>
            </div>
            <PostDetailAdmin></PostDetailAdmin>
            <PostEditAdmin></PostEditAdmin>
        </div>
    );
};

export default PostPageAdmin;

