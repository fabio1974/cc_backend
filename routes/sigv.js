const express = require("express");
const router = express.Router();
const xml2js = require("xml2js");

router.get("/", async (req, res) => {
  const placa = req.query.placa;
  const codControle = req.query.codControle;
  console.log(placa, codControle);
  const soap = require("soap");

  const url =
    "https://webservice.sigv.com.br/ws-producao/api/apiControlePatio.php?wsdl";

  soap.createClient(url, function (err, client) {
    if (err) return console.log("Erro do cliente", err);

    client.getControlePatio(
      {
        codDoc: 560,
        loginApi: "dmveiculos",
        senhaApi: "v8y4cqox6wi6ga",
        placa: placa,
        nrControle: codControle,
      },
      (err, result) => {
        if (err) return console.log(err);
        const xml = result.return.$value;

        xml2js.parseString(xml, (err, json) => {
          if (err) throw err;
          console.log("json", JSON.stringify(json, "", 4));
          if (json.Retorno.resultado[0] === "REJEITADO")
            res.status(400).json({
              message: json.Retorno.dadosRejeicao[0].rejeicao[0].descricao[0],
            });
          else res.send(json.Retorno.dadosValidacao[0]);
        });
      }
    );
  });
});

module.exports = router;
