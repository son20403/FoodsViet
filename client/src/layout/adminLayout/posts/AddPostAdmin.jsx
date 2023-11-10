import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { getDate, getTimestamp } from "../../../hooks/useGetTime";
import { useEffect } from "react";
import LoadingRequest from "../../loading/LoadingRequest";
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
import { closeAddPost } from "../../../sagas/global/globalSlice";
const schemaValidate = Yup.object({
  title: Yup.string().required("Vui lòng nhập tiêu đề!"),
  content: Yup.string().required("Vui lòng nhập nội dung!"),
  category: Yup.string().required("Vui lòng chọn loại!"),
  image: Yup.mixed().required("Vui lòng nhập ảnh!"),
});
const AddPostAdmin = () => {
  const dispatch = useDispatch();
  const { tokenAdmin, categories, loading } = useSelector(
    (state) => state.admin
  );
  const handleClosePost = () => {
    dispatch(closeAddPost())
  }
  const { showAddPost } = useSelector((state) => state.global);
  const {
    handleSubmit,
    formState: { errors },
    control,
  } = useForm({ resolver: yupResolver(schemaValidate), mode: "onBlur" });
  const handleSubmits = (value) => {
    const date = getDate();
    const timestamps = getTimestamp();
    const post = {
      ...value,
      date,
      timestamps,
    };
    dispatch(addPostAdminRequest({ post }));
    handleClosePost();
  };
  useEffect(() => {
    dispatch(getCategoriesAdminRequest());
  }, [tokenAdmin]);
  return (
    <ModalBase onClose={handleClosePost} visible={showAddPost}>
      <LoadingRequest show={loading}></LoadingRequest>
      <LayoutAdminModel onClick={handleClosePost}>
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
                <Select data={categories} control={control} name={"category"} errors={errors} />
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
