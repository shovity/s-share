const express = require('express'),
	fs = require('fs'),
	path = require('path'),
	detectMode = require('../utils/detectMode')


const	router = express.Router()

module.exports = (sharePath) => {
	// None favicon
	router.get('/favicon.ico', (req, res, next) => {
		res.end();
	})

	router.get('/', (req, res, next) => {
		res.redirect('/share')
	})

	router.get('/share/*', (req, res, next) => {
		const uri = decodeURI(req.path.substr(6))

		fs.readdir(path.join(sharePath, uri), (err, files) => {
			if (err) {
				res.end(`Oop! Something went worng. ${err}`)
			} else {
				for (let i = 0; i < files.length; i++) {
					files[i] = {
						name: files[i],
						stat: fs.statSync(path.join(sharePath, uri, decodeURI(files[i])))
					}
				}
				res.render('home', { title: 'Share Server', join: path.join, uri, files })
			}
		})
	})

	/* GET view */
	router.get('/view/*', (req, res, next) => {
		const uri = decodeURI(req.path.substr(5))

		fs.readFile(path.join(sharePath, uri), (err, file) => {
			if (err) {
				res.end(`Oop! Something went worng. ${err}`)
			} else {
				res.end(file)
			}
		})
	})

	/* GET edit */
	router.get('/edit/*', (req, res, next) => {

		var uri = decodeURI(req.path.substr(5)),
			fullUri = path.join(sharePath, uri),
			stats = fs.statSync(fullUri),
			size = stats.size, // bytes
			maxSize = 200*1024, // 200Kb
			fileName = fullUri.split('/').slice(-1)[0],
			extend = fileName.split('.').slice(-1)[0],
			modeInfo = detectMode.findByExtension(extend) || { mode: null }

		if (size > maxSize) {
			res.end(`This file too large to edit (${size/1024} Kb), file must less than 200Kb`)
		} else {
			fs.readFile(fullUri, (err, file) => {
				if (err) {
					res.end(`Oop! Something went worng. ${err}`)
				} else {
					res.render('edit', { title: 'Edit ' + fileName, content: file.toString(), modeInfo, fileName, uri })
				}
			})
		}
	})

	router.get('/download/*', (req, res, next) => {
		const uri = decodeURI(req.path.substr(10))
		res.download(path.join(sharePath, uri))
	})

	return router
}
