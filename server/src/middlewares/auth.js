import jwt from "jsonwebtoken";
import { generateAccessToken } from "../jwt";
import Role from "../models/Role";
const middlewareAuth = {
  verifyToken: (req, res, next) => {
    const token = req.headers.token;
    const usertype = req.headers.usertype;
    if (!token) return res.status(401).json({ message: "Bạn chưa đăng nhập để sử dụng dịch vụ!" });
    const accessToken = token.split(" ")[1];
    if (accessToken === 'null' || accessToken === '' || accessToken === 'undefined')
      return res.status(401).json({ message: "Bạn chưa đăng nhập để sử dụng dịch vụ!" });
    jwt.verify(accessToken, process.env.JWT_ACCESS_KEY, (err, customer) => {
      if (err && err.name === 'TokenExpiredError') {
        let chosenRefreshToken = null
        const refreshToken = req.cookies.refreshToken;
        const refreshTokenAdmin = req.cookies.refreshTokenAdmin;
        if (usertype === 'customer') {
          chosenRefreshToken = refreshToken;
        } else if (usertype === 'admin') {
          chosenRefreshToken = refreshTokenAdmin;
        }
        if (!chosenRefreshToken) return res.status(401).json({ status: 'notAuth' });
        jwt.verify(chosenRefreshToken, process.env.JWT_REFRESH_KEY, (err, customer) => {
          if (err) return res.status(403).json({ status: 'notAuth' });
          const dataCustomer = { _id: customer?.id, admin: customer?.admin, role: customer?.role }
          const newAccessToken = generateAccessToken(dataCustomer);
          if (usertype === 'customer') {
            if (newAccessToken) {
              res.setHeader('new-token', newAccessToken);
            }
          } else if (usertype === 'admin') {
            if (newAccessToken) {
              res.setHeader('new-token-admin', newAccessToken);
            }
          }
          req.customer = customer;
          next();
        });
      } else {
        req.customer = customer;
        next();
      }
    });
  },

  verifyTokenStaff: (req, res, next) => {
    middlewareAuth.verifyToken(req, res, () => {
      const customer = req.customer
      if (customer && customer.admin === true) {
        next();
      } else {
        res.status(403).json({ message: `Bạn không phải là nhân viên!` });
      }
    });
  },
  verifyTokenAdmin: (req, res, next) => {
    middlewareAuth.verifyTokenStaff(req, res, async () => {
      const customer = req.customer;
      const dataRole = await Role.findOne({ _id: customer.role })
      if (customer && dataRole?.title === 'Admin') {
        next();
      } else {
        res.status(403).json({ message: `Bạn không phải là quản trị viên!` });
      }
    });
  },
};

module.exports = middlewareAuth;


// import jwt from "jsonwebtoken";

// const middlewareAuth = {
//   verifyToken: (req, res, next) => {
//     const token = req.headers.token;
//     if (!token) return res.status(401).json("You're not authenticated");
//     const accessToken = token.split(" ")[1];
//     jwt.verify(accessToken, process.env.JWT_ACCESS_KEY, (err, customer) => {
//       if (err) {
//         return res.status(403).json("Token is not valid");
//       }
//       req.customer = customer;
//       next();
//     });
//   },
//   verifyTokenStaff: (req, res, next) => {
//     middlewareAuth.verifyToken(req, res, () => {
//       if (req.customer.admin && req.customer.role === 'staff') {
//         next();
//       } else {
//         res.status(403).json("You're not authenticated staff");
//       }
//     });
//   },
//   verifyTokenStaff: (req, res, next) => {
//     middlewareAuth.verifyToken(req, res, () => {
//       if (req.customer.admin && req.customer.role === 'admin') {
//         next();
//       } else {
//         res.status(403).json("You're not authenticated admin");
//       }
//     });
//   },
// };

// module.exports = middlewareAuth;
