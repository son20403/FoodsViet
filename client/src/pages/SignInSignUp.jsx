import React, { useEffect } from 'react';
import '../style.css'
import useToggle from '../hooks/useToggle';
import SignIn from './SignIn';
import SignUp from './SignUp';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
const SignInSignUp = () => {
    const { token } = useSelector((state) => state.auth);
    const { handleToggle, toggle, handleToggleFalse } = useToggle(false);
    const navigate = useNavigate();
    useEffect(() => {
        if (token) navigate('/')
    }, [token]);
    return (
        <div className={`container-main ${toggle ? 'sign-up-mode' : ''} select-none`}>
            <div className="forms-container">
                <div className="signin-signup">
                    <SignIn onClick={handleToggleFalse}></SignIn>
                    <SignUp onClick={handleToggleFalse}></SignUp>
                </div>
            </div>
            <div className="panels-container">
                <div className="panel left-panel">
                    <div className="content">
                        <h3>Bạn là người mới? </h3>
                        <p>
                            Hãy đăng ký 1 tài khoản để có những trải nghiệm cực thú vị với FOODSVIET
                        </p>
                        <button onClick={handleToggle} className="btn transparent" id="sign-up-btn">
                            Đăng ký
                        </button>
                    </div>
                    <img src="./src/assets/foods.svg" className="image" alt='' />
                </div>
                <div className="panel right-panel">
                    <div className="content">
                        <h3>Bạn đã có tài khoản trước đây ?</h3>
                        <p>
                            Đăng nhập để xem có gì mới ở FOODSVIET không nào. LET GO!!!!.</p>
                        <button onClick={handleToggle} className="btn transparent" id="sign-in-btn">
                            Đăng nhập
                        </button>
                    </div>
                    <img src="./src/assets/register.svg" className="image" alt='' />
                </div>
            </div>
        </div>


    );
};

export default SignInSignUp;