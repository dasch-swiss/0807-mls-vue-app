const express = require('express')
const serveStatic = require('serve-static')
const path = require('path')

const app = express()

app.get('/config.js', (req, res) => {
    res.set('Content-type', 'text/javascript')
    res.send(`window.CONFIG = ` + JSON.stringify(process.env))
})

app.use('/', serveStatic(path.join(__dirname, '/dist')))

const port = process.env.PORT || 5000
app.listen(port)

console.log('Server started on port ' + port)
