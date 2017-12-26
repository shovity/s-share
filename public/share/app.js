const express = require('express'),
	{ spawn } = require('child_process'),
	path = require('path'),
	cookieParser = require('cookie-parser'),
	bodyParser = require('body-parser'),
	QRCode = require('qrcode'),
	os = require('os')

const index = require('./routes/index')

const app = express(),
	ifs = os.networkInterfaces(),
	port = 5555

var sharePath = process.argv[2] || path.join(__dirname, 'public/share')

// Catch bug nodemon
if (sharePath == 'app.js') sharePath = path.join(__dirname, 'public/share')

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
