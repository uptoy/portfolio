import React, { FormEvent, useEffect, useState, ChangeEvent, ReactNode, VFC } from "react"
import "./App.css"
import { StringifyOptions } from "node:querystring"
import { queryAllByAltText } from "@testing-library/dom"

interface Props {
  onSubmit: (e: FormEvent<HTMLFormElement>) => void
  placeholder: string
}

// export const Input = ({ ref, label, type, name, value, onChange, placeholder }) => {
export const Search: VFC<Props> = ({ onSubmit, placeholder }) => {
  console.log("Search component")
  const [search, setSearch] = useState("")
  // const input = (e: FormEvent<HTMLFormElement>) => {
  //   e.preventDefault()
  //   const form = e.target as HTMLFormElement
  //   const input = form.querySelector("#searchText") as HTMLInputElement
  //   setSearch(input.value)
  //   input.value = ""
  // }

  return (
    <div className="App">
      <form className="searchForm" onSubmit={onSubmit}>
        <input type="text" value={search} placeholder="Enter Search Word" />
        <button>Search</button>
      </form>
    </div>
  )
}

// import { useLocation } from "react-router-dom"
// import { getAPI } from "../../utils/FetchData"

// import CardHoriz from "../cards/CardHoriz"

// const Search = () => {
//   const [search, setSearch] = useState('')
//   const [blogs, setBlogs] = useState<IBlog[]>([])

//   const { pathname } = useLocation()

//   useEffect(() => {
//     const delayDebounce = setTimeout(async () => {
//       if(search.length < 2) return setBlogs([]);

//       try {
//         const res = await getAPI(`search/blogs?title=${search}`)
//         setBlogs(res.data)
//       } catch (err) {
//         console.log(err)
//       }
//     }, 400)

//     return () => clearTimeout(delayDebounce)
//   },[search])

//   useEffect(() => {
//     setSearch('')
//     setBlogs([])
//   },[pathname])

//   return (
//     <div className="search w-100 position-relative me-4">
//       <input type="text" className="form-control me-2 w-100"
//       value={search} placeholder="Enter your search..."
//       onChange={e => setSearch(e.target.value)}  />

//       {
//         search.length >= 2 &&
//         <div className="position-absolute pt-2 px-1 w-100 rounded"
//         style={{
//           background: '#eee', zIndex: 10,
//           maxHeight: 'calc(100vh - 100px)',
//           overflow: 'auto'
//         }}>
//           {
//             blogs.length
//             ? blogs.map(blog => (
//               <CardHoriz key={blog._id} blog={blog} />
//             ))
//             : <h3 className="text-center">No Blogs</h3>
//           }
//         </div>
//       }
//     </div>
//   )
// }

// export default Search
