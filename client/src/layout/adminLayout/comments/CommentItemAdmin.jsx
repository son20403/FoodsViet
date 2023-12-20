import React from "react";
import { Chip, Typography } from "@material-tailwind/react";
import { useSelector } from "react-redux";

const CommentItemAdmin = ({ data }) => {
  const { posts, customers, categories } = useSelector((state) => state.admin);
  const dataCustomer = customers.filter(
    (cus) => cus._id === data?.id_customer
  )[0];
  const dataPost = posts.filter((cus) => cus._id === data?.id_post)[0];
  const dataCategory = categories.filter(
    (cus) => cus._id === dataPost?.category
  )[0];

  const className = "px-5 py-3";

  return (
    <>
      <tr className="border-b border-blue-gray-50 last:border-b-0">
        <td className={`${className} max-w-[500px]`}>
          <div className="flex items-center gap-4">
            <div className="flex-1">
              <Typography className="text-xs font-normal text-blue-gray-500">
                {dataCustomer?.full_name || ""}
              </Typography>
            </div>
          </div>
        </td>
        <td className={className}>
          <Typography className="text-xs font-semibold text-blue-gray-600">
            {dataCategory?.title}
          </Typography>
          <Typography
            variant="small"
            color="blue-gray"
            className="font-semibold"
          >
            {dataPost?.title}
          </Typography>
        </td>
        <td className={`${className} `}>
          <Typography className="text-xs font-semibold text-blue-gray-600">
            {data?.content || ""}
          </Typography>
        </td>
        <td className={className}>
          <Typography className="flex flex-col text-xs font-semibold text-blue-gray-600">
            <span>{data?.date || ""}</span>
          </Typography>
        </td>
        <td className={`${className} `}>
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
      </tr>
    </>
  );
};

export default CommentItemAdmin;
