import { EyeIcon } from '@heroicons/react/24/outline';
import { Avatar, Chip, Typography } from '@material-tailwind/react';
import React from 'react';
import { icon } from '../../../ADMIN/routes';
import useTimeSince from '../../../hooks/useTimeSince';
import { useDispatch, useSelector } from 'react-redux';
import { detailAdminSuccess } from '../../../sagas/admin/adminSlice';
import { toggleDetailAdmin } from '../../../sagas/global/globalSlice';
import { toast } from 'react-toastify';

const ItemAdmin = ({ data }) => {
    const className = 'py-3 px-5';
    const timeSince = useTimeSince()
    const dispatch = useDispatch()
    const { role, infoAdmin } = useSelector((state) => state.admin);
    const typeAdmin = role?.find(r => r._id === infoAdmin?.role)

    const typeRole = role.find((r) => r._id === data?.role)
    const handleShowCustomerDetail = () => {
        if (typeAdmin?.title === 'Admin') {
            dispatch(detailAdminSuccess({ ...data }))
            dispatch(toggleDetailAdmin())
        } else {
            toast.error('Bạn không có quyền truy cập vào chức năng này')
        }
    }
    return (
        <>
            <tr className='border-b border-blue-gray-50 last:border-b-0'>
                <td className={`${className} max-w-[500px]`}>
                    <div className="flex items-center gap-4">
                        <Avatar src={data?.image} alt={data?.full_name} size="lg" />
                        <div className='flex-1'>
                            <Typography className="text-xs font-normal text-blue-gray-500">
                                {data?.user_name || ''}
                            </Typography>
                            <Typography
                                variant="small"
                                color="blue-gray"
                                className="font-semibold"
                            >
                                {data?.full_name || ''}
                            </Typography>
                        </div>
                    </div>
                </td>
                <td className={className}>
                    <Typography className={`text-xs font-semibold text-blue-600 
                    ${typeRole?.title === 'Admin' ? 'text-primary' : 'Nhân viên'}`}>
                        {typeRole?.title === 'Admin' ? 'Quản Trị viên' : 'Nhân viên' || ''}
                    </Typography>
                </td>
                <td className={className}>
                    <Typography className="text-xs font-semibold text-blue-gray-600">
                        {data?.email || ''}
                    </Typography>
                    <Typography className="text-xs font-normal text-blue-gray-500">
                        {data?.address || '(chưa có)'}
                    </Typography>
                </td>
                <td className={`${className} `}>
                    <Chip
                        variant="gradient"
                        color={data?.status === 'approved' ? "green" : data?.status === 'pending' ? "yellow" : 'red'}
                        value={data?.status === 'approved' ? "Đã duyệt" : data?.status === 'pending' ? "Chờ duyệt" : 'vô hiệu hóa'}
                        className="py-0.5 px-2 text-[11px] font-medium inline-block"
                    />
                </td>
                <td className={className}>
                    <Typography className="text-xs font-semibold text-blue-gray-600 flex flex-col">
                        <span>{data?.date || ''}</span>
                        <span className='font-normal text-gray-500'>({timeSince(data?.timestamps || Date.now())})</span>
                    </Typography>
                </td>
                <td className={`${className} `}>
                    <ChipOnline status={data?.online} ></ChipOnline>
                </td>
                <td className={`${className} sticky right-0 bg-white shadow-inner md:shadow-none`}>
                    <Typography
                        className="text-xs font-semibold  text-blue-gray-600 cursor-pointer"
                    >
                        <EyeIcon {...icon} onClick={handleShowCustomerDetail}></EyeIcon>
                    </Typography>
                </td>
            </tr>
        </>
    );
};
const ChipOnline = ({ status = false }) => {
    return (
        <Chip
            className='inline-block'
            variant="ghost"
            color={status ? "green" : "red"}
            size="sm"
            value={status ? "Online" : "Offline"}
            icon={
                <span className={`mx-auto mt-1 block h-2 w-2 rounded-full content-[''] 
                ${status ? 'bg-green-900' : 'bg-red-900'}`} />
            }
        />
    )
}

export default ItemAdmin;