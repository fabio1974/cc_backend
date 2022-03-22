const express = require('express');
const axios = require("axios");
const router = express.Router();
const config = require('config');

const base_url = `https://api.iugu.com/v1/invoices?api_token=${config.get('API_TOKEN')}`;

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

router.get('/:id', async(req,res)=>{
    const genre = await Genre.findById(req.body.id)
    if(!genre)
        return res.status(404).send('Code no found')
    res.send(genre)
})



router.post('/', (req, res) => {

    const boleto = req.body
    console.log("BODY",req.body)

    const body = {
        ensure_workday_due_date: true,
        items: [{description: boleto.message, price_cents: (100 * boleto.total), quantity: 1}],
        email: boleto.email,
        due_date: boleto.due_date,
        customer_id: boleto.customer_id
    }

    console.log(body)

    axios.post(base_url, body)
        .then(resp => res.send(resp.data))
        .catch(error => {
            console.log("XXX", error.response.data.errors)
            res.send(error.response.data.errors)
        })


})

router.put('/:id', async (req, res) => {
    const {error} = validate(req.body);
    if (error)
        return res.status(400).send(error.details[0].message);
    const genre = await Genre.findByIdAndUpdate(req.params.id,
        {name: req.body.name},
        {new:true})
    if (!genre)
        return res.status(404).send('The genre with the given ID was not in the database')
    res.send(genre);
});

router.delete('/:id', async (req, res) => {
    const genre = await Genre.findByIdAndDelete(req.body.id);
    if (!genre)
        return res.status(404).send('The genre with the given ID was not in the database')
    res.send(genre)
});

module.exports = router;
