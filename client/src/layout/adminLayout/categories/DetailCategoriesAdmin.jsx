import React, { useEffect } from "react";
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
  Button,
} from "@material-tailwind/react";
import {
  ArchiveBoxXMarkIcon,
  ArrowUpTrayIcon,
  ClockIcon,
  PencilSquareIcon,
  PlusIcon,
} from "@heroicons/react/24/outline";
import { icon } from "../../../ADMIN/routes";

import { useDispatch, useSelector } from "react-redux";
import useToggle from "../../../hooks/useToggle";
import { updateStatusRequest } from "../../../sagas/admin/adminSlice";
import CategoryEditAdmin from "./CategoryEditAdmin";

const DetailCategoriesAdmin = ({
  onClick,
  show,
  data,

  customers,
  categories,
}) => {
  const dispatch = useDispatch();
  const { handleToggle, toggle } = useToggle(false);
  const handleEditPost = () => {
    handleToggle();
  };
  const { posts, admin } = useSelector((state) => state.admin);
  const dataAdmin = admin.filter((ad) => ad._id === data?.id_author)[0];

  const dataPostsByCategory = posts.filter(
    (post) => post.category === data?._id
  );

  const handleUpdateStatus = (status) => {
    const model = "category";
    const id = data?._id;
    dispatch(updateStatusRequest({ id, model, status }));
    onClick();
  };
  useEffect(() => {
    const divElements = document.querySelectorAll(
      ".content_post.post_item div"
    );
    const pElements = document.querySelectorAll(".content_post.post_item p");
    divElements?.forEach((div) => {
      if (div.textContent.trim() === "") div.style.display = "none";
    });
    pElements?.forEach((p) => {
      if (p.textContent.trim() === "") p.style.display = "none";
    });
  }, []);
  return (
    <>
      <ModalBase onClose={onClick} visible={show}>
        <LayoutAdminModel onClick={onClick}>
          <div
            className="relative w-full mt-8 overflow-hidden bg-center bg-cover h-72 rounded-xl"
            style={{ backgroundImage: `url(${data?.image})` }}
          >
            <div className="absolute inset-0 w-full h-full bg-gray-500/50" />
          </div>
          <Card className="mx-3 mb-6 -mt-16 lg:mx-4">
            <CardBody className="p-4">
              <div className="flex items-center justify-between gap-6 mb-10">
                <div className="flex items-center gap-6">
                  <Avatar
                    src={data?.image}
                    alt="bruce-mars"
                    size="xl"
                    className="rounded-lg shadow-lg shadow-blue-gray-500/40"
                  />
                  <div>
                    <Typography variant="h5" color="blue-gray" className="mb-1">
                      {data?.title}
                    </Typography>
                    <Typography
                      variant="small"
                      className="font-normal text-blue-gray-600"
                    >
                      {dataAdmin?.full_name} - {data?.date}{" "}
                    </Typography>
                  </div>
                </div>
                {/* <div className="w-96">
                  <Tabs value="app">
                    <TabsHeader>
                      <Tab value="app">
                        <HomeIcon className="inline-block w-5 h-5 mr-2 -mt-1" />
                        App
                      </Tab>
                      <Tab value="message">
                        <ChatBubbleLeftEllipsisIcon className="-mt-0.5 mr-2 inline-block h-5 w-5" />
                        Message
                      </Tab>
                      <Tab value="settings">
                        <Cog6ToothIcon className="inline-block w-5 h-5 mr-2 -mt-1" />
                        Settings
                      </Tab>
                    </TabsHeader>
                  </Tabs>
                </div> */}
              </div>

              <div className="px-4 pb-4">
                <Typography variant="h6" color="blue-gray" className="mb-2">
                  Category
                </Typography>
                <Typography
                  variant="small"
                  className="font-normal text-blue-gray-500"
                >
                  Architects design houses
                </Typography>
                <div className="grid grid-cols-1 gap-12 mt-6 md:grid-cols-2 xl:grid-cols-4">
                  {dataPostsByCategory.map(({ image, title, _id, content }) => (
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
                        {/* <Typography
                            variant="small"
                            className="font-normal text-blue-gray-500"
                          >
                            {tag}
                          </Typography> */}
                        <Typography
                          variant="h5"
                          color="blue-gray"
                          className="mt-1 mb-2 line-clamp-2"
                        >
                          {title}
                        </Typography>
                        <Typography
                          className={`!bg-none 
                            line-clamp-4 lg:line-clamp-3 md:mt-auto
                            `}
                        >
                          <div
                            dangerouslySetInnerHTML={{ __html: content }}
                            className="content_post post_item !font-normal !text-gray-200 "
                          />
                        </Typography>
                      </CardBody>
                      <CardFooter className="flex items-center justify-between px-1 py-0 mt-auto ">
                        <div className="mt-10">
                          <Button variant="outlined" size="sm">
                            view category
                          </Button>
                        </div>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              </div>
            </CardBody>
          </Card>
          <div className="sticky bottom-0 flex items-center justify-end w-full py-5 pr-5">
            <div className="flex items-center gap-5">
              {/* <div className='pr-5 border-r-2 border-primary'>
                            <Button size='sm' className='bg-primary' onClick={handleEditPost}>
                                <PencilSquareIcon {...icon} /></Button>
                        </div>
                        <Button size='sm' color='green'><ArrowUpTrayIcon {...icon} /></Button>
                        <Button size='sm' color='yellow'><ClockIcon {...icon} /></Button>
                        <Button size='sm' color='red'><ArchiveBoxXMarkIcon {...icon} /></Button> */}
              <SpeedDial>
                <SpeedDialHandler>
                  <IconButton
                    size="lg"
                    className="border border-white rounded-full"
                  >
                    <PlusIcon className="w-5 h-5 transition-transform group-hover:rotate-45" />
                  </IconButton>
                </SpeedDialHandler>
                <SpeedDialContent className="bg-white border rounded-full shadow-xl border-blue-gray-50 shadow-black/10">
                  <SpeedDialAction
                    onClick={() => handleUpdateStatus("destroy")}
                    className={`bg-red-500 text-white ${
                      data?.status === "destroy" ? "hidden" : ""
                    }`}
                  >
                    <ArchiveBoxXMarkIcon {...icon} />
                  </SpeedDialAction>
                  <SpeedDialAction
                    onClick={() => handleUpdateStatus("pending")}
                    className={`bg-yellow-500 text-black ${
                      data?.status === "pending" ? "hidden" : ""
                    }`}
                  >
                    <ClockIcon {...icon} />
                  </SpeedDialAction>
                  <SpeedDialAction
                    onClick={() => handleUpdateStatus("approved")}
                    className={`bg-green-500 text-white ${
                      data?.status === "approved" ? "hidden" : ""
                    }`}
                  >
                    <ArrowUpTrayIcon {...icon} />
                  </SpeedDialAction>
                  <SpeedDialAction
                    className="text-white bg-primary"
                    onClick={handleEditPost}
                  >
                    <PencilSquareIcon {...icon} />
                  </SpeedDialAction>
                </SpeedDialContent>
              </SpeedDial>
            </div>
          </div>
        </LayoutAdminModel>
      </ModalBase>
      <CategoryEditAdmin
        data={data}
        show={toggle}
        onClick={handleToggle}
      ></CategoryEditAdmin>
    </>
  );
};

export default DetailCategoriesAdmin;
