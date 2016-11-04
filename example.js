var hyperdrive = require('hyperdrive')

var datFs = require('.')(process.cwd())

datFs.db(function (err, db, key, updateDbKey) {
  if (err) throw err
  var drive = hyperdrive(db)
  var archive = drive.createArchive(key)

  if (key) console.log('.dat directory was resumed')
  updateDbKey(archive.key, importFiles)

  function importFiles () {
    var importerOpts = {
      resume: !!key,
      ignore: [/^(?:\/.*)?(\.dat|\.git)(?:\/.*)?$/, /dat-fs\/node_modules/]
    }
    var importer = datFs.importFiles(archive, importerOpts, function (err) {
      if (err) throw err
      console.log('done importing')
    })

    importer.on('file imported', function (file) {
      console.log('imported', file.path)
    })

    importer.on('count finished', function (stats) {
      console.log('folder stats', stats)
    })
  }
})
