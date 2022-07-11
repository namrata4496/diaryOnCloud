const connectToMongo=require('./db')
const express = require('express')
var cors = require('cors')

const app = express()
connectToMongo();
app.use(cors())

const port = 5000
app.use(express.json())
app.use('/aa',require('./routes/auth'))
app.use('/notes',require('./routes/notes'))

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})