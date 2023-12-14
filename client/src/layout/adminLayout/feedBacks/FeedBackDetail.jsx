import React, { useEffect, useState } from "react";
import ModalBase from "../../modal/ModalBase";
import LayoutAdminModel from "../LayoutAdminModel";
import {
  IconButton,
  SpeedDial,
  SpeedDialAction,
  SpeedDialContent,
  SpeedDialHandler,
  Card,
  CardBody,
  CardHeader,
  CardFooter,
  Avatar,
  Typography,
} from "@material-tailwind/react";
import {
  ArchiveBoxXMarkIcon,
  ArrowUpTrayIcon,
  ClockIcon,
  PencilSquareIcon,
  PlusIcon,
  NewspaperIcon,
  HeartIcon,
} from "@heroicons/react/24/outline";
import { icon } from "../../../ADMIN/routes";

import { useDispatch, useSelector } from "react-redux";
import useToggle from "../../../hooks/useToggle";
import { updateStatusRequest } from "../../../sagas/admin/adminSlice";
import { WrapInfo } from "../../../pages/InfoUser";
import { EmailIcon, LocationIcon, UserIcon } from "../../../components/Icon";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import {
  closeFeedback,
  toggleUpdateCustomer,
} from "../../../sagas/global/globalSlice";
import SpeedDialAdmin from "../SpeedDialAdmin";
import { useForm } from "react-hook-form";
import { Field } from "../../../components/field";
import { Label } from "../../../components/label";
import { Textarea } from "../../../components/textarea";
import { sendFeedbacksRequest } from "../../../sagas/feedbackMail/feedbacksSlice";
import { Button } from "../../../components/button";
const schemaValidate = Yup.object({
  message: Yup.string().required("Vui lòng nhập số nội dung!"),
});
const CustomerDetailAdmin = () => {
  const {
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
    control,
    reset,
  } = useForm({ resolver: yupResolver(schemaValidate), mode: "onBlur" });
  const { showFeedback, isUploadImage } = useSelector((state) => state.global);
  const { feedbackDetail } = useSelector((state) => state.feedback);
  const dispatch = useDispatch();
  const handleSubmits = (value) => {
    const feedback = {
      ...value,
      fullName: feedbackDetail?.fullName,
      email: feedbackDetail?.email,
      phone: feedbackDetail?.phone,
    };
    if (isValid) {
      dispatch(sendFeedbacksRequest({ ...feedback, id: feedbackDetail?._id }));
      reset();
      handleClose();
    }
  };
  const handleClose = () => {
    dispatch(closeFeedback());
  };
  return (
    <>
      <ModalBase onClose={handleClose} visible={showFeedback}>
        <LayoutAdminModel onClick={handleClose}>
          <div
            className="relative mt-8 h-72 w-full overflow-hidden rounded-xl bg-cover	bg-center"
            style={{
              backgroundImage: `url(https://i.ex-cdn.com/vntravellive.com/files/news/2022/07/20/am-thuc-viet-nam-thuoc-top-ngon-nhat-the-gioi-104749.jpg)`,
            }}
          >
            <div className="absolute inset-0 h-full w-full bg-gray-500/50" />
          </div>
          <Card className="mx-3 -mt-16 mb-6 lg:mx-4">
            <CardBody className="p-4">
              <div className="mb-1 flex items-center justify-between gap-6">
                <div className="flex items-center gap-6">
                  <div>
                    <Typography variant="h5" color="blue-gray" className="mb-1">
                      {feedbackDetail?.full_name || ""}
                    </Typography>
                    <Typography
                      variant="small"
                      className="font-normal text-blue-gray-600"
                    >
                      {feedbackDetail?.user_name || ""}
                    </Typography>
                  </div>
                </div>
              </div>
              <div
                className=" flex-auto h-auto bg-white rounded-xl p-5 flex gap-x-10 flex-col md:flex-row
                         gap-y-5 md:gap-y-10"
              >
                <div className="text-base md:text-sm flex-1">
                  <WrapInfo>
                    <UserIcon /> <p>{feedbackDetail?.fullName}</p>
                  </WrapInfo>
                </div>
                <div className="text-base md:text-sm flex-1">
                  <WrapInfo>
                    <EmailIcon />{" "}
                    <p className="w-[80%]">
                      {feedbackDetail?.email || "Chưa có"}
                    </p>
                  </WrapInfo>
                </div>
              </div>
              <div className="px-4 pb-4">
                <div className="text-xs leading-6 md:text-sm lg:text-base">
                  <Label className="mb-2 text-black">Nội dung</Label>

                  <div
                    dangerouslySetInnerHTML={{
                      __html: feedbackDetail?.message,
                    }}
                    className="content_post !text-xs md"
                  />
                </div>
              </div>
              <div className="px-4 pb-4">
                <Typography variant="h6" color="blue-gray" className="mb-2">
                  Phản hồi cho người dùng
                </Typography>
                <div className="mt-6 ">
                  <form action="" onSubmit={handleSubmit(handleSubmits)}>
                    <Field>
                      <Label htmlFor={"message"}>Nội dung</Label>
                      <Textarea
                        control={control}
                        errors={errors}
                        name={"message"}
                      />
                    </Field>
                    <div className="w-full flex justify-center items-center mt-10">
                      <Button
                        className="bg-primary w-full lg:w-auto" isLoading={isUploadImage}
                        type="submit"
                      >
                        Gửi phản hồi
                      </Button>
                    </div>
                  </form>
                </div>
              </div>
            </CardBody>
          </Card>
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
