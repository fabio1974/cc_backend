const express = require("express");
const axios = require("axios");
const router = express.Router();

router.get("/:zip_code", async (req, res) => {
  const url = `https://viacep.com.br/ws/${req.params.zip_code}/json/`;
  try {
    const result = await axios.get(url);
    res.send(result.data);
  } catch (e) {
    console.log(e);
    res.status(500).send({});
  }
});

module.exports = router;
