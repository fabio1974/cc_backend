const express = require('express');
const axios = require("axios");
const config = require("config");
const router = express.Router();

const base_url = `https://api.iugu.com/v1/customers?api_token=${config.get('API_TOKEN')}`;


router.get('/',async(req,res)=>{

    let pageSize = req.query.pageSize;
    let page = req.query.page;
    const url = base_url + `&start=${pageSize * page}&limit=${pageSize}`;
    try {
        const result = await axios.get(url)
        res.send(result.data);
    }catch (e) {
        console.log(e)
        res.status(500).send({})
    }

})

router.get('/:cpfCnpj', async(req,res)=>{
    const query = `&query=cpf_cnpj:${req.params.cpfCnpj}`
    const result = await axios.get(base_url+query)
    res.send(result.data.items);
})

router.post('/',async (req, res) => {

    const body = {
        email: 'fabio.barros@moveltrack.com.br',
        name: 'Fábio Barros',
        cpf_cnpj: '28272738880',
        zip_code: '60824-010',
        city: 'Fortaleza',
        state: 'Ceara',
        number: '555',
        street: 'Rua 02',
        complement: '1604-B'
    }

})

router.put('/:id', async (req, res) => {

});

router.delete('/:id', async (req, res) => {

});

module.exports = router;
