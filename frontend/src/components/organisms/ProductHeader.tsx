import React from 'react'
import Link from 'src/components/Link'
import { Toolbar } from '@mui/material'
import { CommonHeader } from 'src/components/organisms'

const sections = [
  { title: 'Food', url: '/category/food' },
  { title: 'Book', url: '/category/book' },
  { title: 'Beauty', url: '/category/beauty' },
  { title: 'Health', url: '/category/health' },
  { title: 'Fashion', url: '/category/fashion' },
  { title: 'Electronics', url: '/category/electronics' },
  { title: 'Shoes', url: '/category/shoes' },
  { title: 'Health2', url: '#' },
  { title: 'Style', url: '#' },
  { title: 'Travel', url: '#' }
]

export default function ProductHeader() {
  return (
    <>
      <CommonHeader />
      <Toolbar component="nav" variant="dense" sx={{ justifyContent: 'space-between', overflowX: 'auto' }}>
        {sections.map((section) => (
          <Link
            color="inherit"
            noWrap
            key={section.title}
            variant="body2"
            href={section.url}
            sx={{ p: 1, flexShrink: 0 }}
          >
            {section.title}
          </Link>
        ))}
      </Toolbar>
    </>
  )
}
