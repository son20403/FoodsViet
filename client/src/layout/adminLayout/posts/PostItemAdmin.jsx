import { EyeIcon } from '@heroicons/react/24/outline';
import { Avatar, Chip, Typography } from '@material-tailwind/react';
import React from 'react';
import { useSelector } from 'react-redux';
import { icon } from '../../../ADMIN/routes';
import PostDetailAdmin from './PostDetailAdmin';
import useToggle from '../../../hooks/useToggle';

const PostItemAdmin = ({ data }) => {
    const className = 'py-3 px-5';
    const { categories } = useSelector((state) => state.categories);
    const { customers } = useSelector((state) => state.customers);
    const dataCategory = categories.filter((cate) => cate._id === data?.category)[0]
    const dataCustomer = customers.filter((cus) => cus._id === data?.id_customer)[0]
    const { handleToggle, toggle } = useToggle(false);
    return (
        <>
            <tr className='border-b border-blue-gray-50 last:border-b-0'>
                <td className={`${className} max-w-[500px]`}>
                    <div className="flex items-center gap-4">
                        <Avatar src={data?.image} alt={data?.title} size="lg" />
                        <div className='flex-1'>
                            <Typography className="text-xs font-normal text-blue-gray-500">
                                {dataCategory?.title || ''}
                            </Typography>
                            <Typography
                                variant="small"
                                color="blue-gray"
                                className="font-semibold"
                            >
                                {data?.title}
                            </Typography>
                        </div>
                    </div>
                </td>
                <td className={className}>
                    <Typography className="text-xs font-semibold text-blue-gray-600">
                        {dataCustomer?.full_name || ''}
                    </Typography>
                    <Typography className="text-xs font-normal text-blue-gray-500">
                        {dataCustomer?.user_name || ''}
                    </Typography>
                </td>
                <td className={`${className} text-center`}>
                    <Chip
                        variant="gradient"
                        color={data?.status === 'approved' ? "green" : data?.status === 'pending' ? "yellow" : 'red'}
                        value={data?.status === 'approved' ? "Đã duyệt" : data?.status === 'pending' ? "Chờ duyệt" : 'Đã hủy'}
                        className="py-0.5 px-2 text-[11px] font-medium inline-block"
                    />
                </td>
                <td className={className}>
                    <Typography className="text-xs font-semibold text-blue-gray-600">
                        {data?.date || ''}
                    </Typography>
                </td>
                <td className={`${className} sticky right-0 bg-white shadow-inner md:shadow-none`}>
                    <Typography
                        className="text-xs font-semibold  text-blue-gray-600 cursor-pointer"
                    >
                        <EyeIcon {...icon} onClick={handleToggle}></EyeIcon>
                    </Typography>
                </td>
            </tr>
            <PostDetailAdmin data={data} customers={dataCustomer} categories={dataCategory} show={toggle} onClick={handleToggle}></PostDetailAdmin>
        </>
    );
};

export default PostItemAdmin;