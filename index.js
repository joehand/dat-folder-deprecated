var db = require('./lib/db')
var countImport = require('./lib/count-import')

module.exports = function (dir) {
  return {
    db: function (opts, cb) {
      return db(dir, opts, cb)
    },
    importFiles: function (archive, opts, cb) {
      return countImport(archive, dir, opts, cb)
    }
  }
}
