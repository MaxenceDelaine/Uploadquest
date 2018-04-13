var express = require('express')
var router = express.Router()
const multer = require('multer')
const upload = multer({ dest: 'tmp/' })
const fs = require('fs')

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'La quête de la dépravation' })
})

/* upload */
router.post('/uploaddufichier', upload.array('monfichier'), function (req, res, next) {
  if (req.files.length > 3) {
    res.render('index', {title: 'La quête de la dépravation', errormessage: 'Pas plus de 3 fichiers ou je le dis à maman!'})
  } else {
    for (var i = 0; i < req.files.length; i++) {
      if (req.files[i].mimetype !== 'image/png') {
        res.render('index', {title: 'La quête de la dépravation', errormessage: 'Pas de png, pas de goûter!'})
      } else if (req.files[i].size > 3000000) {
        res.render('index', {title: 'La quête de la dépravation', errormessage: 'Le fichier est trop gros!'})
      } else { // si tout est ok, on permet l'upload des photos //
        fs.rename(req.files[i].path, 'public/images/' + req.files[i].originalname, function (err) {
          if (err) {
            res.render('index', {title: 'La quête de la dépravation', errormessage: 'Problème durant le déplacement'})
          } else {
            res.render('index', {title: 'La quête de la dépravation', successmessage: 'Fichier uploadé avec succès!'})
          }
        })
      }
    }
  }
})

module.exports = router
