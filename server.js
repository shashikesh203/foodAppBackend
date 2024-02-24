require('dotenv').config()
const express = require('express')
const dbconn = require('./config/dbconn')
const router = require('./routes/userRoute.JS')
const cors = require('cors')
const app = express()

dbconn();
// cartdbconn();
app.use(cors())
app.use(express.json())

app.use('/api', router)
app.listen(process.env.PORT, () => {
  console.log(`Example app listening on port ${process.env.PORT}`)
})
