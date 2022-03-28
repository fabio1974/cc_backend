const express = require("express");
const axios = require("axios");
const config = require("config");
const router = express.Router();

const baseUrl = `https://api.iugu.com/v1/customers?api_token=${config.get(
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

router.get("/:cpfCnpj", async (req, res) => {
  const query = `&query=cpf_cnpj:${req.params.cpfCnpj}`;
  const result = await axios.get(baseUrl + query);
  res.send(result.data.items);
});

router.put("/:id", async (req, res) => {});

router.delete("/:id", async (req, res) => {});

module.exports = router;
