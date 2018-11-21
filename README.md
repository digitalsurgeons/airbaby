# airbaby 👶

> https://airbaby.now.sh

- A Next.js & Now 2.0 monorepo that pulls data from airtable to show daily TILs on the Digital Surgeon screens.

![screenshot of airbaby](screenshot.png)

### api/airtable.js

```js
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
```

### www/page/index.js

```js
import 'isomorphic-unfetch'
import 'tachyons/css/tachyons.min.css'

const Page = (user) => (
  <div className='sans-serif lh-copy bg-black vh-100 white'>
    <h1 className='f2 center tc ma0 pt5'>#TIL</h1>
    <main className='ph5 w-75 flex justify-center'>
      <div className='flex items-center pa3 ph0-l grow'>
        <img className='h5 w5 br-100 pa5' src={user.avatar[0].url} />
        <div className='pl3'>
          <strong className='f1 db b'>{user.name}</strong>
          <span className='f2 db'>{user.til}</span>
        </div>
      </div>
    </main>
  </div>
)

Page.getInitialProps = async ({req}) => {
  const airtable = `https://${req.headers.host}/api/airtable.js`
  const user = await (await fetch(airtable)).json()
  return user
}

export default Page
```
