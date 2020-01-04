import React from 'react'


const UserInfo = ({ user }) => {
  if (user === undefined) {
    return <div>loading</div>
  }

  return (
    <div>
      {user === undefined
        ? <div>loading</div>
        : <div>
          <h3>added blogs</h3>
          {user.blogs.map(blog => (
            <div key={blog.title}>{blog.title}</div>
          ))}
        </div>}
    </div>
  )
}


export default UserInfo