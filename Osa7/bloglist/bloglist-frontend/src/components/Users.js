import React from 'react'
import { Header, Table } from 'semantic-ui-react'
import {
  Link
} from 'react-router-dom'


const Users = ({ users }) => {
  return (
    <div>
      <h2>User list</h2>
      <Table basic='very' celled collapsing>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>User</Table.HeaderCell>
            <Table.HeaderCell>Blogs created</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <tbody>
          {users.map(user => (
            <Table.Row key={user.name}>
              <Table.Cell>
                <Link to={`/users/${user.id}`}>{user.name}</Link>
              </Table.Cell>
              <Table.Cell>{user.blogs.length}</Table.Cell>
            </Table.Row>
          ))}
        </tbody>
      </Table>
    </div>
  )
}


export default Users