import validator from "email-validator";
import jwt from "jsonwebtoken";
import path from "path";
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
  profile: async (req, res) => {
    try {
      const token = req.headers.authorization.split(" ")[1];
      const decode = jwt.verify(token, process.env.secretLogin);
      const email = decode.email;

      conn.query(
        "SELECT email, first_name, last_name FROM user WHERE email = ?",
        [email],
        (error, results) => {
          if (error) {
            return responseHelper(
              res,
              500,
              null,
              "Terjadi kesalahan pada server"
            );
          }

          if (results.length === 0) {
            return responseHelper(
              res,
              404,
              null,
              "Profil pengguna tidak ditemukan"
            );
          }

          const userProfile = results[0];
          return responseHelper(res, 200, userProfile, "Sukses");
        }
      );
    } catch (err) {
      return responseHelper(res, 500, err, "Terjadi kesalahan pada server");
    }
  },
  updateProfile: async (req, res) => {
    try {
      const token = req.headers.authorization.split(" ")[1];
      const decode = jwt.verify(token, process.env.secretLogin);
      const email = decode.email;

      const { first_name, last_name } = req.body;

      conn.query(
        "UPDATE user SET first_name = ?, last_name = ? WHERE email = ?",
        [first_name, last_name, email],
        (error, results) => {
          if (error) {
            return responseHelper(
              res,
              500,
              null,
              "Terjadi kesalahan pada server"
            );
          }

          if (results.affectedRows === 0) {
            return responseHelper(
              res,
              404,
              null,
              "Profil pengguna tidak ditemukan"
            );
          }
          const userProfile = { email, first_name, last_name };
          return responseHelper(
            res,
            200,
            userProfile,
            "Update profile berhasil"
          );
        }
      );
    } catch (err) {
      return responseHelper(res, 500, err, "Terjadi kesalahan pada server");
    }
  },
  profileImage: async (req, res) => {
    try {
      const token = req.headers.authorization.split(" ")[1];
      const decode = jwt.verify(token, process.env.secretLogin);
      const email = decode.email;

      if (!req.file) {
        return responseHelper(res, 400, null, "Tidak ada file yang diunggah");
      }

      const allowedExtensions = [".png", ".jpg", ".jpeg"];
      const fileExtension = path.extname(req.file.filename).toLowerCase();

      if (!allowedExtensions.includes(fileExtension)) {
        return responseHelper(res, 401, null, "Format Image tidak sesuai");
      }

      const profile_image = req.file.filename;

      conn.query(
        "UPDATE user SET profile_image = ? WHERE email = ?",
        [profile_image, email],
        (error, results) => {
          if (error) {
            return responseHelper(
              res,
              500,
              null,
              "Terjadi kesalahan pada server"
            );
          }

          if (results.affectedRows === 0) {
            return responseHelper(
              res,
              404,
              null,
              "Profil pengguna tidak ditemukan"
            );
          }

          conn.query(
            "SELECT email, first_name, last_name, profile_image FROM user WHERE email = ?",
            [email],
            (error, results) => {
              if (error) {
                return responseHelper(
                  res,
                  500,
                  null,
                  "Terjadi kesalahan pada server"
                );
              }

              const userProfile = results[0];
              return responseHelper(
                res,
                200,
                userProfile,
                "Update profile berhasil"
              );
            }
          );
        }
      );
    } catch (err) {
      return responseHelper(res, 500, err, "Terjadi kesalahan pada server");
    }
  },
  getBanner: async (req, res) => {
    try {
      conn.query("SELECT * FROM banner", (error, results) => {
        if (error) {
          return responseHelper(
            res,
            500,
            null,
            "Terjadi kesalahan pada server"
          );
        }
        if (results.length === 0) {
          return responseHelper(res, 404, null, "Banner tidak ditemukan");
        }
        const allBanner = results;
        return responseHelper(res, 200, allBanner, "Sukses");
      });
    } catch (err) {
      return responseHelper(res, 500, err, "Terjadi kesalahan pada server");
    }
  },
  getService: async (req, res) => {
    try {
      const token = req.headers.authorization.split(" ")[1];
      const decode = jwt.verify(token, process.env.secretLogin);
      const email = decode.email;

      conn.query(
        "SELECT * FROM service ORDER BY service_name",
        (error, results) => {
          if (error) {
            return responseHelper(
              res,
              500,
              null,
              "Terjadi kesalahan pada server"
            );
          }
          if (results.length === 0) {
            return responseHelper(res, 404, null, "Service tidak ditemukan");
          }
          const allService = results;
          return responseHelper(res, 200, allService, "Sukses");
        }
      );
    } catch (err) {
      return responseHelper(res, 500, err, "Terjadi kesalahan pada server");
    }
  },
};

export default userController;
