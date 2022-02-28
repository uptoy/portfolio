import { ReactNode, VFC } from "react"
import Head from "next/head"
import Link from "next/link"
import Image from "next/image"
import { Header, Footer, Sidebar } from "."

interface Props {
  children: ReactNode
  title: string
}

export const Layout: VFC<Props> = ({ children, title }) => {
  console.log("Layout component")
  return (
    <div className="flex flex-col justify-center items-center min-h-screen text-gray-600 text-sm font-mono">
      <Head>
        <title>{title}</title>
      </Head>
      <Header />
      <main className="flex flex-1 flex-col justify-center items-center w-screen">{children}</main>
      <Footer />
    </div>
  )
}
