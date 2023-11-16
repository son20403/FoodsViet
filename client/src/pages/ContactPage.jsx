import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import { Field } from "../components/field";
import { Input } from "../components/input";
import {
  EnvelopeOpenIcon,
  UserIcon,
  PhoneIcon,
} from "@heroicons/react/24/solid";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { getDate, getTimestamp } from "../hooks/useGetTime";
import { Label } from "../components/label";

import { Textarea } from "../components/textarea";
import {
  FeedbackRequest,
  createFeedbacksRequest,
} from "../sagas/feedbackMail/feedbacksSlice";

const schemaValidate = Yup.object({
  fullName: Yup.string().required("Vui lòng nhập tên!"),
  email: Yup.string()
    .required("Vui lòng nhập email!")
    .email("Vui lòng nhập đúng định dạng email!"),
  phone: Yup.string().required("Vui lòng nhập số điện thoại!"),
  message: Yup.string().required("Vui lòng nhập số nội dung!"),

  // image: Yup.mixed().required("Vui lòng nhập ảnh!"),
  // .min(6, 'Tên đăng nhập phải lớn hơn 6 kí tự'),
});
const ContactPage = () => {
  const dispatch = useDispatch();
  const { infoAuth } = useSelector((state) => state.auth);
  const {
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
    control,
    reset,
  } = useForm({ resolver: yupResolver(schemaValidate), mode: "onBlur" });
  const handleSubmits = (value) => {
    console.log(
      "🚀 ~ file: ContactPage.jsx:41 ~ handleSubmits ~ value:",
      value
    );
    const date = getDate();
    const timestamps = getTimestamp();
    const feedback = {
      ...value,
      date,
      timestamps,
    };
    if (isValid) {
      dispatch(createFeedbacksRequest({ feedback }));
      reset();
    }
  };
  useEffect(() => {
    dispatch(FeedbackRequest());
  }, []);
  return (
    <div className="bg-white">
      <div
        className="w-full h-[400px] relative min-h-[100%] bg-cover mb-5"
        style={{ backgroundImage: "url('../src/assets/image/bg-hero.jpg')" }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-80">
          <div className="flex flex-col items-center justify-center h-full">
            <div className="mb-3 font-bold text-white text-7xl">
              Liên hệ với chúng tôi
            </div>
            <div className="flex flex-wrap p-0 text-white list-none ">
              <div className="flex justify-center uppercase">
                <div className="pr-2 font-semibold text-orange-500 cursor-pointer hover:opacity-70">
                  Home
                </div>
                <div className="pr-2 font-semibold text-orange-500 cursor-pointer hover:opacity-70 before:content-['/'] before:pr-2 before:text-white before:opacity-70">
                  Pages
                </div>
                <div className="font-semibold before:content-['/'] before:pr-2 before:opacity-70">
                  Contact
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full pt-12 pb-4 mx-auto">
        <div className="text-center ">
          <h5 className="relative inline-block pr-8 mb-2 text-3xl font-extrabold text-primary font-dancing">
            <span className="absolute right-full border w-[80px] top-1/2 -translate-x-1/2 h-[1px] border-primary"></span>
            Liên hệ với chúng tôi{" "}
            <span className="absolute left-full border w-[80px] top-1/2 -translate-y-1/2 h-[1px] border-primary"></span>
          </h5>
          <h1 className="mb-12 text-4xl font-bold">
            Liên hệ nếu có bất kỳ câu hỏi nào
          </h1>
        </div>
        <div className="page-content ">
          <div className="grid w-full grid-cols-3">
            <div className="">
              <h5 className="relative inline-block pr-8 mb-2 text-3xl font-extrabold text-primary font-dancing">
                Booking
                <span className="absolute left-full border w-[80px] top-1/2 -translate-y-1/2 h-[1px] border-primary"></span>
              </h5>

              <p className="mb-4 text-base">book@example.com</p>
            </div>
            <div className="">
              <h5 className="relative inline-block pr-8 mb-2 text-3xl font-extrabold text-primary font-dancing">
                General
                <span className="absolute left-full border w-[80px] top-1/2 -translate-y-1/2 h-[1px] border-primary"></span>
              </h5>

              <p className="mb-4 text-base">book@example.com</p>
            </div>
            <div className="">
              <h5 className="relative inline-block pr-8 mb-2 text-3xl font-extrabold text-primary font-dancing">
                Technical
                <span className="absolute left-full border w-[80px] top-1/2 -translate-y-1/2 h-[1px] border-primary"></span>
              </h5>

              <p className="mb-4 text-base">book@example.com</p>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-5 mx-5 mt-10 md:grid-cols-2">
            <div className="w-full">
              <img
                src="../src/assets/image/pixzolo-photography-Qtd5z7g4thc-unsplash.jpg"
                alt=""
                className="object-cover w-full h-full rounded-lg "
              />
            </div>
            <div className="w-full ">
              <form
                action=""
                className="flex flex-col"
                onSubmit={handleSubmit(handleSubmits)}
              >
                <div className="flex">
                  <div className="w-2/4 px-4 py-3">
                    <div className="">
                      <Field>
                        <Input
                          control={control}
                          errors={errors}
                          value={infoAuth?.full_name}
                          name="fullName"
                          placeholder="Nhập tên"
                          type="text"
                          disable={infoAuth?.full_name ? true : false}
                        >
                          <UserIcon />
                        </Input>
                      </Field>
                    </div>
                  </div>
                  <div className="w-2/4 px-4 py-3">
                    <div className="">
                      <Field>
                        <Input
                          control={control}
                          errors={errors}
                          value={infoAuth?.email}
                          name="email"
                          placeholder="Nhập email"
                          type="email"
                          disable={infoAuth?.email ? true : false}
                        >
                          <EnvelopeOpenIcon />
                        </Input>
                      </Field>
                    </div>
                  </div>
                </div>
                <div className="w-full px-4 py-3">
                  <div className="">
                    <Field>
                      <Input
                        control={control}
                        errors={errors}
                        value={infoAuth?.phone}
                        name="phone"
                        placeholder="Nhập số điện thoại"
                        type="text"
                        disable={infoAuth?.phone ? true : false}
                      >
                        <PhoneIcon />
                      </Input>
                    </Field>
                  </div>
                </div>
                <div className="w-full px-4 py-3">
                  <div className="">
                    <Field>
                      <Label htmlFor={"message"}>Nội dung</Label>
                      <Textarea
                        control={control}
                        errors={errors}
                        name={"message"}
                      />
                    </Field>
                  </div>
                </div>
                <div className="w-full px-4 py-3">
                  <button
                    type="submit"
                    className="w-full py-4 text-lg font-semibold text-white rounded-sm bg-primary"
                  >
                    Send Message
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
