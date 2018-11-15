import 'tachyons'
import Airtable from 'airtable'
import { useState, useEffect } from 'react'

Airtable.configure({
  endpointUrl: 'https://api.airtable.com',
  apiKey: 'redacted'
})

const base = Airtable.base('redacted')

export default () => {
  const [users, setUsers] = useState([])

  useEffect(() => {
    base('Table 1').select({
      maxRecords: 10,
      view: 'Grid view'
    }).eachPage(function page (records, fetchNextPage) {
      records.forEach(function (record, idx) {
        if (idx !== records.length - 1) return
        const name = record.get('Name')
        const avatar = record.get('Avatar')
        const til = record.get('TIL')

        if (!name) return

        const user = {
          name: name,
          avatar: avatar,
          til: til
        }

        users.push(user)

        setUsers(users)
      })
      fetchNextPage()
    }, function done (err) {
      if (err) console.error(err)
    })
  }, [])

  return (
    <div className='sans-serif lh-copy bg-black vh-100'>
      <h1 className='f2 center tc white f-headline ma0 pt5'>#TIL</h1>
      <main className='ph5 dt'>
        <ul className='list pl0 mt0 dtc v-mid'>
          {users.map(user => {
            if (!user.name) return
            const avatar = user.avatar[0].url
            return (
              <li className='grow flex items-center pa3 ph0-l bb b--black-10 white'>
                <img className='h5 w5 br-100 pa5' src={avatar} />
                <div className='pl3 flex-auto'>
                  <strong className='f1 db b'>{user.name}</strong>
                  <span className='f2 db'>{user.til}</span>
                </div>
              </li>
            )
          })}
        </ul>
      </main>
    </div>
  )
}
