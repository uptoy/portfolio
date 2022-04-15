import React from "react"
import Link from "components/Link"
import {Toolbar} from "@material-ui/core"
import {CommonHeader} from "components/organisms"

const sections = [
  {title: "Food", url: "/category/food"},
  {title: "Book", url: "/category/book"},
  {title: "Beauty", url: "/category/beauty"},
  {title: "Health", url: "/category/health"},
  {title: "Fashion", url: "/category/fashion"},
  {title: "Electronics", url: "/category/electronics"},
  {title: "Shoes", url: "/category/shoes"},
  {title: "Baby", url: "/category/baby"},
  {title: "Style", url: "/category/style"},
  {title: "Travel", url: "/category/travel"},
]

export default function ProductHeader() {
  return (
    <>
      <CommonHeader />
      <Toolbar
        component="nav"
        variant="dense"
        sx={{justifyContent: "space-between", overflowX: "auto"}}
      >
        {sections.map((section) => (
          <Link
            style={{textDecoration: "none"}}
            color="inherit"
            noWrap
            key={section.title}
            variant="body2"
            href={section.url}
            sx={{p: 1, flexShrink: 0}}
          >
            {section.title}
          </Link>
        ))}
      </Toolbar>
    </>
  )
}
