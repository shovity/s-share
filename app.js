#!/usr/bin/env node

const express = require('express')
const	{ spawn } = require('child_process')
const	path = require('path')
const	cookieParser = require('cookie-parser')
const	bodyParser = require('body-parser')
const	os = require('os')
const	QRCode = require('qrcode')

const index = require('./routes/index')
const	api = require('./routes/api')

const app = express()
const	ifs = os.networkInterfaces()
const	port = 5555

let sharePath = process.argv[2] || path.join(__dirname, 'public/share')

// Catch bug nodemon
if (sharePath == 'app.js') sharePath = __dirname + '/public/share'

// View engine
app.set('view engine', 'pug')
app.set('views', path.join(__dirname, 'views'))
app.set('view cache', false)
// Parser
app.use(cookieParser())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
// Static direct
app.use(express.static(path.join(__dirname, 'public')))

// Route
app.use('/', index(sharePath))
app.use('/api', api(sharePath))

app.listen(port, function () {
	Object.keys(ifs).forEach(function (ifname) {
	  ifs[ifname].forEach(function (iface) {
	    // skip over internal (i.e. 127.0.0.1) and non-ipv4 addresses
	    if ('IPv4' !== iface.family || iface.internal !== false) return
	  	QRCode.toString(`http://${iface.address}:${port}`, { type: 'terminal' }, function (err, string) {
			  if (err) throw err
			  console.log(`Share path---------: ${sharePath}`)
				console.log(`Server listening at: http://${iface.address}:${port}`)
				console.log(string)
			})
	  })
	})
})
