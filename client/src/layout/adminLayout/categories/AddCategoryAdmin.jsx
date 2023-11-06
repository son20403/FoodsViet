import React from "react";
import ModalBase from "../../modal/ModalBase";
import { useDispatch, useSelector } from "react-redux";
import { Heading } from "../../../components/heading";
import LayoutAdminModel from "../LayoutAdminModel";
import { Button } from "../../../components/button";
import { Field } from "../../../components/field";
import { FileInput, Input } from "../../../components/input";
import { BookmarkIcon } from "../../../components/Icon";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Label } from "../../../components/label";
import { getDate, getTimestamp } from "../../../hooks/useGetTime";
import { addCategoriesAdminRequest } from "../../../sagas/admin/adminSlice";

const schemaValidate = Yup.object({
  title: Yup.string().required("Vui lòng nhập tiêu đề!"),
  image: Yup.mixed().required("Vui lòng nhập ảnh!"),
});
const AddCategoryAdmin = ({ onClick = () => { }, show }) => {
  const {
    handleSubmit,
    formState: { errors },
    control,
  } = useForm({ resolver: yupResolver(schemaValidate), mode: "onBlur" });
  const dispatch = useDispatch();
  const { infoAdmin, loading } = useSelector((state) => state.admin);
  const handleAddCategory = (value) => {
    const date = getDate();
    const timestamps = getTimestamp();
    const id_author = infoAdmin?._id;
    const category = {
      ...value,
      date,
      timestamps,
      id_author,
    };

    dispatch(addCategoriesAdminRequest({ category }));
    onClick();
  };
  return (
    <ModalBase onClose={onClick} visible={show}>
      {/* <LoadingRequest show={loading}></LoadingRequest> */}
      <LayoutAdminModel onClick={onClick}>
        <div className="p-10 bg-white">
          <Heading isHeading>Thêm loại</Heading>
          <form
            onSubmit={handleSubmit(handleAddCategory)}
            className="flex flex-col mb-10 text-center gap-y-10 "
          >
            {/* <div className="grid grid-cols-1 gap-10 pt-10 mb-10 md:grid-cols-2 lg:grid-cols-2"> */}
            <Field>
              <Input
                control={control}
                errors={errors}
                value=""
                name="title"
                placeholder="Nhập tiêu đề loại"
                type="text"
              >
                <BookmarkIcon />
              </Input>
            </Field>
            <div className="col-span-1 mb-10 md:col-span-2">
              <Label htmlFor={"image"}>Hình ảnh</Label>
              <FileInput
                control={control}
                name={"image"}
                errors={errors}
                lable={"Hình ảnh"}
              />
            </div>
            {/* </div> */}
            <Button type="submit" className="mx-auto ">
              Thêm bài viết
            </Button>
          </form>
        </div>
      </LayoutAdminModel>
    </ModalBase>
  );
};

export default AddCategoryAdmin;
