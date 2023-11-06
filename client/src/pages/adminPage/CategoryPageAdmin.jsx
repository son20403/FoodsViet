import React from "react";
import LoadingRequest from "../../layout/loading/LoadingRequest";
import { useDispatch, useSelector } from "react-redux";
import {
  getCategoriesAdminRequest,
} from "../../sagas/admin/adminSlice";
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
} from "@material-tailwind/react";
import { ArrowPathIcon } from "@heroicons/react/24/outline";
import { icon } from "../../ADMIN/routes";
import CategoryItemAdmin from "../../layout/adminLayout/categories/CategoryItemAdmin";
import useToggle from "../../hooks/useToggle";
import CategoryDetailAdmin from "../../layout/adminLayout/categories/CategoryDetailAdmin";
import { toggleDetailCategory } from "../../sagas/global/globalSlice";
import CategoryEditAdmin from "../../layout/adminLayout/categories/CategoryEditAdmin";

const CategoryPageAdmin = () => {
  const { loading, categories } = useSelector(
    (state) => state.admin
  );
  // const { handleToggle, toggle } = useToggle(false)
  const dispatch = useDispatch();
  const handLoad = () => {
    dispatch(getCategoriesAdminRequest());
  };
  return (
    <div>
      <LoadingRequest show={loading}></LoadingRequest>
      <div className="relative flex flex-col gap-12 mt-12 mb-8">
        <Card>
          <CardHeader
            variant="gradient"
            className="z-10 flex items-center justify-between p-6 mb-8 bg-primary"
          >
            <Typography variant="h6" color="white">
              Danh sách bài viết
            </Typography>
            <span onClick={handLoad} className="text-white cursor-pointer">
              <ArrowPathIcon {...icon} />
            </span>
          </CardHeader>
          <CardBody className="px-0 pt-0 pb-2 mt-0 overflow-x-scroll">
            <table className="w-full min-w-[840px] table-auto">
              <thead>
                <tr>
                  {["Bài viết", "tác giả", "tình trạng", "thời gian", ""].map(
                    (el, index) => (
                      <th
                        key={index}
                        className="px-5 py-3 text-left bg-white border-b border-blue-gray-50 last:sticky last:right-0 last:shadow-inner last:md:shadow-none "
                      >
                        <Typography
                          variant="small"
                          className="text-[11px] font-bold uppercase text-blue-gray-400"
                        >
                          {el}
                        </Typography>
                      </th>
                    )
                  )}
                </tr>
              </thead>
              <tbody>
                {categories &&
                  categories?.length > 0 &&
                  categories?.map((data) => (
                    <CategoryItemAdmin key={data?._id} data={data} />
                  ))}
              </tbody>
            </table>
          </CardBody>
        </Card>
      </div>
      <CategoryDetailAdmin></CategoryDetailAdmin>
      <CategoryEditAdmin></CategoryEditAdmin>
    </div>
  );
};

export default CategoryPageAdmin;
