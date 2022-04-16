import React, { useEffect, useState } from "react"
// import { useDispatch, useSelector } from 'react-redux';
import { ErrorMessage, SuccessMessage } from "components/Message"
import Button from "@material-ui/core"

const UserList = () => {
  // const dispatch = useDispatch()

  const [initialLoading, setInitialLoading] = useState(true)
  // const userListDetails = useSelector((state) => state.userList)
  // const { loading, users, count, error, success } = userListDetails

  // const userDeleteDetails = useSelector((state) => state.userDeleteDetails)
  // const { success: deleteSuccess, error: deleteFail } = userDeleteDetails

  // const userLogin = useSelector((state) => state.userLogin)
  // const { userInfo } = userLogin

  // useEffect(() => {
  //   dispatch(userList(initialLoading))

  //   // eslint-disable-next-line
  // }, [dispatch, deleteSuccess])

  // useEffect(() => {
  //   if (success && initialLoading) {
  //     setInitialLoading(false)
  //   }
  //   // eslint-disable-next-line
  // }, [dispatch, success])

  // const deleteHandler = (id, e) => {
  //   e.preventDefault()
  //   confirmAlert({
  //     customUI: ({ onClose }) => {
  //       return (
  //         <div className="custom-ui">
  //           <h1 className="font-weight-bold text-white">Are you sure?</h1>
  //           <p>You want to delete this user?</p>
  //           <MaterialButton
  //             variant="contained"
  //             color="primary"
  //             onClick={() => {
  //               dispatch(userDelete(id))
  //               onClose()
  //             }}
  //           >
  //             Yes, Delete it !
  //           </MaterialButton>
  //           <MaterialButton variant="contained" color="primary" onClick={onClose}>
  //             No
  //           </MaterialButton>
  //         </div>
  //       )
  //     },
  //   })
  // }

  const deleteSuccess = ""
  const deleteFail = ""
  const loading = true
  const error = "error"
  const count = 1
  const user1 = {
    name: "name",
    email: "email",
    password: "password",
    isAdmin: true,
    id: "_id1",
    createdAt: "createdAt",
    updatedAt: "updatedAt",
  }
  const user2 = {
    name: "name2",
    email: "email2",
    password: "password",
    isAdmin: false,
    id: "_id2",
    createdAt: "createdAt2",
    updatedAt: "updatedAt2",
  }
  const users = [user1, user2]
  return (
    <>
      {deleteSuccess && <SuccessMessage header="Done" message="User Deleted Successfully" />}
      {deleteFail && <ErrorMessage header="Something went wrong" message={deleteFail} />}
      <div className="clearfix">
        <span className="float-left">
          <h1>Users ({count})</h1>
        </span>
      </div>
      <thead>
        <tr>
          <th>ID</th>
          <th>NAME</th>
          <th>EMAIL</th>
          <th>VERIFIED</th>
          <th>ROLE</th>
          <th>DATE</th>
          <th>ACTION</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user) => (
          <tr key={user.id}>
            <td>{user.id}</td>
            <td>{user.name}</td>
            <td>
              <a href={`mailto:${user.email}`}>{user.email}</a>
            </td>
            <td></td>
            <td>admin</td>
            <td>{user.createdAt}</td>
            <td>
              <div className="btn-sm" onClick={() => {}}>
                <i className="fas fa-edit"></i>
              </div>
              <div
                className="btn-sm"
                // onClick={(e) => deleteHandler(user.id, e)}
                onClick={() => {}}
              >
                <i className="fas fa-trash"></i>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </>
  )
}

export default UserList
