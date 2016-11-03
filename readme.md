# dat-fs

* create/resume a `.dat` folder database.
* import files using hyperdrive-import-files

## API

### var datFs = DatFs(dir)

Initialize `datFs` with your Dat repo directory. The directory is where the `.dat` folder will be and the files will be imported from.

### datFs.db(opts, cb)

Read or create the `.dat` folder database.

Use the callback to create your drive and archive:

```js
datFs.db({}, function (err, db, key, updateDbKey) {
  var archive
  var drive = hyperdrive(db)

  if (key) {
    // Resuming existing archive
    archive = drive.createArchive(key) 
    return done()
  } else {
    // Creating new
    archive = drive.createArchive()
    updateDbKey(archive.key, done) // Save the new key to db so you can resume
  }
})
```

### var importer = datFs.importFiles(archive, opts, cb)

Where `importer` is [hyperdrive-import-files](https://github.com/juliangruber/hyperdrive-import-files). The only difference is that datFs counts directory size first so you can calculate importing progress.

(TODO: doc rest of count/import API)


## License 

MIT
