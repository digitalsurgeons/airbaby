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
