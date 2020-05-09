const express = require('express')
const app = express()
const port = 9000

app.get('/', (req, res) => res.send('<b>Hello World!</b>'))

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))
