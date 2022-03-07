const express = require('express');
const axios = require("axios");
const router = express.Router();

const base_url = 'https://api.iugu.com/v1/customers?api_token=1ff25a762d28d51bd34863406cbb8c2b';


router.get('/',async(req,res)=>{
    const result = await axios.get(base_url)
    res.send(result.data);
})

router.get('/:cpfCnpj', async(req,res)=>{
    const query = `&query=cpf_cnpj:${req.params.cpfCnpj}`
    const result = await axios.get(base_url+query)
    res.send(result.data.items);
})

router.post('/',async (req, res) => {

})

router.put('/:id', async (req, res) => {

});

router.delete('/:id', async (req, res) => {

});

module.exports = router;
