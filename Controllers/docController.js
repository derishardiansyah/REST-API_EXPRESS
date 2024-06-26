const docController = {
  getAllDocs: (req, res) => {
    res.json({
      Message: "Welcome to Doc API!",
      Host: "https://rest-api-express-kappa.vercel.app/",
      By: "Deris Hardiansyah Ismail",
      Data: [
        {
          Endpoint: "/api/registration",
          Method: "post",
          Request: {
            Body: "email, first_name, last_name, password ",
          },
          Description: "Membuat akun user",
        },
        {
          Endpoint: "/api/login",
          Method: "post",
          Request: {
            Body: "email, password",
          },
          Description: "Login sukses dan akan mendapatkan token",
        },
        {
          Endpoint: "/api/profile",
          Method: "get",
          Request: {
            Authorization: "token",
          },
          Description: "Berhasil melihat profile user",
        },
        {
          Endpoint: "/api/profile/update",
          Method: "put",
          Request: {
            Authorization: "token",
            Body: "first_name, last_name",
          },
          Description: "Update data user",
        },
        {
          Endpoint: "/api/profile/image",
          Method: "put",
          Request: {
            Authorization: "token",
            Body: "profile_image",
          },
          Description: "Profile update berhasil",
        },
        {
          Endpoint: "/api/banner",
          Method: "get",
          Description: "Berhasil mendapatkan list banner",
        },
        {
          Endpoint: "/api/service",
          Method: "get",
          Request: {
            Authorization: "token",
          },
          Description: "Berhasil mendapatkan list service",
        },
        {
          Endpoint: "/api/balance",
          Method: "get",
          Request: {
            Authorization: "token",
          },
          Description: "Berhasil mendapatkan saldo",
        },
        {
          Endpoint: "/api/topUp",
          Method: "post",
          Request: {
            Authorization: "token",
            Body: "top_up_amount",
          },
          Description: "Berhasil melakukan top up",
        },
        {
          Endpoint: "/api/transaction",
          Method: "post",
          Request: {
            Authorization: "token",
            Body: "service_code",
          },
          Description: "Berhasil melakukan payment",
        },
        {
          Endpoint: "/api/transaction/history",
          Method: "get",
          Request: {
            Authorization: "token",
          },
          Description: "Berhasil mendapatkan history top up dan payment",
        },
      ],
    });
  },
};

export default docController;
