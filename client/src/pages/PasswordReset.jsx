import React from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { InputPassword } from "../components/input";
import { UserIcon } from "../components/Icon";
import { Button } from "../components/button";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { resetPasswordRequest } from "../sagas/feedbackMail/feedbacksSlice";
import useSetTitle from "../hooks/useSetTitle";

const schemaValidate = Yup.object({
  password: Yup.string()
    .required("Vui lòng nhập mật khẩu!")
    .min(6, "Mật khẩu có ít nhất 8 ký tự!")
    .max(20, "Mật khẩu không được dài quá 20 ký tự")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      "Mật khẩu cần có ít nhất 1 ký tự in hoa, 1 ký tự thường, 1 số và 1 ký tự đặt biệt!"
    ),
  re_password: Yup.string().oneOf(
    [Yup.ref("password"), null],
    "Mật khẩu không khớp vui lòng nhập lại!"
  ),
});

const PasswordReset = () => {
  useSetTitle('Đổi mật khẩu')
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const tokenParams = new URLSearchParams(location.search).get("token");
  console.log(
    "🚀 ~ file: PasswordReset.jsx:31 ~ PasswordReset ~ tokenParams:",
    tokenParams
  );
  const handleBack = () => {
    navigate("/signin");
  };
  const {
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
    control,
    reset,
  } = useForm({ resolver: yupResolver(schemaValidate), mode: "onChange" });

  const handleSubmits = (value) => {
    console.log(
      "🚀 ~ file: PasswordReset.jsx:37 ~ handleSubmits ~ value:",
      value
    );
    try {
      if (isValid) {
        dispatch(
          resetPasswordRequest({
            password: value.password,
            token: tokenParams,
            handleBack,
          })
        );
      }
    } catch (error) {
      console.log("err", error);
    }
  };
  return (
    <div className="">
      <div
        className="relative flex items-center justify-center h-screen"
        style={{ backgroundImage: `url('./src/assets/image/login-bg.jpg')` }}
      >
        <div className="absolute inset-0 bg-black opacity-50"></div>

        <div className="w-[650px] text-center z-[10]">
          <form onSubmit={handleSubmit(handleSubmits)} className="">
            <h2 className="mb-3 text-4xl text-[#fff]">Đặt Lại Mật Khẩu</h2>
            <div className="flex flex-col w-full gap-4 p-5 bg-white rounded-lg">
              <InputPassword
                control={control}
                name={"password"}
                errors={errors}
                placeholder="Mật khẩu"
                value=""
              >
                <UserIcon />
              </InputPassword>
              <InputPassword
                control={control}
                name={"re_password"}
                errors={errors}
                placeholder="Nhập lại mật khẩu"
                value=""
              ></InputPassword>
              <Button isLoading={isSubmitting} type="submit">
                Đặt lại mật khẩu
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PasswordReset;
