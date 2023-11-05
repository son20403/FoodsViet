import { EyeIcon } from "@heroicons/react/24/outline";
import { Avatar, Chip, Typography } from "@material-tailwind/react";
import React from "react";
import { useSelector } from "react-redux";
import { icon } from "../../../ADMIN/routes";
import useToggle from "../../../hooks/useToggle";
import useTimeSince from "../../../hooks/useTimeSince";
import DetailCategoriesAdmin from "./DetailCategoriesAdmin";

const CategoriesItemAdmin = ({ data }) => {
  const className = "px-5 py-3";
  const { admin } = useSelector((state) => state.admin);
  const timeSince = useTimeSince();
  const dataAdmin = admin.filter((ad) => ad._id === data?.id_author)[0];
  const { categories } = useSelector((state) => state.categories);
  const { customers } = useSelector((state) => state.customers);
  const dataCategory = categories.filter(
    (cate) => cate._id === data?.category
  )[0];
  const dataCustomer = customers.filter(
    (cus) => cus._id === data?.id_customer
  )[0];

  const authorType = data?.authorType;
  const { handleToggle, toggle } = useToggle(false);
  return (
    <>
      <tr className="border-b border-blue-gray-50 last:border-b-0">
        <td className={`${className} max-w-[500px]`}>
          <div className="flex items-center gap-4">
            <Avatar src={data?.image} alt={data?.title} size="lg" />
            <div className="flex-1">
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
            {dataAdmin?.full_name || ""}
          </Typography>
          <Typography className="text-xs font-normal text-blue-gray-500">
            {dataAdmin?.user_name || ""}
          </Typography>
        </td>
        <td className={`${className} text-center`}>
          <Chip
            variant="gradient"
            color={
              data?.status === "approved"
                ? "green"
                : data?.status === "pending"
                ? "yellow"
                : "red"
            }
            value={
              data?.status === "approved"
                ? "Đã duyệt"
                : data?.status === "pending"
                ? "Chờ duyệt"
                : "vô hiệu hóa"
            }
            className="py-0.5 px-2 text-[11px] font-medium inline-block"
          />
        </td>
        <td className={className}>
          <Typography className="flex flex-col text-xs font-semibold text-blue-gray-600">
            <span>{data?.date || ""}</span>
            <span className="font-normal text-gray-500">
              ({timeSince(data?.timestamps || Date.now())})
            </span>
          </Typography>
        </td>
        <td
          className={`${className} sticky right-0 bg-white shadow-inner md:shadow-none`}
        >
          <Typography className="text-xs font-semibold cursor-pointer text-blue-gray-600">
            <EyeIcon {...icon} onClick={handleToggle}></EyeIcon>
          </Typography>
        </td>
      </tr>
      <DetailCategoriesAdmin
        data={data}
        customers={dataCustomer}
        categories={dataCategory}
        show={toggle}
        onClick={handleToggle}
      ></DetailCategoriesAdmin>
    </>
  );
};

export default CategoriesItemAdmin;