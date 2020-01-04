import React from 'react'
import {
  Link
} from "react-router-dom";


const Users = ({ users }) => {
  return (
    <table style={{ textAlign: "left" }}>
      <tbody>
        <tr>
          <th></th>
          <th>Blogs created</th>
        </tr>
        {users.map(user => (
          <tr key={user.name}>
            <th>
              <Link to={`/users/${user.id}`}>{user.name}</Link>
            </th>
            <th>{user.blogs.length}</th>
          </tr>
        ))}
      </tbody>
    </table>
  )
}


export default Users