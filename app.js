const express = require('express')

const app = express()
const postRouter = require('./routes/postRoutes')

app.use('/api/v1/posts', postRouter)

module.exports = app
