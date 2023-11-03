import React from "react";
import ModalBase from "../../modal/ModalBase";
import LoadingRequest from "../../loading/LoadingRequest";
import { useSelector } from "react-redux";
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

const schemaValidate = Yup.object({
  title: Yup.string().required("Vui lòng nhập tiêu đề!"),
  content: Yup.string().required("Vui lòng nhập nội dung!"),
  image: Yup.mixed().required("Vui lòng nhập ảnh!"),
  // .min(6, 'Tên đăng nhập phải lớn hơn 6 kí tự'),
});
const AddCategotiesAdmin = ({ onClick = () => {}, show }) => {
  const { categories, loading } = useSelector((state) => state.categories);
  const {
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
    control,
  } = useForm({ resolver: yupResolver(schemaValidate), mode: "onBlur" });
  return (
    <ModalBase onClose={onClick} visible={show}>
      <LoadingRequest show={loading}></LoadingRequest>;
      <LayoutAdminModel>
        <div className="p-10 bg-white">
          <Heading isHeading>Thêm loại</Heading>
          <form className="mb-10 text-center">
            <div className="grid grid-cols-1 gap-10 pt-10 mb-10 md:grid-cols-2 lg:grid-cols-2">
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
            </div>
            <Button type="submit" className="mx-auto ">
              Thêm bài viết
            </Button>
          </form>
        </div>
      </LayoutAdminModel>
    </ModalBase>
  );
};

export default AddCategotiesAdmin;
