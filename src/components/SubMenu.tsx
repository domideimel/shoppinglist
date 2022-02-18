import { FC } from 'react'
import { Link } from 'react-router-dom'

const SubMenu: FC = () => {
  return (
    <ul tabIndex="0" className="mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52 right-0">
      <li><Link to="/logout">Logout</Link></li>
      <li><Link to="/login">Login</Link></li>
      <li><Link to="/register">Registrieren</Link></li>
    </ul>
  )
}

export default SubMenu