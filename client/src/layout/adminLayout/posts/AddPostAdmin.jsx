import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { getDate, getTimestamp } from "../../../hooks/useGetTime";
import { useEffect } from "react";
import LoadingRequest from "../../loading/LoadingRequest";
import PageWrap from "../../common/PageWrap";
import { Heading } from "../../../components/heading";
import { Field } from "../../../components/field";
import { FileInput, Input } from "../../../components/input";
import { Select } from "../../../components/select";
import { Label } from "../../../components/label";
import { Textarea } from "../../../components/textarea";
import { Button } from "../../../components/button";
import ModalBase from "../../modal/ModalBase";
import LayoutAdminModel from "../LayoutAdminModel";
import { BookmarkIcon } from "../../../components/Icon";
import {
  addPostAdminRequest,
  getCategoriesAdminRequest,
} from "../../../sagas/admin/adminSlice";
const schemaValidate = Yup.object({
  title: Yup.string().required("Vui lòng nhập tiêu đề!"),
  content: Yup.string().required("Vui lòng nhập nội dung!"),
  image: Yup.mixed().required("Vui lòng nhập ảnh!"),
  // .min(6, 'Tên đăng nhập phải lớn hơn 6 kí tự'),
});
const AddPostAdmin = ({ onClick = () => {}, show }) => {
  const dispatch = useDispatch();
  const { tokenAdmin, categories, loading } = useSelector(
    (state) => state.admin
  );
  const {
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
    control,
  } = useForm({ resolver: yupResolver(schemaValidate), mode: "onBlur" });
  //   const { categories, loading } = useSelector((state) => state.categories);
  const handleSubmits = (value) => {
    const date = getDate();
    const timestamps = getTimestamp();
    const post = {
      ...value,
      date,
      timestamps,
    };
    dispatch(addPostAdminRequest({ post }));
    onClick();
  };
  useEffect(() => {
    dispatch(getCategoriesAdminRequest());
  }, [tokenAdmin]);
  return (
    <ModalBase onClose={onClick} visible={show}>
      <LoadingRequest show={loading}></LoadingRequest>
      <LayoutAdminModel onClick={onClick}>
        <div className="p-10 bg-white">
          <Heading isHeading>Thêm bài viết </Heading>
          <form
            onSubmit={handleSubmit(handleSubmits)}
            className="mb-10 text-center"
          >
            <div className="grid grid-cols-1 gap-10 pt-10 mb-10 md:grid-cols-2 lg:grid-cols-2">
              <Field>
                <Input
                  control={control}
                  errors={errors}
                  value=""
                  name="title"
                  placeholder="Nhập tiêu đề bài viết"
                  type="text"
                >
                  <BookmarkIcon />
                </Input>
              </Field>
              <Field>
                <Select data={categories} control={control} name={"category"} />
              </Field>
              <div className="col-span-1 mb-10  md:col-span-2">
                <Label htmlFor={"image"}>Hình ảnh</Label>
                <FileInput
                  control={control}
                  name={"image"}
                  errors={errors}
                  lable={"Hình ảnh"}
                />
              </div>
              <div className="col-span-1  md:col-span-2">
                <Field>
                  <Label htmlFor={"content"}>Nội dung</Label>
                  <Textarea
                    control={control}
                    errors={errors}
                    name={"content"}
                  />
                </Field>
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

export default AddPostAdmin;
