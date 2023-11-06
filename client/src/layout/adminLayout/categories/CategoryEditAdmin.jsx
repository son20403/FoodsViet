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
import { Label } from "../../../components/label";
import { Button } from "../../../components/button";
import LayoutAdminModel from "../LayoutAdminModel";
import { updateCategoriesAdminRequest } from "../../../sagas/admin/adminSlice";

const schemaValidate = Yup.object({
  title: Yup.string().required("Vui lòng nhập tiêu đề!"),
  image: Yup.mixed(),
});

const CategoryEditAdmin = ({ data, show, onClick = () => {} }) => {
  const dispatch = useDispatch();
  const {
    handleSubmit,
    setValue,
    formState: { errors },
    control,
  } = useForm({ resolver: yupResolver(schemaValidate), mode: "onBlur" });
  const handleSubmits = (value) => {
    try {
      const category = { ...value };
      dispatch(
        updateCategoriesAdminRequest({
          id: data._id,
          category,
          slug: data.slug,
        })
      );
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
        <div className="p-10 bg-white">
          <Heading isHeading>Thêm loại</Heading>
          <form
            onSubmit={handleSubmit(handleSubmits)}
            className="flex flex-col mb-10 text-center gap-y-10 "
          >
            {/* <div className="grid grid-cols-1 gap-10 pt-10 mb-10 md:grid-cols-2 lg:grid-cols-2"> */}
            <Field>
              <Input
                control={control}
                errors={errors}
                name="title"
                value={data?.title}
                placeholder="Nhập tiêu đề loại"
                type="text"
              >
                <BookmarkIcon />
              </Input>
            </Field>
            <div className="col-span-1 mb-10 md:col-span-2">
              <Label htmlFor={"image"}>Hình ảnh</Label>
              <FileInput
                oldImage={data?.image}
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

export default CategoryEditAdmin;
