import Link from 'next/link'

const Admin = () => {
  return (
    <>
      <h1>Admins Page</h1>
      <br />
      <p>You must have been assigned an Admin role.</p>
      <div>
        <Link href="/">
          <a>ホームへ戻る</a>
        </Link>
      </div>
    </>
  )
}

export default Admin
