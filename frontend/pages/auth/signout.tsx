import React from 'react'
import Link from 'next/link'

export default function SignOut() {
  return (
    <>
      <p>SignOut</p>
      <Link href="/">
        <a>Back to home</a>
      </Link>
    </>
  )
}
