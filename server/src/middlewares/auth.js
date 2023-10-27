import jwt from "jsonwebtoken";
import { generateAccessToken } from "../jwt";

const middlewareAuth = {
  verifyToken: (req, res, next) => {
    const token = req.headers.token;
    if (!token) return res.status(401).json({ message: "You're not authenticated" });
    const accessToken = token.split(" ")[1];
    jwt.verify(accessToken, process.env.JWT_ACCESS_KEY, (err, customer) => {
      if (err) {
        if (err.name === 'TokenExpiredError') {
          const refreshToken = req.cookies.refreshToken;
          if (!refreshToken) return res.status(401).json({ message: "Refresh token is missing", status: 'notAuth' });
          jwt.verify(refreshToken, process.env.JWT_REFRESH_KEY, (err, customer) => {
            if (err) return res.status(403).json({ message: "Refresh token is not valid", status: 'notAuth' });
            const dataCustomer = { _id: customer?.id, admin: customer?.admin, role: customer?.role }
            const newAccessToken = generateAccessToken(dataCustomer);
            if (newAccessToken) {
              res.setHeader('new-token', newAccessToken);
            }
            req.customer = customer;
            next();
          });
        }
      } else {
        req.customer = customer;
        next();
      }
    });
  },

  verifyTokenAdmin: (role = 'admin') => {
    return (req, res, next) => {
      if (req.customer && req.customer.role === role) {
        next();
      } else {
        res.status(403).json({ message: `You're not authenticated as ${role}` });
      }
    };
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
//   verifyTokenAdmin: (req, res, next) => {
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
