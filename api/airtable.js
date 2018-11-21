var Airtable = require('airtable')

var key = process.env.airtable_api_key
var base = process.env.airtable_base
var record = process.env.airtable_record

var db = new Airtable({
  apiKey: key
}).base(base)

module.exports = function (req, res) {
  db('Table 1').find(record, function (err, record) {
    if (err) return res.end(err)

    var user = {
      name: record.get('Name'),
      avatar: record.get('Avatar'),
      til: record.get('TIL')
    }

    res.end(JSON.stringify(user))
  })
}
