import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useEffect } from "react";
import { categoriesRequest } from "../../../sagas/categories/categoriesSlice";
import ModalBase from "../../modal/ModalBase";
import { Heading } from "../../../components/heading";
import { Field } from "../../../components/field";
import { FileInput, Input } from "../../../components/input";
import { BookmarkIcon } from "../../../components/Icon";
import { Select } from "../../../components/select";
import { Label } from "../../../components/label";
import { Textarea } from "../../../components/textarea";
import { Button } from "../../../components/button";
import LayoutAdminModel from "../LayoutAdminModel";
import { updatePostAdminRequest } from "../../../sagas/admin/adminSlice";

const schemaValidate = Yup.object({
  title: Yup.string().required("Vui lòng nhập tiêu đề!"),
  content: Yup.string().required("Vui lòng nhập nội dung!"),
  image: Yup.mixed(),
});

const PostEditAdmin = ({ data, show, onClick = () => {} }) => {
  const dispatch = useDispatch();
  const {
    handleSubmit,
    setValue,
    formState: { errors },
    control,
  } = useForm({ resolver: yupResolver(schemaValidate), mode: "onBlur" });
  const { categories } = useSelector((state) => state.categories);
  const handleSubmits = (value) => {
    try {
      const post = { ...value };
      dispatch(updatePostAdminRequest({ id: data._id, post, slug: data.slug }));
      onClick();
      resetImageField();
    } catch (error) {
      console.error("Có lỗi xảy ra:", error);
    }
  };

  const resetImageField = () => {
    setValue("image", "");
  };
  useEffect(() => {
    dispatch(categoriesRequest());
  }, []);
  return (
    <ModalBase onClose={onClick} visible={show}>
      <LayoutAdminModel onClick={onClick}>
        <div className="p-2 md:p-5">
          <form
            onSubmit={handleSubmit(handleSubmits)}
            className="mb-10 text-center p-2 md:p-5 bg-white"
          >
            <Heading isHeading>Chỉnh sửa bài viết </Heading>
            <div className="grid grid-cols-1  gap-10 pt-10 mb-10">
              <Field>
                <Input
                  control={control}
                  errors={errors}
                  value={data?.title}
                  name="title"
                  placeholder="Nhập tiêu đề bài viết"
                  type="text"
                >
                  <BookmarkIcon />
                </Input>
              </Field>
              <Field>
                <Select
                  value={data?.category}
                  data={categories}
                  control={control}
                  name={"category"}
                />
              </Field>
              <Field className=" col-span-1 mb-10">
                <Label htmlFor={"image"}>Hình ảnh</Label>
                <FileInput
                  oldImage={data?.image}
                  control={control}
                  name={"image"}
                  errors={errors}
                  lable={"Hình ảnh"}
                />
              </Field>
              <Field>
                <Label htmlFor={"content"}>Nội dung</Label>
                <Textarea
                  value={data?.content}
                  control={control}
                  errors={errors}
                  name={"content"}
                />
              </Field>
            </div>
            <Button type="submit" className=" mx-auto">
              Sửa bài viết
            </Button>
          </form>
        </div>
      </LayoutAdminModel>
    </ModalBase>
  );
};

export default PostEditAdmin;
