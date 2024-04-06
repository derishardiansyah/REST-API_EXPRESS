import validator from "email-validator";
import jwt from "jsonwebtoken";

import conn from "../Config/config.js";
import responseHelper from "../Helper/responHelper.js";

const userController = {
  addUser: async (req, res) => {
    try {
      const { email, first_name, last_name, password } = req.body;

      if (!validator.validate(email)) {
        return responseHelper(
          res,
          400,
          email,
          "Parameter email tidak sesuai format",
          "error"
        );
      }

      if (password.length < 8) {
        return responseHelper(
          res,
          400,
          password,
          "Password minimal 8 karakter"
        );
      }

      // Check if email already exists
      conn.query(
        "SELECT * FROM user WHERE email = ?",
        [email],
        async (error, results) => {
          if (error) {
            return responseHelper(
              res,
              500,
              "",
              "Terjadi kesalahan pada server"
            );
          }
          if (results.length > 0) {
            return responseHelper(res, 400, "", "Email sudah terdaftar");
          }

          // Insert user into database with plain text password
          conn.query(
            "INSERT INTO user (email, first_name, last_name, password) VALUES (?, ?, ?, ?)",
            [email, first_name, last_name, password],
            (error, result) => {
              if (error) {
                return responseHelper(
                  res,
                  500,
                  "",
                  "Terjadi kesalahan pada server"
                );
              }
              return responseHelper(
                res,
                200,
                null,
                "Registrasi berhasil silakan login",
                "success"
              );
            }
          );
        }
      );
    } catch (err) {
      responseHelper(res, 500, err, "Terjadi kesalahan pada server");
    }
  },

  loginUser: async (req, res) => {
    try {
      const { email, password } = req.body;

      if (!validator.validate(email)) {
        return responseHelper(
          res,
          400,
          email,
          "Parameter email tidak sesuai format",
          "error"
        );
      }

      if (password.length < 8) {
        return responseHelper(
          res,
          400,
          password,
          "Password minimal 8 karakter"
        );
      }

      // Retrieve user from database
      conn.query(
        "SELECT * FROM user WHERE email = ?",
        [email],
        async (error, results) => {
          if (error) {
            return responseHelper(
              res,
              500,
              "",
              "Terjadi kesalahan pada server"
            );
          }
          if (results.length === 0) {
            return responseHelper(res, 401, "", "Email atau Password salah");
          }

          if (results[0].password !== password) {
            return responseHelper(res, 401, "", "Email atau Password salah");
          }

          const payload = jwt.sign(
            {
              email: email,
            },
            process.env.secretLogin,
            {
              expiresIn: "12h",
            }
          );
          const data = {
            token: payload,
          };
          return responseHelper(res, 200, data, "Login berhasil");
        }
      );
    } catch (err) {
      responseHelper(res, 500, err, "Terjadi kesalahan pada server");
    }
  },
};

export default userController;
