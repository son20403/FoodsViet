import React, { useEffect } from 'react';
import { Input, InputPassword } from '../components/input';
import { EmailIcon, UserIcon } from '../components/Icon';
import { Button } from '../components/button';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from "yup";
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { registerRequest } from '../sagas/auth/authSlice';
const schemaValidate = Yup.object({
    user_name: Yup.string().required("Vui lòng nhập tên đăng nhập!")
        .max(20, "Tên tài khoản không được dài quá 20 ký tự")
        .min(6, 'Tên đăng nhập phải lớn hơn 6 kí tự'),
    full_name: Yup.string().required("Vui lòng nhập họ và tên nhập!")
        .max(22, "Tên không dài quá 23 ký tự")
        .min(6, 'Tên đăng nhập phải lớn hơn 6 kí tự'),
    password: Yup.string()
        .required("Vui lòng nhập mật khẩu!")
        .min(6, 'Mật khẩu có ít nhất 8 ký tự!')
        .max(20, "Mật khẩu không được dài quá 20 ký tự")
        .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
            'Mật khẩu cần có ít nhất 1 ký tự in hoa, 1 ký tự thường, 1 số và 1 ký tự đặt biệt!'),
    re_password: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Mật khẩu không khớp vui lòng nhập lại!'),
    email: Yup.string().required("Vui lòng nhập email!").email("Vui lòng nhập đúng định dạng email!"),
})
const SignUp = ({ onClick = () => { } }) => {
    const { handleSubmit, formState: { errors, isSubmitting, isValid }, control } =
        useForm({ resolver: yupResolver(schemaValidate), mode: 'onBlur', })
    const { error } = useSelector((state) => state.auth)
    const dispatch = useDispatch()
    const handleSignUp = (value) => {
        if (isValid) {
            dispatch(registerRequest(value))
        }
    }
    useEffect(() => {
        if (!error)
            onClick()
    }, [error]);
    return (
        <>
            <form onSubmit={handleSubmit(handleSignUp)} className="sign-up-form form_signin-signup ">
                <h2 className="title">Đăng Ký</h2>
                <div className='flex flex-col gap-4 w-full bg-white  p-5 rounded-lg' >
                    <Input control={control} type='text' name={'user_name'} errors={errors} placeholder='Tài khoản'
                        value='' ><UserIcon /></Input>
                    <Input control={control} type='text' name={'full_name'} errors={errors} placeholder='Họ và tên'
                        value='' ><UserIcon /></Input>
                    <InputPassword control={control} name={'password'} errors={errors} placeholder='Mật khẩu'
                        value='' ><UserIcon /></InputPassword>
                    <InputPassword control={control} name={'re_password'} errors={errors} placeholder='Nhập lại mật khẩu'
                        value='' ><UserIcon /></InputPassword>
                    <Input control={control} type='email' name={'email'} errors={errors} placeholder='Email'
                        value='' ><EmailIcon /></Input>
                    <Button isLoading={isSubmitting} type='submit' >Đăng ký</Button>
                </div>
            </form>
        </>
    );
};
export default SignUp;
