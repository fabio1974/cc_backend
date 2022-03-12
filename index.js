const express = require('express');

const clientes = require('./routes/clientes')
const boletos = require('./routes/boletos')



const app = express();

require('./security/cors')(app);
app.use(express.json())
app.use(express.static('public'))
app.use(express.urlencoded({extended:true}))
require('./startup/logging')(app)

const PORT = process.env.PORT || 8080
app.listen(PORT, ()=> console.log(`Listening on port ${PORT}`));

app.use('/api/clientes', clientes);
app.use('/api/boletos', boletos);

