import Customer from "../models/Customer";
import Post from "../models/Post";
import Category from "../models/Category";
import BaseController from './Controller'
import argon2 from "argon2";
class CustomerController extends BaseController {
    constructor(model) {
        super(model)
        this.model = model
    }
    getAllByAdmin = async (req, res) => {
        try {
            const data = await this.model.find({});
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
    searchCustomer = async (req, res) => {
        try {
            const value = req.query.key;
            const { infoId } = req.query;
            const keyRegex = new RegExp(value, 'i')
            const query = {
                $or: [
                    { full_name: { $regex: keyRegex } },
                    { slug: { $regex: keyRegex } },
                ],
                status: 'approved',
            };
            const dataCustomers = await Customer.find(query);
            const filterAccount = dataCustomers.filter(data => data._id != infoId)
            if (!dataCustomers)
                return res.status(400).json({
                    message: "Có lỗi xảy ra",
                });
            return res.status(200).json(filterAccount);
        } catch (error) {
            console.log('err', error);
            return res.status(500).json({
                message: "Lỗi Server",
            });
        }
    };

    changePassword = async (req, res) => {
        const id = req.customer.id;
        const { password, new_password, re_password } = req.body;
        try {
            const hasCustomer = await this.model.findOne({ _id: id });
            if (!hasCustomer) {
                return res.status(400).json({
                    message: "Không tồn tại người dùng này",
                });
            }
            if (!new_password && !password) {
                return res.status(400).json({
                    message: "Không được bỏ trống",
                })
            }
            if (new_password !== re_password) {
                return res.status(400).json({
                    message: "Mật khẩu không trùng khớp!",
                })
            }
            const passwordValid = await argon2.verify(hasCustomer.password, password);
            if (!passwordValid) {
                return res.status(402).jsonp({
                    message: "Sai mật khẩu",
                });
            }
            if (hasCustomer.status !== "approved") {
                return res.status(402).jsonp({
                    message:
                        `Tài khoản của bạn đã bị vô hiệu hóa, 
                        vui lòng liên hệ với Quản trị viên để được giúp đỡ!`,
                });
            }
            const hashPass = await argon2.hash(new_password);
            console.log("🚀 ~ file: CustomerController.js:86 ~ CustomerController ~ changePassword= ~ hashPass:", hashPass)
            const updatedCustomer = await this.model.findByIdAndUpdate(id, { password: hashPass });
            if (!updatedCustomer) {
                return res.status(400).json({
                    message: "Có lỗi xảy ra, không thể update",
                });
            }
            return res.status(200).json({ message: "Cập nhật thành công" });
        } catch (error) {
            console.log('err', error);
            return res.status(500).json({
                message: "Lỗi Server",
            });
        }
    };
    search = async (req, res) => {
        const modelType = req.query.model;
        let model;
        switch (modelType) {
            case "post":
                model = Post;
                break;
            case "category":
                model = Category;
                break;
            case "customer":
                model = Customer;
                break;
            default:
                return res.status(400).json({ message: "Model không hợp lệ" });
        }
        try {
            const value = req.query.key;
            const keyRegex = new RegExp(value, 'i')
            const query = {
                $and: [
                    {
                        $or: [
                            { title: { $regex: keyRegex } },
                            { slug: { $regex: keyRegex } },
                            { full_name: { $regex: keyRegex } },
                            { user_name: { $regex: keyRegex } },
                            { email: { $regex: keyRegex } },
                        ],
                        status: 'approved',
                    },
                ],
            };
            const dataPost = await model.find(query);
            if (!dataPost)
                return res.status(400).json({
                    message: "Có lỗi xảy ra",
                });
            return res.status(200).json(dataPost);
        } catch (error) {
            console.log('err', error);
            return res.status(500).json({
                message: "Lỗi Server",
            });
        }
    };

}

const customerController = new CustomerController(Customer)
module.exports = customerController