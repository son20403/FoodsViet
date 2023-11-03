import React, { useEffect } from 'react';
import {
    Card,
    CardHeader,
    CardBody,
    Typography,
} from "@material-tailwind/react";
import PostItemAdmin from '../../layout/adminLayout/posts/PostItemAdmin';
import { useDispatch, useSelector } from 'react-redux';
import { categoriesRequest } from '../../sagas/categories/categoriesSlice';
import { customersRequest } from '../../sagas/customers/customersSlice';
import LoadingRequest from '../../layout/loading/LoadingRequest';
import { getAllAdminRequest, getPostsAdminRequest } from '../../sagas/admin/adminSlice';
import { ArrowPathIcon } from '@heroicons/react/24/outline';
import { icon } from '../../ADMIN/routes';

const PostPageAdmin = () => {
    const { posts, loading } = useSelector((state) => state.admin)
    const dispatch = useDispatch()

    const { tokenAdmin } = useSelector((state) => state.admin);
    const tokenLocal = localStorage.getItem('adminToken')
    useEffect(() => {
        dispatch(getPostsAdminRequest())
        dispatch(categoriesRequest())
        dispatch(customersRequest())
        dispatch(getAllAdminRequest())
    }, [tokenAdmin, dispatch, tokenLocal]);
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
        </div>
    );
};

export default PostPageAdmin;

const authorsTableData = [
    {
        img: "../src/assets/image/user.png",
        name: "John Michael",
        email: "john@creative-tim.com",
        job: ["Manager", "Organization"],
        online: true,
        date: "23/04/18",
    },
    {
        img: "../src/assets/image/user.png",
        name: "Alexa Liras",
        email: "alexa@creative-tim.com",
        job: ["Programator", "Developer"],
        online: false,
        date: "11/01/19",
    },
    {
        img: "../src/assets/image/user.png",
        name: "Laurent Perrier",
        email: "laurent@creative-tim.com",
        job: ["Executive", "Projects"],
        online: true,
        date: "19/09/17",
    },
    {
        img: "../src/assets/image/user.png",
        name: "Michael Levi",
        email: "michael@creative-tim.com",
        job: ["Programator", "Developer"],
        online: true,
        date: "24/12/08",
    },
    {
        img: "../src/assets/image/user.png",
        name: "Bruce Mars",
        email: "bruce@creative-tim.com",
        job: ["Manager", "Executive"],
        online: false,
        date: "04/10/21",
    },
    {
        img: "../src/assets/image/user.png",
        name: "Alexander",
        email: "alexander@creative-tim.com",
        job: ["Programator", "Developer"],
        online: false,
        date: "14/09/20",
    },
    {
        img: "../src/assets/image/user.png",
        name: "John Michael",
        email: "john@creative-tim.com",
        job: ["Manager", "Organization"],
        online: true,
        date: "23/04/18",
    },
    {
        img: "../src/assets/image/user.png",
        name: "Alexa Liras",
        email: "alexa@creative-tim.com",
        job: ["Programator", "Developer"],
        online: false,
        date: "11/01/19",
    },
    {
        img: "../src/assets/image/user.png",
        name: "Laurent Perrier",
        email: "laurent@creative-tim.com",
        job: ["Executive", "Projects"],
        online: true,
        date: "19/09/17",
    },
    {
        img: "../src/assets/image/user.png",
        name: "Michael Levi",
        email: "michael@creative-tim.com",
        job: ["Programator", "Developer"],
        online: true,
        date: "24/12/08",
    },
    {
        img: "../src/assets/image/user.png",
        name: "Bruce Mars",
        email: "bruce@creative-tim.com",
        job: ["Manager", "Executive"],
        online: false,
        date: "04/10/21",
    },
    {
        img: "../src/assets/image/user.png",
        name: "Alexander",
        email: "alexander@creative-tim.com",
        job: ["Programator", "Developer"],
        online: false,
        date: "14/09/20",
    },
];
