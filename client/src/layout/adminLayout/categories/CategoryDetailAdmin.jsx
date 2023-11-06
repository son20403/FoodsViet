import React from "react";
import ModalBase from "../../modal/ModalBase";
import LayoutAdminModel from "../LayoutAdminModel";
import {
  Card, CardBody, CardHeader, CardFooter, Avatar, Typography, Button,
} from "@material-tailwind/react";

import { useDispatch, useSelector } from "react-redux";
import { updateStatusRequest } from "../../../sagas/admin/adminSlice";
import { closeDetailCategory, toggleUpdateCategory } from "../../../sagas/global/globalSlice";
import SpeedDialAdmin from "../SpeedDialAdmin";

const CategoryDetailAdmin = () => {
  const dispatch = useDispatch();
  const { posts, admin, categoryDetail } = useSelector((state) => state.admin);
  const dataAdmin = admin.filter((ad) => ad._id === categoryDetail?.id_author)[0];

  const dataPostsByCategory = posts.filter(
    (post) => post.category === categoryDetail?._id
  );
  const { showDetailCategory } = useSelector((state) => state.global)
  const handleEditCategory = () => {
    dispatch(toggleUpdateCategory());
  };
  const handleClose = () => {
    dispatch(closeDetailCategory())
  }
  const handleUpdateStatus = (status) => {
    const model = "category";
    const id = categoryDetail?._id;
    dispatch(updateStatusRequest({ id, model, status }));
    handleClose();
  };
  return (
    <>
      <ModalBase onClose={handleClose} visible={showDetailCategory}>
        <LayoutAdminModel onClick={handleClose}>
          <div
            className="relative w-full mt-8 overflow-hidden bg-center bg-cover h-72 rounded-xl"
            style={{ backgroundImage: `url(${categoryDetail?.image})` }}
          >
            <div className="absolute inset-0 w-full h-full bg-gray-500/50" />
          </div>
          <Card className="mx-3 mb-6 -mt-16 lg:mx-4">
            <CardBody className="p-4">
              <div className="flex items-center justify-between gap-6 mb-10">
                <div className="flex items-center gap-6">
                  <Avatar
                    src={categoryDetail?.image}
                    alt="bruce-mars"
                    size="xl"
                    className="rounded-lg shadow-lg shadow-blue-gray-500/40"
                  />
                  <div>
                    <Typography variant="h5" color="blue-gray" className="mb-1">
                      {categoryDetail?.title || ''}
                    </Typography>
                    <Typography
                      variant="small"
                      className="font-normal text-blue-gray-600"
                    >
                      {dataAdmin?.full_name} - {categoryDetail?.date}
                    </Typography>
                  </div>
                </div>
              </div>
              <div className="px-4 pb-4">
                <Typography variant="h6" color="blue-gray" className="mb-2">
                  Category
                </Typography>
                <Typography
                  variant="small"
                  className="font-normal text-blue-gray-500"  >
                  Architects design houses
                </Typography>
                <div className="grid grid-cols-1 gap-12 mt-6 md:grid-cols-2 xl:grid-cols-3">
                  {dataPostsByCategory.map(({ image, title, _id }) => (
                    <Card key={_id} color="transparent" shadow={false}>
                      <CardHeader
                        floated={false}
                        color="gray"
                        className="h-64 mx-0 mt-0 mb-4 xl:h-40"
                      >
                        <img
                          src={image}
                          alt={title}
                          className="object-cover w-full h-full"
                        />
                      </CardHeader>
                      <CardBody className="px-1 py-0">
                        <Typography
                          variant="h5"
                          color="blue-gray"
                          className="mt-1 mb-2 line-clamp-2"
                        >
                          {title || ''}
                        </Typography>
                      </CardBody>
                      <CardFooter className="flex items-center justify-between px-1 py-0 mt-auto ">
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
            detail={categoryDetail} handleEdit={handleEditCategory} handleUpdateStatus={handleUpdateStatus} />
        </LayoutAdminModel>
      </ModalBase>
    </>
  );
};

export default CategoryDetailAdmin;
