const cloudinary = require("cloudinary").v2;
import argon2 from "argon2";
import { generateAccessToken, generateRefreshToken } from "../jwt";

class BaseController {
    constructor(model) {
        this.model = model;
    }
    // Phương thức register dùng chung
    register = async (req, res) => {
        const { user_name, password, ...info } = req.body;
        const fileData = req.file;
        const image = fileData?.path;
        const id_image = fileData?.filename;
        try {
            const existingUser = await this.model.findOne({ user_name });
            if (existingUser) {
                throw new Error("Tài khoản đã tồn tại");
            }
            const hashPass = await argon2.hash(password);
            const userData = {
                ...info,
                image,
                id_image,
                user_name,
                password: hashPass,
            };
            const newUser = await this.model(userData).save();
            if (!newUser) {
                throw new Error("Có lỗi xảy ra");
            }
            return res.status(200).json({
                message: "Đăng ký tài khoản thành công",
            });
        } catch (error) {
            if (fileData) cloudinary.uploader.destroy(id_image);
            console.log("error: ", error);
            return res.status(error.message === "Tài khoản đã tồn tại" ||
                error.message === "Có lỗi xảy ra" ? 400 : 500).json({
                    message: error.message || "Server is error",
                });
        }
    };

    // Phương thức login dùng chung
    login = async (req, res) => {
        try {
            const { user_name, password } = req.body;
            if (!user_name && !password)
                return res.status(400).json({
                    message: "Không được bỏ trống",
                });
            const user = await this.model.findOne({ user_name });
            if (!user) {
                return res.status(402).jsonp({
                    message: "Sai tài khoản",
                });
            }
            const passwordValid = await argon2.verify(user.password, password);
            if (!passwordValid) {
                return res.status(402).jsonp({
                    message: "Sai mật khẩu",
                });
            }
            if (user && passwordValid) {
                const accessToken = generateAccessToken(user);
                console.log("🚀 ~ file: Controller.js:67 ~ BaseController ~ login= ~ accessToken:", accessToken)
                const refreshToken = generateRefreshToken(user);
                res.cookie('refreshToken', refreshToken, {
                    httpOnly: true,
                    secure: false,
                    path: '/',
                    sameSite: 'strict'
                })
                const { password, id_image, updatedAt, createdAt, ...others } = user._doc;
                return res.status(200).json({ ...others, accessToken, message: 'Đăng nhập thành công' });
            }
        } catch (error) {
            console.log("error: ", error);
            return res.status(500).json({
                message: "Server is error",
            });
        }
    };
    getAll = async (req, res) => {
        try {
            const data = await this.model.find({ status: 'approved' });
            if (!data) {
                return res.status(400).json({
                    message: "Có lỗi xảy ra",
                });
            }
            return res.status(200).json(data);
        } catch (error) {
            console.log('err', error);
            return res.status(500).json({
                message: "Lỗi Server",
            });
        }
    };

    detail = async (req, res) => {
        try {
            const id = req.query.id;
            const data = await this.model.findById(id);
            if (!data)
                return res.status(400).json({
                    message: "Có lỗi xảy ra",
                });
            return res.status(200).json(data);
        } catch (error) {
            console.log('err', error);
            return res.status(500).json({
                message: "Lỗi Server",
            });
        }
    };

    detailBySlug = async (req, res) => {
        try {
            const slug = req.query.slug;
            const data = await this.model.findOne({ slug });
            if (!data)
                return res.status(400).json({
                    message: "Có lỗi xảy ra",
                });
            return res.status(200).json(data);
        } catch (error) {
            console.log('err', error);
            return res.status(500).json({
                message: "Lỗi Server",
            });
        }
    };
    disable = async (req, res) => {
        const id = req.query.id;
        try {
            const data = await this.model.findOne({ _id: id });
            if (!data) {
                return res.status(400).json({
                    message: "Không tồn tại nội dung này",
                });
            }
            const response = await this.model.findByIdAndUpdate(data._id, { status: 'destroy' });
            if (!response) {
                return res.status(400).json({
                    message: "Có lỗi xảy ra không thê hủy bỏ!",
                });
            }
            return res.status(200).json({
                message: "Hủy bỏ thành công!"
            });
        } catch (error) {
            console.log('err', error);
            return res.status(500).json({
                message: "Lỗi Server",
            });
        }
    }

}

// const adminController = new BaseController(Admin);
// const customerController = new BaseController(Customer);

module.exports = BaseController;
