import User from '../../models/user'

interface UserTableProps {
  users: User[]
}

const UserTable = (props: UserTableProps) => {
  const { users } = props

  return (
    <table className='table table-pin-rows'>
      <thead>
        <tr>
          <th>ID</th>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Email</th>
          <th>Role</th>
          <th>Created At</th>
        </tr>
      </thead>
      <tbody>
        {users.map(({ id, firstName, lastName, email, role, createdAt }) => (
          <tr key={id}>
            <td>{id}</td>
            <td>{firstName}</td>
            <td>{lastName}</td>
            <td>{email}</td>
            <td>{role}</td>
            <td>{new Date(createdAt).toLocaleDateString()}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default UserTable
