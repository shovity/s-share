const express = require('express'),
	fs = require('fs'),
	path = require('path')
	router = express.Router()

module.exports = (sharePath) => {

	/* POST new file */
  router.post('/newFile', (req, res, next) => {
    var uri = req.body.uri,
			fileName = req.body.fileName,
			filePath = path.join(uri, fileName),
			fullPath = path.join(sharePath, filePath)

		if (fileName.length < 1 || fileName.length > 32) {
			res.json({ ok: false, err: 'File\'s length err [1-32]' })
		} else if (fileName.indexOf('../') != -1 || uri.indexOf('../') != -1) {
			res.json({ ok: false, err: 'You can not access outside shared area!' })
		} else if (fs.existsSync(fullPath)) {
			res.json({ ok: false, err: 'File already exist!' })
		} else {
			fs.closeSync(fs.openSync(fullPath, 'w'));
			res.json({ ok: true, err: null, fullPath })
		}
  })

	/* POST new folder */
	router.post('/newFolder', (req, res, next) => {
    var uri = req.body.uri,
			fileName = req.body.fileName,
			filePath = path.join(uri, fileName),
			fullPath = path.join(sharePath, filePath)

		if (fileName.length < 1 || fileName.length > 32) {
			res.json({ ok: false, err: 'File\'s length err [1-32]' })
		} else if (fileName.indexOf('../') != -1 || uri.indexOf('../') != -1) {
			res.json({ ok: false, err: 'You can not access outside shared area!' })
		} else if (fs.existsSync(fullPath)) {
			res.json({ ok: false, err: 'Folder already exist!' })
		} else {
			fs.mkdirSync(fullPath)
			res.json({ ok: true, err: null, fullPath })
		}
  })

	/* POST save file */
	router.post('/saveFile', (req, res, next) => {
    var uri = req.body.uri,
			content = req.body.content,
			fullPath = path.join(sharePath, uri)

		if (fullPath.indexOf('../') != -1) {
			res.json({ ok: false, err: 'You can not access outside shared area!' })
		} else {
			fs.writeFile(fullPath, content, (err) => {
				if (err) {
					res.json({ ok: false, err })
				} else {
					res.json({ ok: true, err: false})
				}
			})
		}
  })

	return router
}
