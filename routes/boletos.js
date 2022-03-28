const express = require("express");
const axios = require("axios");
const router = express.Router();
const config = require("config");

const baseUrl = `https://api.iugu.com/v1/invoices?api_token=${config.get(
  "API_TOKEN"
)}`;

router.get("/", async (req, res) => {
  const pageSize = req.query.pageSize;
  const page = req.query.page;
  const url = baseUrl + `&start=${pageSize * page}&limit=${pageSize}`;
  try {
    const result = await axios.get(url);
    res.send(result.data);
  } catch (e) {
    console.log(e);
    res.status(500).send({});
  }
});

router.post("/", (req, res) => {
  const boleto = req.body;
  const body = {
    ensure_workday_due_date: true,
    items: [
      {
        description: boleto.message,
        price_cents: 100 * boleto.total,
        quantity: 1,
      },
    ],
    email: boleto.email,
    due_date: boleto.due_date,
    customer_id: boleto.customer_id,
    payer: {
      cpf_cnpj: boleto.cpf_cnpj,
      name: boleto.name,
      address: {
        zip_code: boleto.zip_code,
        number: boleto.number,
      },
    },
  };

  axios
    .post(baseUrl, body)
    .then((resp) => res.send(resp.data))
    .catch((error) => {
      console.log("XXX", error.response.data.errors);
      res.send(error.response.data.errors);
    });
});

module.exports = router;
