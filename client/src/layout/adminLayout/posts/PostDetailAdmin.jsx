import React, { useEffect } from "react";
import ModalBase from "../../modal/ModalBase";
import {
  Typography,
  Card,
  CardBody,
  Avatar,
} from "@material-tailwind/react";
import {
  AtSymbolIcon,
  ChatBubbleLeftRightIcon,
  HeartIcon,
  Squares2X2Icon,
  TagIcon,
  UserCircleIcon,
} from "@heroicons/react/24/outline";
import { icon } from "../../../ADMIN/routes";
import LayoutAdminModel from "../LayoutAdminModel";
import { useDispatch, useSelector } from "react-redux";
import { updateStatusRequest } from "../../../sagas/admin/adminSlice";
import { WrapInfo } from "../../../pages/InfoUser";
import { closeDetailPost, toggleUpdatePost } from "../../../sagas/global/globalSlice";
import SpeedDialAdmin from "../SpeedDialAdmin";
import { getcommentsByPostRequest } from "../../../sagas/comments/commentsSlice";

const PostDetailAdmin = () => {
  const dispatch = useDispatch();
  const { postDetail, customerDetail, categoryDetail } = useSelector((state) => state.admin)
  const { showDetailPost, socketAdmin } = useSelector((state) => state.global)
  const id_post = postDetail?._id
  const { commentsPost } = useSelector((state) => state.comments);
  const totalComment = commentsPost?.length || 0
  const handleEditPost = () => {
    dispatch(toggleUpdatePost());
  };
  const handleClose = () => {
    dispatch(closeDetailPost())
  }
  const handleSendNotification = (id_receiver) => {
    if (socketAdmin)
      socketAdmin.emit('receiverNotify', { id_receiver });
  }
  const handleUpdateStatus = (status) => {
    const model = "post";
    const id = postDetail?._id;
    dispatch(updateStatusRequest({ id, model, status, handleSendNotification }));
    handleClose()
  };
  useEffect(() => {
    dispatch(getcommentsByPostRequest({ id_post }))
  }, [id_post]);
  return (
    <>
      <ModalBase onClose={handleClose} visible={showDetailPost}>
        <LayoutAdminModel onClick={handleClose}>
          <div
            className="relative mt-8 h-72 w-full overflow-hidden rounded-xl bg-cover	bg-center"
            style={{ backgroundImage: `url(${postDetail?.image})` }}
          >
            <div className="absolute inset-0 h-full w-full bg-black/30" >
            </div>
          </div>
          <Card className="mx-3 -mt-16 mb-6 lg:mx-4">
            <CardBody className="p-4">
              <div className="mb-1 flex items-center justify-between gap-6">
                <div className="flex items-center gap-6">
                  <Avatar
                    src={postDetail?.image}
                    alt="bruce-mars"
                    size="xl"
                    className="rounded-lg shadow-lg shadow-blue-gray-500/40"
                  />
                  <div>
                    <Typography variant="h5" color="blue-gray" className="mb-1">
                      {postDetail?.title || ''}
                    </Typography>
                    <Typography
                      variant="small"
                      className="font-normal text-blue-gray-600"
                    >
                      {categoryDetail?.title || ''}
                    </Typography>
                  </div>
                </div>
              </div>
              <div className=' flex-auto h-auto bg-white rounded-xl p-5 flex gap-x-10 flex-col md:flex-row
                         md:gap-y-10'>
                <div className='text-xs md:text-sm flex-1'>
                  <WrapInfo>
                    <UserCircleIcon {...icon} /> <p>{customerDetail?.full_name} </p>
                  </WrapInfo>
                  <WrapInfo>
                    <AtSymbolIcon {...icon} /> <p>{customerDetail?.user_name}</p>
                  </WrapInfo>
                  <WrapInfo>
                    <TagIcon {...icon} />  <p>{customerDetail?.admin ? 'Quản trị viên' : 'Người dùng'}</p>
                  </WrapInfo>
                </div>
                <div className='text-xs md:text-sm flex-1'>
                  <WrapInfo>
                    <Squares2X2Icon {...icon} /> <p>{categoryDetail?.title}</p>
                  </WrapInfo>
                  <WrapInfo>
                    <HeartIcon {...icon} /> <p>{postDetail?.likes?.length} lượt thích</p>
                  </WrapInfo>
                  <WrapInfo>
                    <ChatBubbleLeftRightIcon  {...icon} /> <p>{totalComment} bình luận</p>
                  </WrapInfo>
                </div>
              </div>
              <img src={postDetail?.image} alt="" className="rounded-xl my-10 w-full" />

              <div className="px-4 pb-4">
                <div className="text-xs leading-6 md:text-sm lg:text-base">
                  <div
                    dangerouslySetInnerHTML={{ __html: postDetail?.content }}
                    className="content_post !text-xs md"
                  />
                </div>

              </div>
            </CardBody>
          </Card>
          <SpeedDialAdmin
            detail={postDetail} handleEdit={handleEditPost} handleUpdateStatus={handleUpdateStatus}
            idEntity={postDetail?.id_customer} />
        </LayoutAdminModel>
      </ModalBase>
    </>
  );
};
export default PostDetailAdmin;
