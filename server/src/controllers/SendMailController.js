// emailController.js
import nodemailer from "nodemailer";
import FeedBack from "../models/SendEmail";

class SendEmailController {
  constructor() {}
  send = async (req, res) => {
    const { fullName, email, phone, message } = req.body;
    try {
      sendEmail({ fullName, email, phone, message });
      res.json({ message: "Phản hồi thành công" });
    } catch (err) {
      res.status(500).json({ message: "phản hồi thất bại" });
    }
  };
  createFeedBack = async (req, res) => {
    const dataFeedBack = req.body;
    try {
      // sendEmail(dataFeedBack);
      const data = await FeedBack(dataFeedBack).save();
      if (data) {
        return res.status(200).json({
          message: "Tạo phản hồi thành công",
        });
      } else {
        return res.status(401).json({
          message: "Tạo phản hồi thất bại",
        });
      }
    } catch (error) {
      console.log("err", error);
      return res.status(500).json({
        message: "Có lỗi xảy ra",
        error: error.message,
      });
    }
  };
  // getAllFeedBack = async (req, res) => {
  //   const id = req.query.id;
  //   try {
  //     const feedback = await FeedBack.find({
  //       id: id,
  //     }).populate("sender");
  //     res.status(200).json(feedback);
  //   } catch (err) {
  //     res.status(500).json(err);
  //   }
  // };
  getAllFeedBack = async (req, res) => {
    const id = req.query.id;

    try {
      const data = await FeedBack.find({ id: id });
      if (!data) {
        return res.status(400).json({
          message: "Có lỗi xảy ra",
        });
      }
      return res.status(200).json(data);
    } catch (error) {
      console.log("err", error);
      return res.status(500).json({
        message: "Lỗi Server",
      });
    }
  };
}

const sendEmailController = new SendEmailController(sendEmail);
module.exports = sendEmailController;

const mail = (options) => {
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.USER,
      pass: process.env.PASSWORD,
    },
  });
  transporter.sendMail(options, (err, info) => {
    if (err) {
      console.log(err);
      return;
    } else {
      console.log("email send:" + info.response);
    }
  });
};

const sendEmail = ({ fullName, email, phone, message }) => {
  const options = {
    from: process.env.USER,
    to: email,
    subject: "Message from BlogFoodViet",
    html: `
    <div style="width: 100%; background-color: #f3f9ff; padding: 5rem 0">
    <div style="max-width: 700px; background-color: white; margin: 0 auto">
      <div style="width: 100%; background-color: #FFA500; padding: 20px 0">
      <a href="${process.env.CLIENT_URL}" ><img
          src="https://cdn-icons-png.flaticon.com/512/2927/2927347.png"
          style="width: 100%; height: 70px; object-fit: contain"
        /></a>

      </div>
      <div style="width: 100%; gap: 10px; padding: 30px 0; display: grid">
        <p style="font-weight: 800; font-size: 1.2rem; padding: 0 30px">
          Form Blog FoodsViet
        </p>
        <div style="font-size: .8rem; margin: 0 30px">
          <p>FullName: <b>${fullName}</b></p>
          <p>Email: <b>${email}</b></p>
          <p>Phone: <b>${phone}</b></p>
          <p>Message: <i>${message}</i></p>
        </div>
      </div>
    </div>
  </div>`,
  };
  mail(options);
};
