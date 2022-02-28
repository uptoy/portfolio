import { Layout } from "components/common/organisms"
import { NextPage } from "next"
import Head from "next/head"
import Link from "next/link"
import React from "react"
import styled from "styled-components"

const Container = styled.div`
  width: 100vw;
  height: calc(100vh - 80px);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: white;
  font-size: 50px;
  font-weight: 700;
  a {
    margin-top: 30px;
    font-size: 30px;
    color: white;
    text-decoration: underline;
  }
  background-image: url("/static/image/error.jpg");
  background-position: center center;
  background-size: cover;
`

const NotFound: NextPage = () => (
  <>
    <Head>
      <title>404 Error</title>
    </Head>
    <Layout title="404 Not Found">
      <Container>
        <div>Not Found Page</div>
        <Link href="/">Back to Top </Link>
      </Container>
    </Layout>
  </>
)

export default NotFound
