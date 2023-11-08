import React, { useEffect, useState } from "react";
import ModalBase from "../../modal/ModalBase";
import LayoutAdminModel from "../LayoutAdminModel";
import {
    IconButton, SpeedDial, SpeedDialAction, SpeedDialContent, SpeedDialHandler, Card, CardBody, CardHeader, CardFooter, Avatar, Typography, Button,
} from "@material-tailwind/react";
import {
    ArchiveBoxXMarkIcon, ArrowUpTrayIcon, ClockIcon, PencilSquareIcon, PlusIcon, NewspaperIcon, HeartIcon
} from "@heroicons/react/24/outline";
import { icon } from "../../../ADMIN/routes";

import { useDispatch, useSelector } from "react-redux";
import useToggle from "../../../hooks/useToggle";
import { updateStatusRequest } from "../../../sagas/admin/adminSlice";
import { WrapInfo } from "../../../pages/InfoUser";
import { EmailIcon, LocationIcon, UserIcon } from "../../../components/Icon";
import { closeDetailCustomer, toggleUpdateCustomer } from "../../../sagas/global/globalSlice";
import SpeedDialAdmin from "../SpeedDialAdmin";

const CustomerDetailAdmin = () => {
    const dispatch = useDispatch();
    const [totalLike, setTotalLike] = useState(0);
    const { showDetailCustomer } = useSelector((state) => state.global)
    const handleEditCustomer = () => {
        dispatch(toggleUpdateCustomer());
    };
    const handleClose = () => {
        dispatch(closeDetailCustomer())
    }
    const { posts, customerDetail } = useSelector((state) => state.admin);

    const dataPostsByCustomer = posts.filter(
        (post) => post.id_customer === customerDetail?._id
    );


    const handleUpdateStatus = (status) => {
        const model = "customer";
        const id = customerDetail?._id;
        dispatch(updateStatusRequest({ id, model, status }));
        handleClose();
    };
    useEffect(() => {
        if (dataPostsByCustomer) {
            let total = 0;
            dataPostsByCustomer.forEach(post => {
                const likePost = post.likes?.length || 0;
                total += likePost;
            });
            setTotalLike(total);
        }
    }, [dataPostsByCustomer]);
    return (
        <>
            <ModalBase onClose={handleClose} visible={showDetailCustomer}>
                <LayoutAdminModel onClick={handleClose}>
                    <div
                        className="relative mt-8 h-72 w-full overflow-hidden rounded-xl bg-cover	bg-center"
                        style={{ backgroundImage: `url(${customerDetail?.image})` }}
                    >
                        <div className="absolute inset-0 h-full w-full bg-gray-500/50" />
                    </div>
                    <Card className="mx-3 -mt-16 mb-6 lg:mx-4">
                        <CardBody className="p-4">
                            <div className="mb-1 flex items-center justify-between gap-6">
                                <div className="flex items-center gap-6">
                                    <Avatar
                                        src={customerDetail?.image}
                                        alt="bruce-mars"
                                        size="xl"
                                        className="rounded-lg shadow-lg shadow-blue-gray-500/40"
                                    />
                                    <div>
                                        <Typography variant="h5" color="blue-gray" className="mb-1">
                                            {customerDetail?.full_name || ''}
                                        </Typography>
                                        <Typography
                                            variant="small"
                                            className="font-normal text-blue-gray-600"
                                        >
                                            {customerDetail?.user_name || ''}
                                        </Typography>
                                    </div>
                                </div>
                            </div>
                            <div className=' flex-auto h-auto bg-white rounded-xl p-5 flex gap-x-10 flex-col md:flex-row
                         gap-y-5 md:gap-y-10'>
                                <div className='text-base md:text-sm flex-1'>
                                    <WrapInfo>
                                        <UserIcon /> <p>{customerDetail?.full_name}</p>
                                    </WrapInfo>
                                    <WrapInfo>
                                        <EmailIcon /> <p className='w-[80%]'>{customerDetail?.email || 'Chưa có'}</p>
                                    </WrapInfo>
                                    <WrapInfo>
                                        <LocationIcon /> <p>{customerDetail?.address || 'Chưa có'}</p>
                                    </WrapInfo>
                                </div>
                                <div className='text-base md:text-sm flex-1'>
                                    <WrapInfo>
                                        <NewspaperIcon {...icon} /><p>{dataPostsByCustomer?.length} bài viết</p>
                                    </WrapInfo>
                                    <WrapInfo>
                                        <HeartIcon {...icon} /> <p className='w-[80%]'>{totalLike} lượt thích</p>
                                    </WrapInfo>
                                </div>
                            </div>
                            <div className="px-4 pb-4">
                                <Typography variant="h6" color="blue-gray" className="mb-2">
                                    Bài viết của người dùng
                                </Typography>
                                <div className="mt-6 grid grid-cols-1 gap-12 md:grid-cols-2 xl:grid-cols-3">
                                    {dataPostsByCustomer?.map(({ image, title, _id, content }) => (
                                        <Card key={_id} color="transparent" shadow={false}>
                                            <CardHeader
                                                floated={false}
                                                color="gray"
                                                className="mx-0 mt-0 mb-4 h-64 xl:h-40"
                                            >
                                                <img
                                                    src={image}
                                                    alt={title}
                                                    className="h-full w-full object-cover"
                                                />
                                            </CardHeader>
                                            <CardBody className="py-0 px-1">
                                                <Typography
                                                    variant="h5"
                                                    color="blue-gray"
                                                    className="mt-1 mb-2 line-clamp-2"
                                                >
                                                    {title}
                                                </Typography>
                                            </CardBody>
                                            <CardFooter className="mt-auto flex items-center justify-between py-0 px-1 ">
                                                <div className="mt-1">
                                                    <Button variant="outlined" size="sm">
                                                        Xem bài viết
                                                    </Button>
                                                </div>
                                            </CardFooter>
                                        </Card>
                                    ))}
                                </div>
                            </div>
                        </CardBody>
                    </Card>
                    <SpeedDialAdmin
                        detail={customerDetail} handleEdit={handleEditCustomer} handleUpdateStatus={handleUpdateStatus} />
                </LayoutAdminModel>
            </ModalBase>
            {/* <PostEditAdmin
    data={data}
    show={toggle}
    onClick={handleToggle}
  ></PostEditAdmin> */}
        </>
    );
};

export default CustomerDetailAdmin;
